import json

file_path = "src/content/network-questions.json"
with open(file_path, 'r') as f:
    data = json.load(f)

changed = False
for q in data:
    if "correctOptionId" in q and "correctOption" in q:
        if q["correctOption"] != q["correctOptionId"]:
            q["correctOption"] = q["correctOptionId"]
            changed = True

if changed:
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
    print("Fixed network-questions.json")
else:
    print("No changes needed")
