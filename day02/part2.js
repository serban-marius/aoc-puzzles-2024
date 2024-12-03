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
  let safeCounter = 0;
  let negative = 0;
  let positive = 0;
  let zero = 0;

  for (let j = 0; j < report.length; j++) {
    if (report[j] < -3 || report[j] > 3 || report[j] === 0){
      safeCounter++;
      if (report[j] === 0) {
        zero++;
      }
    }

    if (Math.sign(report[j]) === 1) {
      positive++;
    } else {
      negative++;
    }
  }

  if (zero === 1) negative--;

  if ((negative > positive)) {
    console.log(report + "-----> " + (1 >= (positive + safeCounter)) + '\n')
    console.log("-------- POSITIVE: " + positive + "-------- NEGATIVE: " + negative + "-------- safeCounter: " + safeCounter + "\n\n")
    return 1 >= (positive + safeCounter);
  } else if ((positive > negative)) {
    console.log(report + "-----> " + (1 >= (negative + safeCounter)) + '\n')
    console.log("-------- POSITIVE: " + positive + "-------- NEGATIVE: " + negative + "-------- safeCounter: " + safeCounter + "\n\n")
    return 1 >= (negative + safeCounter);
  } else {
    console.log(report + "-----> false" + '\n')
    console.log("-------- POSITIVE: " + positive + "-------- NEGATIVE: " + negative + "-------- safeCounter: " + safeCounter + "\n\n")
    return false;
  }
})

console.log(arrayDistances.length);

// arrayDistances = arrayDistances.filter((report) => {
//   let lastNumber = 0;
//
//   for (let j = 0; j < report.length; j++) {
//     if (lastNumber === report[j]) {
//       return false;
//     }
//     lastNumber = report[j];
//   }
//   return true;
// })
