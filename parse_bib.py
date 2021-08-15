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
    chunks = chunked(fii)
    items = []
    for chunk in chunks:
        db = btp.loads(next(chunks))
        entries = list(db.entries_dict.values())[0]
        entries['author'] = entries["author"].split(' and ')
        items.append(entries)

items = sorted(items, key = lambda i: i['year'], reverse = True)
with open("files/publications.json",'w') as foo:
    json.dump(items, foo, indent=4, sort_keys=True)