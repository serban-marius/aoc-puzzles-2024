const example =
    "Time:      7  15   30\n" +
    "Distance:  9  40  200";

const input =
    "Time:        56     97     77     93\n" +
    "Distance:   499   2210   1097   1440";

const input_part_2 =
    "Time:        56977793\n" +
    "Distance:   499221010971440";

// let inputArray = example.split('\n');
// let inputArray = input.split('\n');
let inputArray = input_part_2.split('\n');

let stringTime = inputArray[0].replace(/Time:\W+/g,'');
let times = splitMaps(stringTime.replace(/\W+/g,';'));
console.log(times);

let stringDistance = inputArray[1].replace(/Distance:\W+/g,'');
let distances = splitMaps(stringDistance.replace(/\W+/g,';'));
console.log(distances);

let waysToWin = Array(times.length).fill(0);

console.log(waysToWin);

for (let i = 0; i < times.length; i++){
    const time = times[i];
    const distance = distances[i];

    for (let second = 0; second < time; second++) {
        if (second * (time - second) > distance) {
            waysToWin[i]++;
            console.log("Distance traveled ==> " + second * (time - second));
        }
    }
}

console.log(waysToWin.reduce((a, b)=> a*b, 1));

function splitMaps(string) {
    return stringArrayToNumberArray(string.split(";"));
}

function stringArrayToNumberArray(stringArray) {
    let numberArray = [];
    for (let i = 0; i < stringArray.length; i++)
        numberArray.push(parseInt(stringArray[i]));

    return numberArray;
}