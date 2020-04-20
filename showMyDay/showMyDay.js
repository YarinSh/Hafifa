/****************************
 * Filename: showMyDay.js
 * Purpose: Learning Javascript
 * Author: YS
 * Date: 10.4.2020
 ****************************/

const fs = require('fs');
const chalk = require('chalk');
const os = require('os');


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


function addDiaryEntry() {
    readline.question('What is your name?', function (name) {
        readline.question('How was your day?', function (text) {
            fs.readdir('C:\\', function (err, paths) {
                if (err) throw err;
                let entry = {
                    name: name,
                    text: text,
                    date: new Date().toString(),
                    os: os.type(),
                    processorCores: os.cpus().length,
                    pathsInC: paths
                };
                diary.entries.push(entry);
                fs.writeFile('diary.json', JSON.stringify(diary, null, 2), err => {
                    if (err) throw err;
                    readline.close();
                });
            });
        });
    });
}

fs.readFile('diary.json', (err, data) => {
    let diary;
    if (err) {
        // if the file does not exist, we will initialize a new diary
        if (err.code === 'ENOENT') {
            diary = {entries: []};
        } else throw err;
    } else diary = JSON.parse(data.toString());

    //Display the entries
    for (let i = 0; i < diary.entries.length; i++) {
        console.log(chalk.red(`${i+1}. `) + chalk.green(diary.entries[i].date) + ' ' + chalk.bgGrey(` `) + ' ' + diary.entries[i].text.substr(0, 10) + '...');
    }

    readline.question('Choose question number, or type 0 to add a new entry', function (entry) {
        let entryNumber = Number(entry);
        if(entryNumber === 0){
            addDiaryEntry();
        } else {
            let selectedEntry = diary.entries[entryNumber-1];
            console.log(`Date: ${selectedEntry.date}`);
            console.log(`Answer: ${selectedEntry.text}`);
            console.log(`OS type: ${selectedEntry.os}`);
            console.log(`Number of cores: ${selectedEntry.processorCores}`);
            console.log(`Number of files and folders in C: ${selectedEntry.pathsInC.length}`)
            readline.close();
        }
    });
});


readline.on('close', () => process.exit(0));