const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = input.split('\n');

let handsArray = inputArray.map(splitMaps);

handsArray.forEach(hand => {
    hand.push(handValue(hand[0]));
})

handsArray.sort(compareHands);

let totalWinnings = 0;
let rank = handsArray.length;

handsArray.forEach(hand => {
    totalWinnings += +hand[1] * rank;
    rank--;
})

console.log(totalWinnings);

// FUNCTIONS TO SOLVE PROBLEM

function splitMaps(string) {
    return string.split(" ");
}

function compareHands(a, b) {
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    if (a[2] === b[2]) return compareIdenticalValue(a[0], b[0]);
}

function compareIdenticalValue(a, b) {
    let aReversed = reverse(a);
    let bReversed = reverse(b);
    let i = aReversed.length;
    while (i--) {
        if (convertToValue(aReversed.charAt(i)) > convertToValue(bReversed.charAt(i))) {
            return -1;
        }
        if (convertToValue(aReversed.charAt(i)) < convertToValue(bReversed.charAt(i))) {
            return 1;
        }
    }
    return 0;
}

function reverse(s){
    return s.split("").reverse().join("");
}

function convertToValue(card) {
    if (card === 'A') return 13;
    if (card === 'K') return 12;
    if (card === 'Q') return 11;
    if (card === 'J') return 10;
    if (card === 'T') return 9;
    if (card === '9') return 8;
    if (card === '8') return 7;
    if (card === '7') return 6;
    if (card === '6') return 5;
    if (card === '5') return 4;
    if (card === '4') return 3;
    if (card === '3') return 2;
    if (card === '2') return 1;
}

function handValue(string) {
    let handArray = getAmountEachCard(string);
    if (isFiveOfAKind(handArray)) return 7;
    if (isFourOfAKind(handArray)) return 6;
    if (isFullHouse(handArray)) return 5;
    if (isThreeOfAKind(handArray)) return 4;
    if (isTwoPair(handArray)) return 3;
    if (isOnePair(handArray)) return 2;
    return 1;
}

function isFiveOfAKind(array) {
    let fiveOfAKind = false;

    for (let card in array) {
        if (array[card] === 5) fiveOfAKind = true
    }

    return fiveOfAKind;
}

function isFourOfAKind(array) {
    let fourOfAKind = false;

    for (let card in array) {
        if (array[card] === 4) fourOfAKind = true
    }

    return fourOfAKind;
}

function isFullHouse(array) {
    let threeOfAKind = false;
    let twoOfAKind = false;

    for (let card in array) {
        if (array[card] === 3) threeOfAKind = true
        if (array[card] === 2) twoOfAKind = true
    }

    return threeOfAKind && twoOfAKind;
}

function isThreeOfAKind(array) {
    let threeOfAKind = false;
    let twoOfAKind = false;

    for (let card in array) {
        if (array[card] === 3) threeOfAKind = true
        if (array[card] === 2) twoOfAKind = true
    }

    return threeOfAKind && !twoOfAKind;
}

function isTwoPair(array) {
    let firstTwoOfAKind = false;
    let twoPair = false;

    for (let card in array) {
        if (array[card] === 2 && !firstTwoOfAKind) {
            firstTwoOfAKind = true
            continue;
        }
        if (array[card] === 2 && firstTwoOfAKind) twoPair = true
    }

    return twoPair;
}

function isOnePair(array) {
    let firstTwoOfAKind = false;
    let onePair = false;

    for (let card in array) {
        if (array[card] === 2 && !firstTwoOfAKind) {
            firstTwoOfAKind = true
            onePair = true
            continue;
        }
        if (array[card] === 2 && firstTwoOfAKind) onePair = false
    }

    return onePair;
}

function getAmountEachCard(string) {
    let handArray = getHandArray();

    let i = string.length;
    while (i--) {
        handArray[string.charAt(i)]++
    }

    return handArray;
}

function getHandArray() {
    return {'A': 0, 'K': 0, 'Q': 0, 'J': 0, 'T': 0, '9': 0, '8': 0, '7': 0, '6': 0, '5': 0, '4': 0, '3': 0, '2': 0}
}