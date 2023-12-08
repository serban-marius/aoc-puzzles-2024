const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = input.split('\n');

inputArray = inputArray.map(nine);
inputArray = inputArray.map(eight);
inputArray = inputArray.map(seven);
inputArray = inputArray.map(six);
inputArray = inputArray.map(five);
inputArray = inputArray.map(four);
inputArray = inputArray.map(three);
inputArray = inputArray.map(two);
inputArray = inputArray.map(one);
inputArray = inputArray.map(removeChar);

let sum = calculateSum(inputArray);

console.log(sum);

function calculateSum(array) {
    let sum = 0;

    array.forEach(num => {
        let value = num.split('');
        const calibrationValue = "" + value[0] + value[value.length - 1];
        sum += +calibrationValue
    })

    return sum;
}

function removeChar(string) {
    return string.replace(/\D/g, '');
}

function one(string) {
    return string.replace(/one/g, 'o1e');
}

function two(string) {
    return string.replace(/two/g, 't2o');
}

function three(string) {
    return string.replace(/three/g, 't3e');
}

function four(string) {
    return string.replace(/four/g, 'f4r');
}

function five(string) {
    return string.replace(/five/g, 'f5e');
}

function six(string) {
    return string.replace(/six/g, 's6x');
}

function seven(string) {
    return string.replace(/seven/g, 's7n');
}

function eight(string) {
    return string.replace(/eight/g, 'e8t');
}

function nine(string) {
    return string.replace(/nine/g, 'n9e');
}