const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = input.split('\n');

let stringTime = inputArray[0].replace(/Time:\W+/g, '');
let time = parseInt(stringTime.replace(/\W+/g, ''));
let stringDistance = inputArray[1].replace(/Distance:\W+/g, '');
let distance = parseInt(stringDistance.replace(/\W+/g, ''));
let waysToWin = 0;

for (let second = 0; second < time; second++) {
    if (second * (time - second) > distance) {
        waysToWin++;
    }
}

console.log(waysToWin);