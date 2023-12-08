const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let array = input.split('\n');

let instructions = array.shift().split('');

array.shift();

let assArray = []

array.forEach(node => {
    let temporalArray = node.split(' = ');
    assArray[temporalArray[0]] = temporalArray[1];
})

for (let key in assArray) {
    assArray[key] = assArray[key].replace(/\(/g, '').replace(/\)/g, '').split(", ");
}

let actual = 'AAA';
let steps = 0;
let lastInstruction = 0

while (actual !== 'ZZZ') {
    steps++;

    if (lastInstruction < instructions.length - 1) {
        if (instructions[lastInstruction] === 'L') actual = assArray[actual][0]
        if (instructions[lastInstruction] === 'R') actual = assArray[actual][1]
        lastInstruction++
        continue;
    }
    if (lastInstruction === instructions.length - 1) {
        if (instructions[lastInstruction] === 'L') actual = assArray[actual][0]
        if (instructions[lastInstruction] === 'R') actual = assArray[actual][1]
        lastInstruction = 0
    }
}

console.log(steps);




