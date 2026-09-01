import json
import os
import glob

# Paths
base_dir = "/home/yashverma/Personal/iocl-prep/src/content"

# 1. Build topic id -> title mapping from all module files
topic_map = {}
for module_file in glob.glob(os.path.join(base_dir, "*-module.json")):
    with open(module_file, 'r') as f:
        try:
            data = json.load(f)
            for topic in data.get("topics", []):
                topic_map[topic["id"]] = topic["title"]
        except Exception as e:
            print(f"Error loading {module_file}: {e}")

print(f"Loaded {len(topic_map)} topic mappings.")

# 2. Process all question files
for questions_file in glob.glob(os.path.join(base_dir, "*-questions.json")) + glob.glob(os.path.join(base_dir, "domain-*.json")):
    if "questions.json" == os.path.basename(questions_file):
        continue # Ignore the main questions.json if it exists and is compiled? Wait, `questions.json` might be an old file, let's process it too if it's there. Actually, I'll process everything matching pattern.
    
    if os.path.basename(questions_file) == "questions.json":
        # Usually questions.json is compiled or something else, but let's check
        pass

    with open(questions_file, 'r') as f:
        try:
            data = json.load(f)
        except Exception as e:
            print(f"Error loading {questions_file}: {e}")
            continue

    changed = False
    for q in data:
        # a. Fix topic title if it's an ID
        if q.get("topic") in topic_map:
            q["topic"] = topic_map[q["topic"]]
            changed = True
        
        # b & c. Fix option IDs to be globally unique
        # We will use f"{q['id']}-{old_option_id}" to make them unique if they aren't already prefixed with q['id']
        old_correct = q.get("correctOptionId")
        new_correct = old_correct
        
        for idx, opt in enumerate(q.get("options", [])):
            old_id = opt["id"]
            if not old_id.startswith(f"{q['id']}-"):
                new_id = f"{q['id']}-{old_id}"
                opt["id"] = new_id
                if old_correct == old_id:
                    new_correct = new_id
                changed = True
        
        if new_correct != old_correct:
            q["correctOptionId"] = new_correct

    if changed:
        with open(questions_file, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Updated {os.path.basename(questions_file)}")
