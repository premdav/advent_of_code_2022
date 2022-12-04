// elves in pairs - each assigned a range of sections for cleaning camp -> 2-3, 5-8
// in how many assignment pairs does one range fully contain the other?
const fs = require('fs');
const lines = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);
let pairsWithContainment = 0;
for (line of lines) {
    const firstPair = line.split(',')[0].split('-'), secondPair = line.split(',')[1].split('-');
    // checking if first pair fully contains second
    if ((parseInt(firstPair[0], 10) >= parseInt(secondPair[0], 10)) && (parseInt(firstPair[1], 10) <= parseInt(secondPair[1], 10))) {
        pairsWithContainment += 1;
    } else if ((parseInt(secondPair[0], 10) >= parseInt(firstPair[0], 10)) && (parseInt(secondPair[1], 10) <= parseInt(firstPair[1], 10))) {
        pairsWithContainment += 1;
    }
}

////////////////////////////////////////////////////////////////////////////////
///// printing results to paste into answer on website                     /////
////////////////////////////////////////////////////////////////////////////////
console.log('assignment pairs with one range fully contained', pairsWithContainment);