const fs = require('node:fs'),
    array = require('../common/array'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let transposedInput = transpose(array.sanitizeInput(input));

transposedInput.forEach(column => {
    for(let position = 0; position < column.length; position++) {
        if (column[position] === 'O') {
            let temporalPosition = position;
            while (temporalPosition > 0 && column[temporalPosition - 1] === '.') {
                column[temporalPosition - 1] = 'O';
                column[temporalPosition] = '.';
                temporalPosition--;
            }
        }
    }
})

console.log(countValue(transposedInput));


//Make rows into columns and columns into rows to make things easier.
function transpose(matrix) {
    let [row] = matrix
    return row.map((value, column) => matrix.map(row => row[column]))
}

function countValue(array) {
    let totalLoad = 0;

    array.forEach(column => {
        for(let position = 0; position < column.length; position++) {
            if (column[position] === 'O') {
                totalLoad += column.length - position
            }
        }
    })

    return totalLoad
}