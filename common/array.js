const percom = require("percom"),
    $C = require("js-combinatorics");

function sanitizeInput(input) {
    return input.split('\n').map(line => line.split(''));
}

function printArray(array) {
    for (let row = 0; row < array.length; row++) {
        let rowLetters = '';
        const line = array[row];
        for (let column = 0; column < line.length; column++) {
            rowLetters += line[column];
        }
        console.log(rowLetters);
    }
}

function countHashSequences(array) {
    let sequences = [];
    let currentLength = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] === '#') {
            currentLength++;
        } else if (currentLength > 0) {
            sequences.push(currentLength);
            currentLength = 0;
        }
    }

    if (currentLength > 0) {
        sequences.push(currentLength);
    }

    return sequences;
}

function getPossibleCombinations(array) {
    return array.flatMap(
        (v, i) => array.slice(i + 1).map(w => [v, w])
    );
}

function permute(arrayToPermute, lengthOfPermutations) {
    return removeDuplicates2DArray(percom.per(arrayToPermute, lengthOfPermutations))
}

function permuteV2(arrayToPermute) {
    return new $C.Permutation(arrayToPermute.join(''));
}

function removeDuplicates2DArray(sourceArray) {
    return sourceArray.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
        .filter(function (item, index, sourceArray) {
            return sourceArray.indexOf(item, index + 1) === -1;
        }) // check if there is any occurence of the item in whole array
        .reverse().map(JSON.parse)
}

module.exports = {sanitizeInput, printArray, getPossibleCombinations, permute, permuteV2, countHashSequences}