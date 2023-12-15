const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'README.md'),
    input = fs.readFileSync(filePath).toString();

console.log(input);