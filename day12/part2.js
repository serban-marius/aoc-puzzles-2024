const part1 = require('./part1.js'),
    array = require('../common/array.js');

let total = 0;

part1.inputArray.forEach(arrangement => {
    let [pattern, damagedSequence] = arrangement;

    pattern = pattern.repeat(5);
    damagedSequence = damagedSequence.join('').repeat(5).split('');

    const expectedSequence = damagedSequence.map(Number).join(',');
    const validArrangements = part1.findValidArrangements(pattern, expectedSequence);

    total += validArrangements.length;

});

console.log(total);
