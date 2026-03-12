#!/usr/bin/env python3
"""
Fetch Canadian skilled trades job postings via Google Custom Search API
and write public/jobs.json. Intended to run weekly via GitHub Actions.
Requires env: GOOGLE_API_KEY, GOOGLE_CX.
"""
import os
import json
import urllib.parse
import urllib.request
from pathlib import Path

API_KEY = os.environ.get("GOOGLE_API_KEY", "")
CX = os.environ.get("GOOGLE_CX", "")
TRADES = ["pipefitter", "steamfitter", "electrician", "millwright", "welder"]
QUERIES = [
    "pipefitter jobs Canada",
    "steamfitter jobs Canada",
    "electrician jobs Canada",
    "millwright jobs Canada",
    "welder jobs Canada",
    "apprentice electrician jobs Canada",
    "journeyman pipefitter jobs Canada",
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


def item_to_job(item: dict, trade: str, level: str = "Apprentice") -> dict:
    """Map a search result item to our job card format."""
    title = item.get("title", "")
    link = item.get("link", "")
    snippet = item.get("snippet", "")
    return {
        "title": title,
        "company": item.get("pagemap", {}).get("organization", [{}])[0].get("name", "—") if item.get("pagemap") else "—",
        "location": "Canada",
        "province": "",
        "trade": trade,
        "level": level,
        "type": "Full-time",
        "description": snippet,
        "url": link,
        "posted": item.get("pagemap", {}).get("metatags", [{}])[0].get("article:published_time", "") or item.get("pagemap", {}).get("metatags", [{}])[0].get("date", "") or "",
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

        for start in (1, 11):
            items = search(query, start=start)
            for item in items:
                url = item.get("link", "")
                if url and url not in seen_urls:
                    seen_urls.add(url)
                    job = item_to_job(item, trade, level)
                    if not job.get("posted"):
                        from datetime import datetime, timezone
                        job["posted"] = datetime.now(tz=timezone.utc).strftime("%Y-%m-%d")
                    jobs.append(job)
            if len(items) < 10:
                break

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(jobs, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(jobs)} jobs to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
