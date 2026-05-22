#!/usr/bin/env python3
"""Fetch Brown University researcher data from OpenAlex API and save as JSON files."""

import json
import re
import ssl
import urllib.request
import urllib.parse
import time

# Handle macOS Python SSL cert issue
ssl_context = ssl.create_default_context()
try:
    import certifi
    ssl_context.load_verify_locations(certifi.where())
except ImportError:
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

BASE_URL = "https://api.openalex.org"
INSTITUTION_ID = "I33213144"
MAILTO = "camelot@aafthab.com"

def fetch_json(url):
    """Fetch JSON from a URL."""
    req = urllib.request.Request(url, headers={"User-Agent": "CamelotResearchPlatform/1.0"})
    with urllib.request.urlopen(req, timeout=30, context=ssl_context) as resp:
        return json.loads(resp.read().decode("utf-8"))

def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')

def get_career_stage(works_count):
    """Infer career stage from works count."""
    if works_count < 10:
        return "Early Career"
    elif works_count < 50:
        return "Mid Career"
    elif works_count < 200:
        return "Established"
    else:
        return "Distinguished"

def extract_department_and_field(author_data):
    """Extract department (specific) and field (broad) from topics/concepts."""
    department = None
    field = None
    topics_list = []

    # Try topics first (newer API field)
    topics = author_data.get("topics", [])
    if topics:
        # Topics are ordered by relevance/count
        for t in topics[:5]:
            display_name = t.get("display_name", "")
            if display_name:
                topics_list.append(display_name)

        # Most specific = first topic's subfield or topic itself
        if topics:
            first = topics[0]
            # Try subfield for department
            subfield = first.get("subfield", {})
            if subfield and subfield.get("display_name"):
                department = subfield["display_name"]
            else:
                department = first.get("display_name", "")

            # Field = mid-level field (between domain and subfield)
            # This gives categories like "Physics", "Medicine", "Computer Science"
            # rather than overly broad "Physical Sciences" or too specific subfields
            top_field = first.get("field", {})
            if top_field and top_field.get("display_name"):
                field = top_field["display_name"]
            else:
                # Fallback to domain if field not available
                domain = first.get("domain", {})
                if domain and domain.get("display_name"):
                    field = domain["display_name"]

    # Fallback to x_concepts
    if not department or not field:
        concepts = author_data.get("x_concepts", [])
        if concepts:
            # Sort by level (higher = more specific) then by score
            specific = sorted(concepts, key=lambda c: (-c.get("level", 0), -c.get("score", 0)))
            broad = sorted(concepts, key=lambda c: (c.get("level", 0), -c.get("score", 0)))

            if not department and specific:
                department = specific[0].get("display_name", "Unknown")
            if not field and broad:
                field = broad[0].get("display_name", "Unknown")
            if not topics_list:
                topics_list = [c.get("display_name", "") for c in concepts[:5] if c.get("display_name")]

    return department or "Unknown", field or "Unknown", topics_list

def get_recent_works_count(author_data):
    """Sum works from last 2 years using counts_by_year."""
    counts = author_data.get("counts_by_year", [])
    current_year = 2026
    total = 0
    for entry in counts:
        if entry.get("year", 0) >= current_year - 2:
            total += entry.get("works_count", 0)
    return total

def get_last_pub_year(author_data):
    """Get most recent year with >0 works."""
    counts = author_data.get("counts_by_year", [])
    for entry in sorted(counts, key=lambda c: -c.get("year", 0)):
        if entry.get("works_count", 0) > 0:
            return entry["year"]
    return None

def process_author(author):
    """Process a single author record into our schema."""
    openalex_id = author.get("id", "").replace("https://openalex.org/", "")
    name = author.get("display_name", "Unknown")
    orcid = author.get("orcid")
    if orcid:
        orcid = orcid.replace("https://orcid.org/", "")

    department, field, topics = extract_department_and_field(author)

    h_index = 0
    summary_stats = author.get("summary_stats", {})
    if summary_stats:
        h_index = summary_stats.get("h_index", 0)

    profile_url = None
    if orcid:
        profile_url = f"https://orcid.org/{orcid}"
    else:
        profile_url = f"https://openalex.org/{openalex_id}"

    return {
        "id": openalex_id,
        "name": name,
        "slug": slugify(name),
        "institution": "Brown University",
        "institution_slug": "brown-university",
        "department": department,
        "field": field,
        "field_slug": slugify(field),
        "h_index": h_index,
        "citation_count": author.get("cited_by_count", 0),
        "works_count": author.get("works_count", 0),
        "recent_works_count": get_recent_works_count(author),
        "orcid": orcid,
        "profile_url": profile_url,
        "career_stage": get_career_stage(author.get("works_count", 0)),
        "country": "US",
        "topics": topics,
        "last_publication_year": get_last_pub_year(author),
    }

def main():
    all_researchers = []

    for page in [1, 2]:
        url = (
            f"{BASE_URL}/authors"
            f"?filter=last_known_institutions.id:{INSTITUTION_ID}"
            f"&sort=cited_by_count:desc"
            f"&per_page=50&page={page}"
            f"&mailto={MAILTO}"
        )
        print(f"Fetching page {page}...")
        data = fetch_json(url)
        results = data.get("results", [])
        print(f"  Got {len(results)} authors")

        for author in results:
            researcher = process_author(author)
            all_researchers.append(researcher)

        if page == 1:
            time.sleep(1)  # Polite delay between requests

    print(f"\nTotal researchers: {len(all_researchers)}")

    # Deduplicate by ID (shouldn't happen but just in case)
    seen = set()
    unique = []
    for r in all_researchers:
        if r["id"] not in seen:
            seen.add(r["id"])
            unique.append(r)
    all_researchers = unique
    print(f"Unique researchers: {len(all_researchers)}")

    # Save researchers.json
    data_dir = "/Users/iamash412/batcave/researcher-platform/data"
    with open(f"{data_dir}/researchers.json", "w") as f:
        json.dump(all_researchers, f, indent=2)
    print(f"Saved researchers.json ({len(all_researchers)} entries)")

    # Build fields aggregation
    field_map = {}
    for r in all_researchers:
        fname = r["field"]
        fslug = r["field_slug"]
        if fname not in field_map:
            field_map[fname] = {
                "name": fname,
                "slug": fslug,
                "researcher_count": 0,
                "total_citations": 0,
            }
        field_map[fname]["researcher_count"] += 1
        field_map[fname]["total_citations"] += r["citation_count"]

    fields = sorted(field_map.values(), key=lambda f: -f["researcher_count"])
    with open(f"{data_dir}/fields.json", "w") as f:
        json.dump(fields, f, indent=2)
    print(f"Saved fields.json ({len(fields)} fields)")

    # Build institutions.json
    total_citations = sum(r["citation_count"] for r in all_researchers)
    top_fields = [f["name"] for f in fields[:15]]  # top 15 fields

    institutions = [{
        "id": INSTITUTION_ID,
        "name": "Brown University",
        "slug": "brown-university",
        "country": "United States",
        "city": "Providence, RI",
        "type": "Ivy League",
        "researcher_count": len(all_researchers),
        "total_citations": total_citations,
        "top_fields": top_fields,
    }]
    with open(f"{data_dir}/institutions.json", "w") as f:
        json.dump(institutions, f, indent=2)
    print(f"Saved institutions.json")

    # Print summary
    print("\n" + "=" * 60)
    print(f"SUMMARY")
    print(f"=" * 60)
    print(f"Total researchers: {len(all_researchers)}")
    print(f"Total citations: {total_citations:,}")
    print(f"Total fields: {len(fields)}")
    print(f"\nTop 10 fields by researcher count:")
    for i, f_item in enumerate(fields[:10], 1):
        print(f"  {i}. {f_item['name']} — {f_item['researcher_count']} researchers, {f_item['total_citations']:,} citations")

    print(f"\nTop 5 researchers by citations:")
    top5 = sorted(all_researchers, key=lambda r: -r["citation_count"])[:5]
    for i, r in enumerate(top5, 1):
        print(f"  {i}. {r['name']} — {r['citation_count']:,} citations, h-index: {r['h_index']}, field: {r['field']}")

if __name__ == "__main__":
    main()
