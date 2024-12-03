const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

const instructions = input.split(/(?=don't\(\))/g);

let goodParts = "";

for (let i = 0; i < instructions.length; i++) {
  if (instructions[i].includes("don't()")) {
    if (instructions[i].includes("do()")) {
      const goodPart = instructions[i].split(/do\(\)(.*)/s)[1];
      goodParts += goodPart;
    }
  } else {
    goodParts += instructions[i];
  }
}

const instructionsGood = goodParts.match(/mul\(\d{1,3},\d{1,3}\)/gm);

let total = 0;

for (let i = 0; i < instructionsGood.length; i++) {
  let instruction = instructionsGood[i].replace(/mul\(/g, '');
  instruction = instruction.replace(/\)/g, '').split(',');

  total += instruction[0] * instruction[1];
}

console.log(total);