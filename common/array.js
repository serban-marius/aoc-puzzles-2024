function sanitizeInput(input) {
    return input.split('\n').map(line => line.split(''));
}

function printArray(array) {
    for (let row = 0; row < array.length; row++) {
        let rowLetters = '';
        const line = array[row];
        for (let column = 0; column < line.length; column++) {
            rowLetters += line[column];
        }
        console.log(rowLetters);
    }
}

module.exports = {sanitizeInput, printArray}