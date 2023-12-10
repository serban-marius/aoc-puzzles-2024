const fs = require('node:fs'),
    part1 = require('./part1.js'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = part1.sanitizeInput(input);

let sumPreviousExtrapolated = 0;

for (let key in inputArray) {
    let sequences = part1.getSequences(inputArray[key]);

    let previousValue = 0;
    for (let i = sequences.length - 2; i >= 0; i--){
        sequences[i].unshift(sequences[i][0] - previousValue);
        previousValue = sequences[i][0];
    }

    sumPreviousExtrapolated += sequences[0][0];
}

console.log("Part 2 solution ==> \n" + sumPreviousExtrapolated);