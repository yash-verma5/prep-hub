import json

files = [
    'src/content/computer-organization-architecture-questions.json',
    'src/content/computer-organization-architecture-module.json'
]

for file in files:
    with open(file, 'r') as f:
        data = json.load(f)
    
    if isinstance(data, list):
        for q in data:
            if q.get('sourceId') in ['src-patterson', 'src-stallings', 'src-hamacher']:
                q['sourceId'] = 'PATTERSON-COA'
            if 'verificationSources' in q:
                for src in q['verificationSources']:
                    if src.get('sourceId') in ['src-patterson', 'src-stallings', 'src-hamacher']:
                        src['sourceId'] = 'PATTERSON-COA'
    elif isinstance(data, dict):
        if 'topics' in data:
            for topic in data['topics']:
                if 'sources' in topic:
                    for src in topic['sources']:
                        pass
        if 'syllabusSource' in data:
             pass

    with open(file, 'w') as f:
        json.dump(data, f, indent=2)

