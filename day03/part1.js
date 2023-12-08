const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

const inputArray = input.split('\n');

let matrix = [];

inputArray.forEach(line => {
    matrix.push(line.split(''))
})

let y = 0;

let solution = 0;

matrix.forEach(lineArray => {
    let x = 0;
    let targetX = -1;

    for (; x < lineArray.length;) {
        let char = matrix[y][x];

        if (!isNaN(char)) {

            // Check for symbol behind
            if (x > 0) {
                let char = matrix[y][x - 1];
                if (isNaN(char)) {
                    if (char === '.') {
                    } else {
                        let {fullNumber, positionsAdvanced} = getFullNumber(y, x);
                        solution += fullNumber;

                        if (positionsAdvanced === 0) {
                            x++
                        } else {
                            x += positionsAdvanced;
                        }
                        continue;
                    }
                }
            }

            // Check for symbol behind & up
            if (x > 0 && y > 0) {
                let char = matrix[y - 1][x - 1];
                if (isNaN(char)) {
                    if (char === '.') {
                    } else {
                        let {fullNumber, positionsAdvanced} = getFullNumber(y, x);
                        solution += fullNumber;

                        if (positionsAdvanced === 0) {
                            x++
                        } else {
                            x += positionsAdvanced;
                        }
                        continue;
                    }
                }
            }

            // Check for symbol up
            if (y > 0) {
                let char = matrix[y - 1][x];
                if (isNaN(char)) {
                    if (char === '.') {
                    } else {
                        let {fullNumber, positionsAdvanced} = getFullNumber(y, x);
                        solution += fullNumber;

                        if (positionsAdvanced === 0) {
                            x++
                        } else {
                            x += positionsAdvanced;
                        }
                        continue;
                    }
                }
            }

            // Check for symbol front & up
            if ((x < (lineArray.length - 1)) && y > 0) {
                let char = matrix[y - 1][x + 1];
                if (isNaN(char)) {
                    if (char === '.') {
                    } else {
                        let {fullNumber, positionsAdvanced} = getFullNumber(y, x);
                        solution += fullNumber;

                        if (positionsAdvanced === 0) {
                            x++
                        } else {
                            x += positionsAdvanced;
                        }
                        continue;
                    }
                }
            }

            // Check for symbol front
            if (x < (lineArray.length - 1)) {
                let char = matrix[y][x + 1];
                if (isNaN(char)) {
                    if (char === '.') {
                    } else {
                        let {fullNumber, positionsAdvanced} = getFullNumber(y, x);
                        solution += fullNumber;

                        if (positionsAdvanced === 0) {
                            x++
                        } else {
                            x += positionsAdvanced;
                        }
                        continue;
                    }
                }
            }

            // Check for symbol behind & down
            if (x > 0 && (y < (matrix.length - 1))) {
                let char = matrix[y + 1][x - 1];
                if (isNaN(char)) {
                    if (char === '.') {
                    } else {
                        let {fullNumber, positionsAdvanced} = getFullNumber(y, x);
                        solution += fullNumber;

                        if (positionsAdvanced === 0) {
                            x++
                        } else {
                            x += positionsAdvanced;
                        }
                        continue;
                    }
                }
            }

            // Check for symbol down
            if (y < (matrix.length - 1)) {
                let char = matrix[y + 1][x];
                if (isNaN(char)) {
                    if (char === '.') {
                    } else {
                        let {fullNumber, positionsAdvanced} = getFullNumber(y, x);
                        solution += fullNumber;

                        if (positionsAdvanced === 0) {
                            x++
                        } else {
                            x += positionsAdvanced;
                        }
                        continue;
                    }
                }
            }

            // Check for symbol front & down
            if ((x < (lineArray.length - 1)) && (y < (matrix.length - 1))) {
                let char = matrix[y + 1][x + 1];
                if (isNaN(char)) {
                    if (char === '.') {
                    } else {
                        let {fullNumber, positionsAdvanced} = getFullNumber(y, x);
                        solution += fullNumber;

                        if (positionsAdvanced === 0) {
                            x++
                        } else {
                            x += positionsAdvanced;
                        }
                        continue;
                    }
                }
            }
        }

        x++;
    }

    y++;
})

console.log(solution);

function getFullNumber(y, x) {
    let fullNumber = ""

    //Get numbers behind
    if (x > 0) {
        for (let getX = x; getX >= 0; getX--) {
            let char = matrix[y][getX];
            if (!isNaN(char)) {
                fullNumber = char + fullNumber;
            } else break;
        }
    }

    let positionsAdvanced = 1;

    //Get numbers in front
    if (x < matrix[y].length - 1) {
        for (let getX = x + 1; getX <= matrix[y].length - 1; getX++) {
            let char = matrix[y][getX];
            if (!isNaN(char)) {
                fullNumber = fullNumber + char;
                positionsAdvanced++;
            } else {
                positionsAdvanced++;
                break;
            }
        }
    }

    fullNumber = parseInt(fullNumber)
    return {fullNumber, positionsAdvanced};
}
