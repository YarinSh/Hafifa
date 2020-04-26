/****************************
 * Filename: bigDataYourDay.js
 * Purpose: Learning Javascript
 * Author: YS
 * Date: 10.4.2020
 ****************************/

const fs = require('fs');
const os = require('os');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


const NO_SUCH_FILE = 'ENOENT';
const DIARY_FILE = 'diary.json';
const C_PATH = 'C:\\';
const messages = {
    NAME_REQUEST: 'What is your name?',
    DAY_DESCRIPTION_REQUEST: 'How was your day?'
};

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

//Pushes an entry to the diary
function addDiaryEntry(name, text, paths, diary) {
    const entry = {
        name: name,
        text: text,
        date: new Date().toString(),
        os: os.type(),
        processorCores: os.cpus().length,
        pathsInC: paths
    };
    diary.push(entry);
}

//Handles the error
function handleError(err, readline){
    if(err) {
        readline.close();
        throw err;
    }
}

//Writes the diary to the JSON file
function writeDiaryToFile(diary) {
    fs.writeFile(DIARY_FILE, JSON.stringify(diary, null, 2), err => {
        handleError(err, readline);
        readline.close();
    });
}

fs.readFile(DIARY_FILE, (err, data) => {
    let diary = getDiary(err, data);
    readline.question(messages.NAME_REQUEST, function (name) {
        readline.question(messages.DAY_DESCRIPTION_REQUEST, function (text) {
            fs.readdir(C_PATH, function (err, paths) {
                handleError(err, readline);
                addDiaryEntry(name, text, paths, diary);
                writeDiaryToFile(diary);
            });
        });
    });
});


readline.on('close', () => process.exit(0));