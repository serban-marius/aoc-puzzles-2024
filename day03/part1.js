const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

const instructions = input.match(/mul\(\d{1,3},\d{1,3}\)/gm);

let total = 0;

for (let i = 0; i < instructions.length; i++) {
  let instruction = instructions[i].replace(/mul\(/g, '');
  instruction = instruction.replace(/\)/g, '').split(',');

  total += instruction[0] * instruction[1];
}

console.log(total);