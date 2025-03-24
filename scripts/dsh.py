#!/usr/bin/env python3

import sys
import json
import argparse

from tabulate import tabulate
from IPython.display import Markdown
from pathlib import Path
BASE_DIR = Path(__file__).parent
JSON_FILE = BASE_DIR / ".." / "assets" / "data" / "data-archive.json"
    
with open(JSON_FILE, "r", encoding="utf8") as fd:
    DATA = json.loads(fd.read())

def display_suite_table(suite):
    """Helper function that formats all recorded experimental results as a 
    nice Markdown table for the website"""
    table = []
    for ds in DATA:
        if ds["suite"] != suite:
            continue
        if ds["dataset"][-4:] == 'zip':
            table.append([ds["algorithm"], ds["year"], ds["author"], f'[zip]({ds["dataset"]})', ds["comment"]])
        else:
            table.append([ds["algorithm"], ds["year"], ds["author"], f'[tgz]({ds["dataset"]})', ds["comment"]])

    display(Markdown(tabulate(table, headers=["Algorithm", "Year", "Author(s)", "Dataset", "Comment"])))
    display(Markdown("\n: {.js-sort-table .column-page-right}"))

def check_urls(args):
    import urllib3
    n_errors = 0
    for ds in DATA:
        url = ds["dataset"]
        resp = urllib3.request("HEAD", url, preload_content=False, timeout=10)
        if resp.status != 200:
            print(f"FAIL({resp.status}): {url}")
            n_errors += 1
    if n_errors > 0:
        print(f"{n_errors} URLs failed!")
        sys.exit(-1)


def main():
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(help="sub-command help")
    parser_check_urls = subparsers.add_parser("check-urls", help="Check all dataset URLS")
    parser_check_urls.set_defaults(func=check_urls)
    args = parser.parse_args()
    args.func(args)

if __name__ == "__main__":
    main()
