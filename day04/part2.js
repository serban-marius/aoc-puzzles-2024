const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputNoCard = input.replace(/Card \d+:\W+/g, '');
let inputArray = inputNoCard.split('\n');
let howManyScratches = Array(inputArray.length).fill(1);

let pileValue = 0;

for (let i1 = 0; i1 < inputArray.length; i1++) {
    const card = inputArray[i1];
    let cardSanitized = card.replace(/\s+/g, ';');
    let cardNumbersList = cardSanitized.split(';|;');
    let cardNumbersArray = []

    for (let i = 0; i < cardNumbersList.length; i++) {
        const list = cardNumbersList[i];
        cardNumbersArray.push(list.split(";"));
    }

    let totalCardValue = 0;

    cardNumbersArray[0].forEach(winningNumber => {
        if (cardNumbersArray[1].includes(winningNumber)) {
            totalCardValue++;
        }
    })

    for (let x = 0; x < totalCardValue; x++) {
        //Sum 1 to avoid modifying the quantity of this scratch.
        howManyScratches[i1 + x + 1] += 1 * howManyScratches[i1];
    }
}

howManyScratches.forEach(num => {
    pileValue += num;
})

console.log(pileValue);