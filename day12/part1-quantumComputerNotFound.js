const fs = require('node:fs'),
    array = require('../common/array.js'),
    path = require('path'),
    filePath = path.join(__dirname, 'example.txt'),
    // filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

const inputArray = arrayFromInput(input);

let springsSeedCache = {};
let countHashSequencesCache = {};

let total = 0;

inputArray.forEach(arrangement => {
    let damaged = arrangement[1].reduce((acc, spring) => acc + +spring, 0),
        operational = arrangement[0].length - damaged,
        springsSeed = getSpringsSeedMemoized(operational, damaged),
        springCombinations = array.permuteV2(springsSeed, arrangement[0].length),
        expectedSequence = arrangement[1].map(Number).join(''),
        originalPattern = arrangement[0];

    let lastElement = '';

    let validArrangements = [];
    let alreadyChecked = [];

    for (let x = 0; x < springCombinations.length; x++) {
        let actualElement = springCombinations.at(x).join('');

        let actualSequence = countHashSequencesMemoized(springCombinations.at(x)).join('');
        if (actualSequence !== expectedSequence) continue;

        if (alreadyChecked.includes(actualElement)) continue;
        alreadyChecked.push(actualElement);

        if (actualElement === lastElement) continue;
        lastElement = actualElement;

        if (validArrangements.includes(actualElement)) continue;
        if (!doesPatternMatch(actualElement.split(''), originalPattern)) continue;

        validArrangements.push(actualElement);
        console.log(actualElement);
    }

    console.log(validArrangements);

    total += validArrangements.length;

    console.log(total);

    springsSeedCache = {};
    countHashSequencesCache = {};
});

console.log(total);

function doesPatternMatch(pattern, originPattern) {
    if (pattern.length !== originPattern.length) {
        return false;
    }

    for (let i = 0; i < pattern.length; i++) {
        if (originPattern[i] !== '?' && originPattern[i] !== pattern[i]) {
            return false;
        }
    }

    return true;
}

function countHashSequencesMemoized(arrayToCount) {
    const key = arrayToCount.join('');
    if (countHashSequencesCache[key]) {
        return countHashSequencesCache[key];
    }
    const result = array.countHashSequences(arrayToCount);
    countHashSequencesCache[key] = result;
    return result;
}

function getSpringsSeedMemoized(operational, damaged) {
    const key = `${operational},${damaged}`;
    if (springsSeedCache[key]) {
        return springsSeedCache[key];
    }
    const result = getSpringsSeed(operational, damaged);
    springsSeedCache[key] = result;
    return result;
}

function getSpringsSeed(operational, damaged) {
    let springs = []

    for (let x = 0; x < damaged; x++) {
        springs.push('#')
    }
    for (let x = 0; x < operational; x++) {
        springs.push('.')
    }

    return springs;
}

function arrayFromInput(input) {
    return input.split('\n').map(
        string => string.split(' ').map(
            arrangement => {
                if (arrangement.search(',') > -1) return arrangement.split(',')
                else return arrangement.split('')
            }
        )
    );
}
