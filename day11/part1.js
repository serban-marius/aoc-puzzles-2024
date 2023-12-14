const fs = require('node:fs'),
    array = require('../common/array.js'),
    path = require('path'),
    // filePath = path.join(__dirname, 'example1.txt'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

const inputArray = array.sanitizeInput(input),
    galaxies = getGalaxies(inputArray),
    {uniqueRows, uniqueColumns} = getRowsAndColumnsWithGalaxies(galaxies),
    rowsWithoutGalaxies = findMissing(uniqueRows),
    columnsWithoutGalaxies = findMissing(uniqueColumns),
    allPairs = getPossibleCombinations(galaxies);

let totalDistance = 0;

allPairs.forEach(pair => {
    totalDistance += distanceBetweenPairs(pair, rowsWithoutGalaxies, columnsWithoutGalaxies);
})

console.log(totalDistance);

function distanceBetweenPairs(pair, rowsWithoutGalaxies, columnsWithoutGalaxies) {
    let distanceNoExpansion = Math.abs(pair[0][0] - pair[1][0]) + Math.abs(pair[0][1] - pair[1][1]);
    distanceNoExpansion += howManyNumbersInBetween(pair[0][0], pair[1][0], rowsWithoutGalaxies)
    distanceNoExpansion += howManyNumbersInBetween(pair[0][1], pair[1][1], columnsWithoutGalaxies)
    return distanceNoExpansion;
}

function howManyNumbersInBetween(x, anotherX, numbersToCompare) {
    let numbersBetween = 0;
    if (x > anotherX) {
        numbersToCompare.forEach(number => {
            if (number < x && number > anotherX) {
                numbersBetween++;
            }
        })
    } else if (anotherX > x) {
        numbersToCompare.forEach(number => {
            if (number < anotherX && number > x) {
                numbersBetween++;
            }
        })
    }

    return numbersBetween;
}

function getPossibleCombinations(galaxies) {
    return galaxies.flatMap(
        (v, i) => galaxies.slice(i + 1).map(w => [v, w])
    );
}

function findMissing(num) {
    const max = Math.max(...num); // Will find the highest number
    const min = Math.min(...num); // Will find the lowest number
    const missing = []

    for (let i = min; i <= max; i++) {
        if (!num.has(i)) { // Checking whether i(current value) present in num(argument)
            missing.push(i); // Adding numbers which are not in num(argument) array
        }
    }
    return missing;
}

function getGalaxies(array) {
    let galaxies = [];

    for (let row = 0; row < array.length; row++) {
        const line = array[row];
        for (let column = 0; column < line.length; column++) {
            const position = line[column];
            if (position === '#') {
                galaxies.push([row, column]);
            }
        }
    }

    return galaxies;
}

function getRowsAndColumnsWithGalaxies(array) {
    let rows = [];
    let columns = [];

    array.forEach(galaxy => {
        rows.push(galaxy[0])
        columns.push(galaxy[1])
    })

    let uniqueRows = new Set(rows)
    let uniqueColumns = new Set(columns)

    return {uniqueRows, uniqueColumns}
}
