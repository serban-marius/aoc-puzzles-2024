const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt')

let input = fs.readFileSync(filePath).toString();

input = input.replace(/Game \d+: /g, '');

let inputArray = input.split('\n');

const limitRed = 12;
const limitGreen = 13;
const limitBlue = 14;
let gameNumber = 1;
let gameIsValid = true;
let gamesSum = 0;

inputArray.forEach(game => {
    let gameSubsets = game.split(';');

    gameSubsets.every(subset => {
        let cubes = subset.split(',');

        cubes.every(cube => {
            if (cube.match(/\d blue/g)) {
                let blueQuantity = +cube.replace(/\sblue/g, '');

                if (blueQuantity > limitBlue) {
                    gameIsValid = false;
                }
            }

            if (cube.match(/\d green/g)) {
                let blueQuantity = +cube.replace(/\sgreen/g, '');

                if (blueQuantity > limitGreen) {
                    gameIsValid = false;
                }
            }

            if (cube.match(/\d red/g)) {
                let blueQuantity = +cube.replace(/\sred/g, '');

                if (blueQuantity > limitRed) {
                    gameIsValid = false;
                }
            }
            return gameIsValid;
        })

        return gameIsValid;
    })

    if (gameIsValid) {
        gamesSum += gameNumber
    }
    gameIsValid = true;
    gameNumber++;
})

console.log(gamesSum);
