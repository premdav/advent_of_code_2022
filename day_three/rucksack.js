// each rucksack has two compartments
// items of given type supposed to go into one of two compartments
// failed to follow for one item type per rucksack

// items identified by first letter - a and A refer to different types of items
// items in rucksack in single line - two compartments - first half of string vs second half
// Find the item type that appears in both compartments of each rucksack
// what is the sum of the priorities of those types?

// groups of three elves
// every elf carries a badge that identifies group -> only item type carried by all three elves
// what is the sum of priorities of the corresponding badges for the three-elf groups?
const fs = require('fs');

const itemTypes = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let prioritySum = 0;
const lines = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);
for (let i = 0; i < lines.length; i += 3) {
    for (item of lines[i]) {
        if (lines[i+1].includes(item) && lines[i+2].includes(item)) {
            prioritySum += (itemTypes.indexOf(item) + 1);
            break;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
///// printing results to paste into answer on website                     /////
////////////////////////////////////////////////////////////////////////////////
console.log('sum of priorities', prioritySum);
