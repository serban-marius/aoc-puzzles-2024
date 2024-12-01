const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = input.split('\n');
let arrayA = [];
let arrayB = [];

for (let i = 0; i < inputArray.length; i++) {
  let coordinates = inputArray[i].split('   ');

  arrayA.push(coordinates[0]);
  arrayB.push(coordinates[1]);
}

arrayA = arrayA.sort((a, b) => a - b);
arrayB = arrayB.sort((a, b) => a - b);

let distanceBetween = 0;

for (let row = 0; row < arrayA.length; row++) {
  distanceBetween += Math.abs(arrayB[row] - arrayA[row]);
}

console.log(distanceBetween);