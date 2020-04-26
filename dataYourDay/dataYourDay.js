/****************************
 * Filename: showMyDay.js
 * Purpose: Learning Javascript
 * Author: YS
 * Date: 10.4.2020
 ****************************/

const fs = require('fs');

const NO_SUCH_FILE = 'ENOENT';
const DIARY_FILE = 'diary.json';
const messages = {
    NAME_REQUEST: 'What is your name?',
    DAY_DESCRIPTION_REQUEST: 'How was your day?'
};


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.readFile(DIARY_FILE, (err, data) => {
    let diary;
    if (err) {
        // if the file does not exist, we will initialize a new diary
        if (err.code === NO_SUCH_FILE) {
            diary = [];
        } else {
            throw err;
        }
    } else {
        diary = JSON.parse(data.toString());
    }

    readline.question(messages.NAME_REQUEST, function (name) {
        readline.question(messages.DAY_DESCRIPTION_REQUEST, function (text) {
            const entry = {
                name: name,
                text: text
            };
            diary.push(entry);
            fs.writeFile(DIARY_FILE, JSON.stringify(diary, null, 2), err => {
                if (err) {
                    readline.close();
                    throw err;
                }
                readline.close();
            });
        });
    });
});


readline.on('close', () => process.exit(0));