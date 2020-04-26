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

//Parses the diary or if no diary creates it
function getDiary(err, data) {
    if (err) {
        // if the file does not exist, we will initialize a new diary
        if (err.code === NO_SUCH_FILE) {
            return [];
        } else {
            throw err;
        }
    } else {
        return JSON.parse(data.toString());
    }
}


fs.readFile(DIARY_FILE, (err, data) => {
    let diary = getDiary(err, data);
    readline.question(messages.NAME_REQUEST, function (name) {
        readline.question(messages.DAY_DESCRIPTION_REQUEST, function (text) {
            diary.push({name: name, text: text});
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