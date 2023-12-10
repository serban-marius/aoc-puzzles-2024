const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = sanitizeInput(input),
    {row, column} = findStart(inputArray),
    rowA = row,
    rowB = row,
    previousRowA = '',
    previousRowB = '',
    columnA = column,
    columnB = column,
    previousColumnA = '',
    previousColumnB = '',
    distance = 0;

do {
    distance++;
    let {temporalColumnA, temporalRowA} = findNextA(rowA, columnA, previousColumnA, previousRowA, inputArray)
    previousRowA = rowA;
    previousColumnA = columnA;
    rowA = temporalRowA;
    columnA = temporalColumnA;

    let {temporalColumnB, temporalRowB} = findNextB(rowB, columnB, previousColumnB, previousRowB, inputArray)
    previousRowB = rowB;
    previousColumnB = columnB;
    rowB = temporalRowB;
    columnB = temporalColumnB;

} while (rowA !== rowB || columnA !== columnB)

console.log("Solution Part 1 -->\n" + distance);

function findNextA(row, column, previousColumnA, previousRowA, inputArray) {
    let temporalColumnA = column,
        temporalRowA = row;
    if (canIGoBehind(row, column, inputArray)) {
        if (previousColumnA !== temporalColumnA - 1) {
            temporalColumnA--;
            return {temporalColumnA, temporalRowA}
        }
    }
    if (canIGoDown(row, column, inputArray)) {
        if (previousRowA !== temporalRowA + 1) {
            temporalRowA++;
            return {temporalColumnA, temporalRowA}
        }
    }
    if (canIGoFront(row, column, inputArray)) {
        if (previousColumnA !== temporalColumnA + 1) {
            temporalColumnA++;
            return {temporalColumnA, temporalRowA}
        }
    }
    if (canIGoUp(row, column, inputArray)) {
        if (previousRowA !== temporalRowA - 1) {
            temporalRowA--;
            return {temporalColumnA, temporalRowA}
        }
    }
}

function findNextB(row, column, previousColumnB, previousRowB, inputArray) {
    let temporalColumnB = column,
        temporalRowB = row;

    if (canIGoUp(row, column, inputArray)) {
        if (previousRowB !== temporalRowB - 1) {
            temporalRowB--;
            return {temporalColumnB, temporalRowB}
        }
    }
    if (canIGoFront(row, column, inputArray)) {
        if (previousColumnB !== temporalColumnB + 1) {
            temporalColumnB++;
            return {temporalColumnB, temporalRowB}
        }
    }
    if (canIGoDown(row, column, inputArray)) {
        if (previousRowB !== temporalRowB + 1) {
            temporalRowB++;
            return {temporalColumnB, temporalRowB}
        }
    }
    if (canIGoBehind(row, column, inputArray)) {
        if (previousColumnB !== temporalColumnB - 1) {
            temporalColumnB--;
            return {temporalColumnB, temporalRowB}
        }
    }
    printArray(inputArray);
}

function getCharBehind(row, column, inputArray) {
    if (column > 0) {
        return inputArray[row][column - 1];
    }
    return '.'
}

function canIGoBehind(row, column, inputArray) {
    let actualChar = inputArray[row][column];
    if (actualChar === 'S' || actualChar === '-' || actualChar === '7' || actualChar === 'J') {
        let char = getCharBehind(row, column, inputArray);
        return char === '-' || char === 'L' || char === 'F';
    }
    return false
}

function getCharUp(row, column, inputArray) {
    if (row > 0) {
        return inputArray[row - 1][column];
    }
    return '.'
}

function canIGoUp(row, column, inputArray) {
    let actualChar = inputArray[row][column];
    if (actualChar === 'S' || actualChar === '|' || actualChar === 'J' || actualChar === 'L') {
        let char = getCharUp(row, column, inputArray);
        return char === '|' || char === '7' || char === 'F';
    }
    return false;
}

function getCharFront(row, column, inputArray) {
    if (column < (inputArray[row].length - 1)) {
        return inputArray[row][column + 1];
    }
    return '.'
}

function canIGoFront(row, column, inputArray) {
    let actualChar = inputArray[row][column];
    if (actualChar === 'S' || actualChar === '-' || actualChar === 'L' || actualChar === 'F') {
        let char = getCharFront(row, column, inputArray);
        return char === '-' || char === '7' || char === 'J';
    }
    return false;
}

function getCharDown(row, column, inputArray) {
    if (row < (inputArray.length - 1)) {
        return inputArray[row + 1][column];
    }
    return '.'
}

function canIGoDown(row, column, inputArray) {
    let actualChar = inputArray[row][column];
    if (actualChar === 'S' || actualChar === '|' || actualChar === '7' || actualChar === 'F') {
        let char = getCharDown(row, column, inputArray);
        return char === '|' || char === 'L' || char === 'J';
    }
    return false;
}

function findStart(array) {
    for (let row = 0; row < array.length; row++) {
        const line = array[row];
        for (let column = 0; column < line.length; column++) {
            const position = line[column];
            if (position === 'S') return {row, column}
        }
    }
}

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

module.exports = {printArray, inputArray}
