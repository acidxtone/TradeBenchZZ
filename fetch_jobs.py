#!/usr/bin/env python3
"""
Fetch Canadian skilled trades job postings via Google Custom Search API
and write public/jobs.json. Intended to run every 5 days via GitHub Actions.
Requires env: GOOGLE_API_KEY, GOOGLE_CX.
Extracts province and city/town when possible for specific location display.
"""
import os
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

API_KEY = os.environ.get("GOOGLE_API_KEY", "")
CX = os.environ.get("GOOGLE_CX", "")

TRADES = ["pipefitter", "steamfitter", "electrician", "millwright", "welder"]

# Province name/code for queries and parsing (code -> full name for display)
PROVINCES = [
    ("Alberta", "AB"),
    ("British Columbia", "BC"),
    ("Saskatchewan", "SK"),
    ("Manitoba", "MB"),
    ("Ontario", "ON"),
    ("Quebec", "QC"),
    ("Nova Scotia", "NS"),
    ("New Brunswick", "NB"),
    ("Newfoundland", "NL"),
    ("Prince Edward Island", "PE"),
]

# Queries: general Canada + province-specific so we can tag province
QUERIES = [
    "pipefitter jobs Canada",
    "steamfitter jobs Canada",
    "electrician jobs Canada",
    "millwright jobs Canada",
    "welder jobs Canada",
    "apprentice electrician jobs Canada",
    "journeyman pipefitter jobs Canada",
    "electrician jobs Alberta",
    "electrician jobs Ontario",
    "pipefitter jobs Alberta",
    "pipefitter jobs Ontario",
    "millwright jobs British Columbia",
    "welder jobs Saskatchewan",
    "electrician jobs Quebec",
]

# Major Canadian cities/towns to detect in snippet or title (lowercase for matching)
CITIES = [
    "toronto", "vancouver", "calgary", "montreal", "edmonton", "ottawa", "winnipeg",
    "quebec city", "hamilton", "kitchener", "london", "victoria", "halifax", "oshawa",
    "windsor", "saskatoon", "regina", "st. john's", "st john's", "barrie", "sherbrooke",
    "kelowna", "abbotsford", "kingston", "saguenay", "trois-rivières", "trois-rivieres",
    "guelph", "moncton", "brantford", "saint john", "thunder bay", "peterborough",
    "red deer", "lethbridge", "kamloops", "nanaimo", "sarnia", "chilliwack", "newmarket",
    "fort mcmurray", "grande prairie", "medicine hat", "prince george", "fort st john",
]

OUTPUT_PATH = Path(__file__).resolve().parent / "public" / "jobs.json"


def search(query: str, start: int = 1) -> list:
    """Return list of result items from Google Custom Search (max 10 per request)."""
    if not API_KEY or not CX:
        return []
    url = "https://www.googleapis.com/customsearch/v1?"
    params = {
        "key": API_KEY,
        "cx": CX,
        "q": query,
        "start": start,
        "num": min(10, 10),
    }
    req = urllib.request.Request(url + urllib.parse.urlencode(params))
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
    except Exception:
        return []
    return data.get("items", [])


def _parse_province_from_query(query: str) -> str:
    """Return province code if query mentions a province (e.g. 'electrician jobs Alberta' -> AB)."""
    q = query.lower()
    for name, code in PROVINCES:
        if name.lower() in q:
            return code
    return ""


def _parse_location_from_text(text: str) -> tuple:
    """Extract (city, province_code) from title or snippet. Returns ('', '') if nothing found."""
    if not text:
        return ("", "")
    combined = (text or "").lower()
    city = ""
    province_code = ""

    # Province: full name or two-letter code (word boundary so "on" doesn't match "Toronto")
    for name, code in PROVINCES:
        if name.lower() in combined:
            province_code = code
            break
    if not province_code:
        code_match = re.search(r"\b(ab|bc|sk|mb|on|qc|ns|nb|nl|pe)\b", combined)
        if code_match:
            province_code = code_match.group(1).upper()

    # City: first match from CITIES (prefer longer names, e.g. Quebec City before Quebec)
    for c in sorted(CITIES, key=len, reverse=True):
        if c in combined:
            # Title-case for display (handle "st. john's" -> "St. John's")
            city = c.title().replace("St John'S", "St. John's").replace("Trois-Rivieres", "Trois-Rivières")
            break

    return (city, province_code)


def _format_location_display(city: str, province_code: str) -> str:
    """Build display string: 'City, Province, Canada' or 'Province, Canada' or 'Various locations, Canada'."""
    code_to_name = {code: name for name, code in PROVINCES}
    province_name = code_to_name.get(province_code, "")

    if city and province_name:
        return f"{city}, {province_name}, Canada"
    if province_name:
        return f"{province_name}, Canada"
    if province_code:
        return f"{province_code}, Canada"
    return "Various locations, Canada"


def item_to_job(
    item: dict,
    trade: str,
    level: str = "Apprentice",
    province_from_query: str = "",
) -> dict:
    """Map a search result item to our job card format. Extracts city/province when possible."""
    title = item.get("title", "") or "Job posting"
    link = item.get("link", "")
    snippet = item.get("snippet", "") or ""
    pagemap = item.get("pagemap") or {}
    org_list = pagemap.get("organization") or []
    company = (org_list[0].get("name", "—") if org_list and isinstance(org_list[0], dict) else "—")
    metatags_list = pagemap.get("metatags") or []
    first_meta = metatags_list[0] if metatags_list and isinstance(metatags_list[0], dict) else {}
    posted = first_meta.get("article:published_time") or first_meta.get("date") or ""

    # Parse location from snippet and title; prefer province from query when we ran a province-specific search
    city_parsed, province_parsed = _parse_location_from_text(title + " " + snippet)
    province = province_from_query or province_parsed
    city = city_parsed
    location_display = _format_location_display(city, province)

    return {
        "title": title,
        "company": company,
        "location": location_display,
        "city": city,
        "province": province,
        "trade": trade,
        "level": level,
        "type": "Full-time",
        "description": snippet,
        "url": link,
        "posted": posted,
    }


def main():
    seen_urls = set()
    jobs = []

    for query in QUERIES:
        trade = "electrician"
        for t in TRADES:
            if t in query.lower():
                trade = t
                break
        level = "Journeyman" if "journeyman" in query.lower() else "Apprentice"
        province_from_query = _parse_province_from_query(query)

        for start in (1, 11):
            items = search(query, start=start)
            for item in items:
                url = item.get("link", "")
                if url and url not in seen_urls:
                    seen_urls.add(url)
                    try:
                        job = item_to_job(item, trade, level, province_from_query=province_from_query)
                        if not job.get("posted"):
                            from datetime import datetime, timezone
                            job["posted"] = datetime.now(tz=timezone.utc).strftime("%Y-%m-%d")
                        jobs.append(job)
                    except (IndexError, KeyError, TypeError):
                        pass
            if len(items) < 10:
                break

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(jobs, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(jobs)} jobs to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
