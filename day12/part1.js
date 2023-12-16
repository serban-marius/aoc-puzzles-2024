const fs = require('node:fs'),
    path = require('path'),
    array = require('../common/array.js'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

const inputArray = arrayFromInput(input);
let total = 0;

inputArray.forEach(arrangement => {
    const [pattern, damagedSequence] = arrangement;
    const expectedSequence = damagedSequence.map(Number).join(',');
    const validArrangements = findValidArrangements(pattern, expectedSequence);

    total += validArrangements.length;
    console.log(total);
});

console.log(total);

function findValidArrangements(pattern, expectedSequence) {
    const validArrangements = [];
    const patternArray = pattern.split('');

    function backtrack(index, currentPattern) {
        if (index === patternArray.length) {
            if (array.countHashSequences(currentPattern).join(',') === expectedSequence) {
                validArrangements.push(currentPattern.join(''));
            }
            return;
        }

        if (patternArray[index] === '?') {
            ['.', '#'].forEach(char => {
                currentPattern[index] = char;
                backtrack(index + 1, currentPattern);
            });
        } else {
            currentPattern[index] = patternArray[index];
            backtrack(index + 1, currentPattern);
        }
    }

    backtrack(0, Array(patternArray.length).fill(''));

    return validArrangements;
}

function arrayFromInput(input) {
    return input.split('\n').map(line => {
        const [pattern, sequence] = line.split(' ');
        return [pattern, sequence.split(',')];
    });
}

module.exports = {inputArray, findValidArrangements}
