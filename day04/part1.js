const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputNoCard = input.replace(/Card \d+:\W+/g, '');
let inputArray = inputNoCard.split('\n');
let pileValue = 0;

inputArray.forEach(card => {
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
            if (totalCardValue === 0) totalCardValue++;
            else totalCardValue = totalCardValue * 2;
        }
    })

    pileValue += totalCardValue;
})

console.log(pileValue);