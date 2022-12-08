const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);

const dirStructure = {}; // this will contain everything that is within /
let directoryHistory = ['/'];
let totalSize = 0;

const getChildChildrenSize = (childDirectory, totSi, dirStruct) => {
    let ts = totSi;
    for (let i = 0; i < childDirectory.children.length; i += 1) {
        ts += childDirectory.children[i].childSize;
        if (dirStruct[childDirectory.children[i].childName].children.length) {
            console.log('child has more children, sending to next with ', childDirectory.children[i].childName, ts);
            ts += getChildChildrenSize(dirStruct[childDirectory.children[i].childName], ts, dirStruct);
        }
    }
    return ts;
}

// what is the sum of all the sizes of all directories with total size of at most 100000
let commandsRan = 0;
for (const line of input) {
    // commands
    if (line[0] === '$') {
        const command = line.split('$ ')[1];
        if (command === 'ls') continue;
        else {
            const destination = command.split('cd ')[1];
            if (destination === '..') {
                directoryHistory.push(dirStructure[directoryHistory.at(-1)].parent ? dirStructure[directoryHistory.at(-1)].parent : '/');
            } else {
                if (!dirStructure[destination]) {
                    dirStructure[destination] = { children: [] };
                    if (destination !== '/') {
                        dirStructure[destination].parent = directoryHistory.at(-1);
                    }
                }
                directoryHistory.push(destination);
            }
        }
    } else {
        // listing files
        if (line[0] === 'd') continue;
        else {
            const size = line.split(' ')[0], name = line.split(' ')[1];
            if(!dirStructure[directoryHistory.at(-1)].files) dirStructure[directoryHistory.at(-1)].files = [];
            dirStructure[directoryHistory.at(-1)].files.push({ name, size });
        }
    }
}
for (const [subDirName, subDirContent] of Object.entries(dirStructure)) {
    if (Array.isArray(subDirContent.files)) {
        let dirSize = 0;
        subDirContent.files.forEach((singleFile) => {
            dirSize += parseInt(singleFile.size, 10);
        });
        subDirContent.directorySize = dirSize;
        if (subDirName !== '/') dirStructure[subDirContent.parent].children.push({ childSize: subDirContent.directorySize, childName: subDirName });
    } else {
        subDirContent.directorySize = 0;
    }
}

for (const [dirName, dirContent] of Object.entries(dirStructure)) {
    // console.log(dirName, dirContent);
    let totalDirSize = dirContent.directorySize;
    dirContent.children.forEach((child) => {
        console.log('BEFORE', totalDirSize);
        if (dirStructure[child.childName].children.length) {
            console.log('child has child and would mess us up');
            const extraSize = getChildChildrenSize(dirStructure[child.childName], 0, dirStructure);
            totalDirSize += extraSize;
        }
        console.log('AFTER EXTRA', totalDirSize);
        totalDirSize += child.childSize;
        console.log('AFTER CHILD', totalDirSize);
    });
    if (totalDirSize <= 100000) totalSize += totalDirSize;
}

////////////////////////////////////////////////////////////////////////////////
///// printing results to paste into answer on website                     /////
////////////////////////////////////////////////////////////////////////////////
console.log('final', totalSize);
