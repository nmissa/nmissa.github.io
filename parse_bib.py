import bibtexparser as btp
import json

def chunked(file):
    lines = ""
    for line in file.readlines():
        if line.isspace():
            yield lines
            lines = ""
        else:
            lines += line

with open("files/publications.bibtex") as fii:
    db = btp.load(fii)
    print(f"Found {len(db.entries_dict.keys())} bibtex entries")
    
items = list(db.entries_dict.values())
for item in items:
    item['author'] = item['author'].split(' and ')

items = sorted(items, key = lambda i: i['year'], reverse = True)
with open("files/publications.json",'w') as foo:
    json.dump(items, foo, indent=4, sort_keys=True)