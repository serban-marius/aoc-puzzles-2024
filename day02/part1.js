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
  for (let j = 0; j < report.length; j++) {
    if (report[j] < -3 || report[j] > 3 || report[j] === 0){
      return false;
    }
  }
  return true;
})

arrayDistances = arrayDistances.filter((report) => {
  let negative = false;
  let positive = false;

  for (let j = 0; j < report.length; j++) {
    if (Math.sign(report[j]) === 1) {
      positive = true;
    } else {
      negative = true;
    }
  }

  return !(negative && positive);
})

console.log(arrayDistances.length);
