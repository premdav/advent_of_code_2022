// input - matchup and mine's selections for rock paper scissors
// a = rock | b = paper | c = scissors
// X = need to lose, Y = need to draw, Z = need to win
// rock > scissors; paper > rock; scissors > paper;
// rock = 1 point, paper = 2 points, scissors = 3 points
// loss = 0 points, draw = 3 points, win = 6 points
// determine the shape you need to play and then
// figure out how many points you will have by following the strategy guide exactly
const fs = require('fs');

const allLines = fs.readFileSync('input.txt', 'utf-8');
const outcomePoints = {
    X: 0,
    Y: 3,
    Z: 6,
};

// selection map will determine the points of my selection needed to 
// make the correct outcome possible based on need to win, draw, or lose
const selectionMap = {
    A: {
        X: 3, // lose
        Y: 1, // draw
        Z: 2, // win
    },
    B: {
        X: 1,
        Y: 2,
        Z: 3,
    },
    C: {
        X: 2,
        Y: 3,
        Z: 1,
    },
};
let totalScore = 0;
allLines.split(/\r?\n/).forEach((line) => {
    const selections = line.split(' ');
    const them = selections[0], outcome = selections[1];
    // adds points for needed outcome
    totalScore += outcomePoints[outcome];
    // adds points for my selection
    totalScore += selectionMap[them][outcome];
});

////////////////////////////////////////////////////////////////////////////////
///// printing results to paste into answer on website                     /////
////////////////////////////////////////////////////////////////////////////////
console.log('totalScore', totalScore);
