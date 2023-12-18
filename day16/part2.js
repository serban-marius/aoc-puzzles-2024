const part1 = require('./part1'),
    array = require('../common/array');

let differentResults = [],
    arrayCopy = [],
    rowLimit = part1.inputArray.length,
    columnLimit = part1.inputArray[0].length,
    elementsEnergized = [];


// Start from all rows in the left.
for (let row = 0; row < part1.inputArray.length; row++) {
    arrayCopy = part1.inputArray.map(function (arr) {
        return arr.slice();
    })

    energize(row, 0, 'E');
    differentResults.push(returnCountEnergized())

    elementsEnergized = [];
    arrayCopy = []
}

// Start from all rows in the right.
for (let row = 0; row < part1.inputArray.length; row++) {
    arrayCopy = part1.inputArray.map(function (arr) {
        return arr.slice();
    })

    energize(row, part1.inputArray[0].length -1, 'W');
    differentResults.push(returnCountEnergized())

    elementsEnergized = [];
    arrayCopy = []
}

// Start from all columns up.
for (let column = 0; column < part1.inputArray[0].length; column++) {
    arrayCopy = part1.inputArray.map(function (arr) {
        return arr.slice();
    })

    energize(0, column, 'S');
    differentResults.push(returnCountEnergized())

    elementsEnergized = [];
    arrayCopy = []
}

// Start from all columns down.
for (let column = 0; column < part1.inputArray[0].length; column++) {
    arrayCopy = part1.inputArray.map(function (arr) {
        return arr.slice();
    })

    energize(part1.inputArray.length - 1, column, 'S');
    differentResults.push(returnCountEnergized())

    elementsEnergized = [];
    arrayCopy = []
}

function energize(actualRow, actualColumn, directionOfMovement) {
    console.log("Hi, I'm here cause without me this function throws an 'RangeError: Maximum call stack size exceeded'")
    if (actualRow >= 0 && actualRow < rowLimit && actualColumn >= 0 && actualColumn < columnLimit) {
        let position = part1.inputArray[actualRow][actualColumn]
        switch (position) {
            case '.':
                arrayCopy[actualRow][actualColumn] = '#'
                move(actualRow, actualColumn, directionOfMovement)
                break;
            case '-':
                if (!isLoop(actualRow, actualColumn, directionOfMovement)) {
                    arrayCopy[actualRow][actualColumn] = '#'
                    if (directionOfMovement === 'E' || directionOfMovement === 'W') {
                        move(actualRow, actualColumn, directionOfMovement)
                        break;
                    }
                    if (directionOfMovement === 'S' || directionOfMovement === 'N') {
                       move(actualRow, actualColumn, 'E')
                       move(actualRow, actualColumn, 'W')
                        break;
                    }
                }
                break;
            case '|':
                if (!isLoop(actualRow, actualColumn, directionOfMovement)) {
                    arrayCopy[actualRow][actualColumn] = '#'
                    if (directionOfMovement === 'S' || directionOfMovement === 'N') {
                        move(actualRow, actualColumn, directionOfMovement)
                        break;
                    }
                    if (directionOfMovement === 'E' || directionOfMovement === 'W') {
                        move(actualRow, actualColumn, 'S')
                        move(actualRow, actualColumn, 'N')
                        break;
                    }
                }
                break;
            case '/':
                if (!isLoop(actualRow, actualColumn, directionOfMovement)) {
                    arrayCopy[actualRow][actualColumn] = '#'
                    if (directionOfMovement === 'E') move(actualRow, actualColumn, 'N')
                    if (directionOfMovement === 'S') move(actualRow, actualColumn, 'W')
                    if (directionOfMovement === 'W') move(actualRow, actualColumn, 'S')
                    if (directionOfMovement === 'N') move(actualRow, actualColumn, 'E')
                }
                break;
            case '\\':
                if (!isLoop(actualRow, actualColumn, directionOfMovement)) {
                    arrayCopy[actualRow][actualColumn] = '#'
                    if (directionOfMovement === 'E') move(actualRow, actualColumn, 'S')
                    if (directionOfMovement === 'S') move(actualRow, actualColumn, 'E')
                    if (directionOfMovement === 'W') move(actualRow, actualColumn, 'N')
                    if (directionOfMovement === 'N') move(actualRow, actualColumn, 'W')
                }
                break;
        }

    }
}

function isLoop(row, column, direction) {
    if (elementsEnergized.includes(row + ',' + column + ',' + direction)) return true;
    elementsEnergized.push(row + ',' + column + ',' + direction)
    return false;
}

function returnCountEnergized() {
    let energized = 0;

    arrayCopy.forEach(row => {
        row.forEach(position => {
            if (position === '#') energized++
        })
    })

    return energized;
}

function move(row, column, direction) {
    if (direction === 'E') energize(row, column + 1, 'E');
    if (direction === 'S') energize(row + 1, column, 'S');
    if (direction === 'W') energize(row, column - 1, 'W');
    if (direction === 'N') energize(row - 1, column, 'N');
}

console.log(differentResults);
console.log(Math.max(...differentResults));