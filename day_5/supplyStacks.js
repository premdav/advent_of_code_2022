// elves in pairs - each assigned a range of sections for cleaning camp -> 2-3, 5-8
// in how many assignment pairs have overlap?
const fs = require('fs');
const lines = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);

const totalStacks = Math.ceil(lines[0].length / 4, 10);
let stacks = new Array(totalStacks);
let result = '';

for (let i = 0; i < totalStacks; i += 1) {
    stacks[i] = [];
}

for (const line of lines) {
    if (line[1] === '1') break;
    for (let i = 0; i < totalStacks; i+=1) {
        let val = 4 * i + 1;
        if (line[val] === ' ') continue;
        stacks[i].push(line[val]);
    }
}
for (const line of lines) {
    if (line[0] === 'm') {
        const amountToMove = parseInt(line.split('move ')[1].split(' from')[0], 10);
        const moveFrom = parseInt(line.split('from ')[1].split(' to')[0], 10) - 1;
        const moveTo = parseInt(line.split('to ')[1], 10) - 1;
        const moveStack = [];
        for (let i = 0; i < amountToMove; i += 1) {
            const moveMe = stacks[moveFrom].shift();
            moveStack.unshift(moveMe);
        }
        stacks[moveTo].unshift(...moveStack.reverse());
    }
}

for (let i = 0; i < totalStacks; i += 1) result += stacks[i][0];
console.log(result);

////////////////////////////////////////////////////////////////////////////////
///// printing results to paste into answer on website                     /////
////////////////////////////////////////////////////////////////////////////////
console.log('final result:', result);
