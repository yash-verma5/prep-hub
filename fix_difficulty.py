import json

with open('src/content/computer-organization-architecture-questions.json', 'r') as f:
    questions = json.load(f)

for i, q in enumerate(questions):
    if i < 7:
        q['difficulty'] = "Easy"
    elif i < 16:
        q['difficulty'] = "Medium"
    else:
        q['difficulty'] = "Hard"

with open('src/content/computer-organization-architecture-questions.json', 'w') as f:
    json.dump(questions, f, indent=2)

