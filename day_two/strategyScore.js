// input - matchup and mine's selections for rock paper scissors
// a, x = rock | b, y = paper | c, z = scissors
// rock > scissors; paper > rock; scissors > paper;
// rock = 1 point, paper = 2 points, scissors = 3 points
// loss = 0 points, draw = 3 points, win = 6 points
// figure out how many points you will have by following the strategy guide exactly
const fs = require('fs');

const allLines = fs.readFileSync('input.txt', 'utf-8');
const selectionPoints = {
    X: 1,
    Y: 2,
    Z: 3,
};
const selectionMap = {
    A: {
        X: 3,
        Y: 6,
        Z: 0,
    },
    B: {
        X: 0,
        Y: 3,
        Z: 6,
    },
    C: {
        X: 6,
        Y: 0,
        Z: 3,
    },
};
let totalScore = 0;
allLines.split(/\r?\n/).forEach((line) => {
    const selections = line.split(' ');
    const them = selections[0], me = selections[1];
    // adds points for my selection
    totalScore += selectionPoints[me];
    // adds points for the win/loss/draw
    totalScore += selectionMap[them][me];
});

////////////////////////////////////////////////////////////////////////////////
///// printing results to paste into answer on website                     /////
////////////////////////////////////////////////////////////////////////////////
console.log('totalScore', totalScore);
