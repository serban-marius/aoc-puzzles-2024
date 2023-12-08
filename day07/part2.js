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
    if (card === 'T') return 10;
    if (card === '9') return 9;
    if (card === '8') return 8;
    if (card === '7') return 7;
    if (card === '6') return 6;
    if (card === '5') return 5;
    if (card === '4') return 4;
    if (card === '3') return 3;
    if (card === '2') return 2;
    if (card === 'J') return 1;
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
    for (let card in array) {
        if (array[card] === 5) return true;
        if (card !== 'J') {
            if (array[card] === 4 && array['J'] === 1) return true;
            if (array[card] === 3 && array['J'] === 2) return true;
            if (array[card] === 2 && array['J'] === 3) return true;
            if (array[card] === 1 && array['J'] === 4) return true;
        }
    }

    return false;
}

function isFourOfAKind(array) {
    let fourOfAKind = false;

    for (let card in array) {
        if (array[card] === 4) fourOfAKind = true
        if (card !== 'J') {
            if (array[card] === 3 && array['J'] >= 1) fourOfAKind = true
            if (array[card] === 2 && array['J'] >= 2) fourOfAKind = true
            if (array[card] === 1 && array['J'] >= 3) fourOfAKind = true
        }
    }

    return fourOfAKind;
}

function isFullHouse(array) {
    let threeOfAKind = false;
    let threeOfAKindCard = '';
    let pair = false;
    let secondPair = false;
    let pairCard = '';
    let secondPairCard = '';
    let jokers = array['J'];

    for (let card in array) {
        if (array[card] === 3) {
            threeOfAKind = true;
            threeOfAKindCard = card;
        }
        if (array[card] === 2 && !pair) {
            pair = true;
            pairCard = card;
            continue;
        }
        if (array[card] === 2 && pair) {
            secondPair = true;
            secondPairCard = card;
        }
    }

    if (threeOfAKind && pair) return true;

    return jokers === 1 && pair && secondPair;
}

function isThreeOfAKind(array) {
    let threeOfAKind = false;
    let twoOfAKind = false;
    let jokers = array['J'];

    for (let card in array) {
        if (array[card] === 3) threeOfAKind = true
        if (array[card] === 2) twoOfAKind = true
    }

    if (threeOfAKind && !twoOfAKind) return true;

    if (jokers === 1 && twoOfAKind) return true;

    return jokers === 2;


}

function isTwoPair(array) {
    let firstPair= false;
    let secondPair = false;

    for (let card in array) {
        if (array[card] === 2 && !firstPair) {
            firstPair = true
            continue;
        }
        if (array[card] === 2 && firstPair) secondPair = true
    }

    return secondPair;
}

function isOnePair(array) {
    let firstPair = false;
    let secondPair = false;
    let jokers = array['J'];

    for (let card in array) {
        if (array[card] === 2 && !firstPair) {
            firstPair = true
            continue;
        }
        if (array[card] === 2 && firstPair) secondPair = true
    }

    if (firstPair && !secondPair) return true;

    return jokers === 1;
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