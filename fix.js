const fs = require('fs');
let content = fs.readFileSync('src/content/computer-organization-architecture-module.json', 'utf8');

// The file currently has things like:
// "\\\ceil \\\og_2(N+1) \\rceil"
// "\\\sum"
// We want valid JSON strings. In valid JSON, to have a literal backslash followed by a letter,
// it must be written as \\letter in the JSON string (so the string parser sees \letter).
// In the text file, it should be two backslashes. 
// Right now, it's three backslashes because of my buggy replacement.
content = content.replace(/\\\\\\/g, '\\\\');

// Also, let's fix any single backslash that should be double. 
// A single backslash followed by a character that is NOT a valid json escape character is invalid JSON.
// Valid json escapes: ", \, /, b, f, n, r, t, u
content = content.replace(/\\([^"\\\/bfnrtu])/g, '\\\\$1');

fs.writeFileSync('src/content/computer-organization-architecture-module.json', content);
console.log('Fixed');
