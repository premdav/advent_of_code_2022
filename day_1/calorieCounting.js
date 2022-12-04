// input - number of calories each elf is carrying
// each elf's calorie count separated by a line break / blank line
// find the elf with the highest calories - how many does the elf have?
const fs = require('fs');

const allLines = fs.readFileSync('input.txt', 'utf-8');
let highest = 0, current = 0;
const topThree = [];
allLines.split(/\r?\n/).forEach((line) => {
    if (isNaN(parseInt(line, 10))) {
        topThree.push(current);
        if (current > highest) highest = current;
        current = 0;
        // sort and only get top 3
        topThree.sort((a, b) => b - a);
        if (topThree.length > 3) topThree.pop();
    } else current += parseInt(line, 10);
});

////////////////////////////////////////////////////////////////////////////////
///// printing results to paste into answer on website                     /////
////////////////////////////////////////////////////////////////////////////////
console.log('we done');
console.log('highest cal count', highest);
console.log('top 3 - combined', topThree.reduce((acc, val) => acc + val));
