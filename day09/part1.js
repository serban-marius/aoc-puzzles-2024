const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = sanitizeInput(input);

let sumExtrapolated = 0;

for (let key in inputArray) {
    let sequences = getSequences(inputArray[key]);

    let extrapolated = 0;

    sequences.forEach(sequence => {
        extrapolated += sequence[sequence.length - 1]
    })

    sumExtrapolated += extrapolated;
}

console.log("Part 1 solution ==> \n" + sumExtrapolated);

function getSequences(array) {
    let sequenceArray = [array];
    while(!allZeros(sequenceArray[sequenceArray.length - 1])){
        sequenceArray.push(getDifferenceAtSteps(sequenceArray[sequenceArray.length - 1]));
    }

    return sequenceArray;
}

function getDifferenceAtSteps(array) {
    let differenceArray = [];

    for (let x = 1; x < array.length; x++) {
        differenceArray.push(array[x] - array[x-1]);
    }

    return differenceArray;
}

function allZeros(array) {
    let some = new Set(array)
    return some.size === 1 && some.has(0);
}

function sanitizeInput(input) {
    return input.split('\n').map(
        string => string.split(' ').map(
            number => parseInt(number)
        ));
}

module.exports = { sanitizeInput, getSequences };