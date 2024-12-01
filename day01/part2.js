const fs = require('node:fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt'),
    input = fs.readFileSync(filePath).toString();

let inputArray = input.split('\n');
let arrayLeft = [];
let similarityRight = {};

for (let i = 0; i < inputArray.length; i++) {
  let coordinates = inputArray[i].split('   ');

  arrayLeft.push(coordinates[0]);

  if (similarityRight[coordinates[1]]) similarityRight[coordinates[1]]++
  else similarityRight[coordinates[1]] = 1;
}

let similarity = 0;

for (let row = 0; row < arrayLeft.length; row++) {
  similarity += Math.abs(
    (
      arrayLeft[row] * (similarityRight[arrayLeft[row]] || 0)
    )
  );

  console.log("arrayLeft[row]: " + arrayLeft[row] );
  console.log("similarityRight: " + (similarityRight[arrayLeft[row]] || 0));
  console.log("added to similarity: " + (arrayLeft[row] * (similarityRight[arrayLeft[row]] || 0)));
  console.log("Updated similarity: " +  similarity);
}

console.log(similarity);