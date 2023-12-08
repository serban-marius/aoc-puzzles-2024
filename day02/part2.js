const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt')

let input = fs.readFileSync(filePath).toString();

input = input.replace(/Game \d+: /g, '');

let inputArray = input.split('\n');

let gamesSum = 0;

inputArray.forEach(game => {
    let gameSubsets = game.split(';');

    let maxBlue = 0;
    let maxGreen = 0;
    let maxRed = 0;

    gameSubsets.forEach(subset => {
        let cubes = subset.split(',');

        cubes.forEach(cube => {
            if (cube.match(/\d blue/g)) {
                let blueQuantity = +cube.replace(/\sblue/g, '');

                if (blueQuantity > maxBlue) {
                    maxBlue = blueQuantity
                }
            }

            if (cube.match(/\d green/g)) {
                let greenQuantity = +cube.replace(/\sgreen/g, '');

                if (greenQuantity > maxGreen) {
                    maxGreen = greenQuantity
                }
            }

            if (cube.match(/\d red/g)) {
                let redQuantity = +cube.replace(/\sred/g, '');

                if (redQuantity > maxRed) {
                    maxRed = redQuantity
                }
            }
        })
    })
    gamesSum += maxBlue * maxGreen * maxRed
})

console.log(gamesSum);