const fs = require('node:fs'),
    array = require('../common/array'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = array.sanitizeInput(input),
    arrayCopy = inputArray.map(function (arr) {
        return arr.slice();
    }),
    row = 0,
    column = 0,
    rowLimit = inputArray.length,
    columnLimit = inputArray[0].length,
    directionOfMovement = 'E',
    elementsEnergized = [];

energize(row, column, directionOfMovement);
countEnergized()

function energize(actualRow, actualColumn, directionOfMovement) {
    console.log("Hi, I'm here cause without me this function throws an 'RangeError: Maximum call stack size exceeded'")
    if (actualRow >= 0 && actualRow < rowLimit && actualColumn >= 0 && actualColumn < columnLimit) {
        let position = inputArray[actualRow][actualColumn]
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

function move(row, column, direction) {
    if (direction === 'E') energize(row, column + 1, 'E');
    if (direction === 'S') energize(row + 1, column, 'S');
    if (direction === 'W') energize(row, column - 1, 'W');
    if (direction === 'N') energize(row - 1, column, 'N');
}

function isLoop(row, column, direction) {
    if (elementsEnergized.includes(row + ',' + column + ',' + direction)) return true;
    elementsEnergized.push(row + ',' + column + ',' + direction)
    return false;
}

function countEnergized() {
    let energized = 0;

    arrayCopy.forEach(row => {
        row.forEach(position => {
            if (position === '#') energized++
        })
    })

    console.log(energized);
}

