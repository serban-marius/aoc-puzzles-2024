const part1 = require('./part1.js');

let sumPreviousExtrapolated = 0;

for (let key in part1.inputArray) {
    let sequences = part1.getSequences(part1.inputArray[key]);

    let previousValue = 0;
    for (let i = sequences.length - 2; i >= 0; i--){
        sequences[i].unshift(sequences[i][0] - previousValue);
        previousValue = sequences[i][0];
    }

    sumPreviousExtrapolated += sequences[0][0];
}

console.log("Part 2 solution ==> \n" + sumPreviousExtrapolated);