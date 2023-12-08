const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = input.split('\n\n');

let seeds = stringArrayToNumberArray(
    inputArray[0]
        .replace(/seeds:\W+/g, '')
        .split(" ")
);

// SEED TO SOIL
let soil = alchemy(seeds, inputArray[1]);

// SOIL TO FERTILIZER
let fertilizer = alchemy(soil, inputArray[2]);

// FERTILIZER TO WATER
let water = alchemy(fertilizer, inputArray[3]);

// WATER TO LIGHT
let light = alchemy(water, inputArray[4]);

// LIGHT TO TEMPERATURE
let temperature = alchemy(light, inputArray[5]);

// TEMPERATURE TO HUMIDITY
let humidity = alchemy(temperature, inputArray[6]);

// HUMIDITY TO LOCATION
let location = alchemy(humidity, inputArray[7]);

console.log(Math.min(...location));

function splitMaps(string) {
    return stringArrayToNumberArray(string.split(" "));
}

function getMap(array) {
    let arraySplit = array.split("\n");
    arraySplit.shift(); // Remove title
    return arraySplit.map(splitMaps);
}

function getRelationArray(array) {
    let relationArray = []
    array.forEach(map => {
        let source = map[1];
        let destination = map[0];
        let range = map[2];
        let sourceFinal = +source + +range;
        relationArray.push([source, sourceFinal, destination])
    })

    return relationArray;
}

function translate(arrayToTranslate, relationArray) {
    let translatedArray = [];

    arrayToTranslate.forEach(translate => {
        let translated = false;
        for (let i = 0; i < relationArray.length; i++) {
            const map = relationArray[i];
            if (translate > map[0] && translate < map[1]) {
                translatedArray.push(+translate - +map[0] + +map[2]);
                translated = true;
                break;
            }
        }

        if (!translated) translatedArray.push(+translate);
    })

    return translatedArray;
}

function alchemy(object, map) {
    let objectToGold = getMap(map)
    let relationArray = getRelationArray(objectToGold);

    return translate(object, relationArray);
}

function stringArrayToNumberArray(stringArray) {
    let numberArray = [];
    for (let i = 0; i < stringArray.length; i++)
        numberArray.push(parseInt(stringArray[i]));

    return numberArray;
}