const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = input.split('\n');

let stringTime = inputArray[0].replace(/Time:\W+/g, '');
let times = splitMaps(stringTime.replace(/\W+/g, ';'));
let stringDistance = inputArray[1].replace(/Distance:\W+/g, '');
let distances = splitMaps(stringDistance.replace(/\W+/g, ';'));
let waysToWin = Array(times.length).fill(0);

for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];

    for (let second = 0; second < time; second++) {
        if (second * (time - second) > distance) {
            waysToWin[i]++;
        }
    }
}

console.log(waysToWin.reduce((a, b) => a * b, 1));

function splitMaps(string) {
    return stringArrayToNumberArray(string.split(";"));
}

function stringArrayToNumberArray(stringArray) {
    let numberArray = [];
    for (let i = 0; i < stringArray.length; i++)
        numberArray.push(parseInt(stringArray[i]));

    return numberArray;
}