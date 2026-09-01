const fs = require('fs');
let content = fs.readFileSync('src/content/computer-organization-architecture-module.json', 'utf8');

content = content.replace(/\\\\\\/g, '\\\\');
content = content.replace(/\\([^"\\\/bfnrtu])/g, '\\\\$1');

fs.writeFileSync('src/content/computer-organization-architecture-module.json', content);
console.log('Fixed');
