// each rucksack has two compartments
// items of given type supposed to go into one of two compartments
// failed to follow for one item type per rucksack

// items identified by first letter - a and A refer to different types of items
// items in rucksack in single line - two compartments - first half of string vs second half
// Find the item type that appears in both compartments of each rucksack
// what is the sum of the priorities of those types?
const fs = require('fs');

const itemTypes = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let prioritySum = 0;
const allLines = fs.readFileSync('input.txt', 'utf-8');
allLines.split(/\r?\n/).forEach((line) => {
    const middle = Math.floor(line.length / 2);
    const firstCompartment = line.substring(0, middle);
    const secondCompartment = line.substring(middle);
    for (item of firstCompartment) {
        if (secondCompartment.includes(item)) {
            prioritySum += (itemTypes.indexOf(item) + 1);
            break;
        }
    }
});

////////////////////////////////////////////////////////////////////////////////
///// printing results to paste into answer on website                     /////
////////////////////////////////////////////////////////////////////////////////
console.log('sum of priorities', prioritySum);
