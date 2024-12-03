const fs = require('node:fs'),
  path = require('path'),
  filePath = path.join(__dirname, 'input.txt'),
  input = fs.readFileSync(filePath).toString();

const array = input.split('\n');


let arrayDistances = [];

for (let i = 0; i < array.length; i++) {
  let distance = []
  array[i].split(' ').sort((a, b) => {
    distance.push(a - b);
  });

  arrayDistances[i] = distance;
}

arrayDistances = arrayDistances.filter((report) => {
  console.log(report);
})