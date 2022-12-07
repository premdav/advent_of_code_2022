const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/)[0];

const dataStream = [];
let packetMarker = 0;

for (let i = 0; i < input.length; i += 1) {
    if (dataStream.length === 14) {
        const dataSet = new Set(dataStream);
        if (dataSet.size === 14) {
            packetMarker = i;
            break;
        }
        dataStream.shift();
    }
    dataStream.push(input[i]);
}

////////////////////////////////////////////////////////////////////////////////
///// printing results to paste into answer on website                     /////
////////////////////////////////////////////////////////////////////////////////
console.log('packet marker:', packetMarker);
