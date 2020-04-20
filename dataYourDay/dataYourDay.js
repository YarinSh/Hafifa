/****************************
 * Filename: showMyDay.js
 * Purpose: Learning Javascript
 * Author: YS
 * Date: 10.4.2020
 ****************************/

const fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.readFile('diary.json', (err, data) => {
    let diary;
    if (err) {
        // if the file does not exist, we will initialize a new diary
        if (err.code === 'ENOENT') {
            diary = {entries: []};
        } else throw err;
    } else diary = JSON.parse(data.toString());

    readline.question('What is your name?', function (name) {
        readline.question('How was your day?', function (text) {
            let entry = {
                name: name,
                text: text
            };
            diary.entries.push(entry);
            fs.writeFile('diary.json', JSON.stringify(diary, null, 2), err => {
                if (err) throw err;
                readline.close();
            });
        });
    });
});


readline.on('close', () => process.exit(0));