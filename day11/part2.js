const part1 = require('./part1.js');
const {columnsWithoutGalaxies, rowsWithoutGalaxies} = require("./part1");

const FACTOR_EXPANSION = 999999;

let totalDistance = 0;

part1.allPairs.forEach(pair => {
    totalDistance += part1.distanceBetweenPairs(FACTOR_EXPANSION, pair, rowsWithoutGalaxies, columnsWithoutGalaxies);
})

console.log("Part 2 SOLUTION --> \n" + totalDistance);
