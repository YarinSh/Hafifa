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

const NO_SUCH_FILE = 'ENOENT';
const DIARY_FILE = 'diary.json';
const C_PATH = 'C:\\';
const messages = {
    NAME_REQUEST: 'What is your name?',
    DAY_DESCRIPTION_REQUEST: 'How was your day?',
    CHOICE_REQUEST: 'Choose entry number, or type 0 to add a new entry'
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


function promptDiaryEntryAddition(diary) {
    readline.question(messages.NAME_REQUEST, function (name) {
        readline.question(messages.DAY_DESCRIPTION_REQUEST, function (text) {
            fs.readdir(C_PATH, function (err, paths) {
                handleError(err, readline);
                addDiaryEntry(name, text, paths, diary);
                writeDiaryToFile(diary);
            });
        });
    });
}

function displayDiary(diary) {
    for (let i = 0; i < diary.length; i++) {
        console.log(chalk.red(`${i+1}. `) + chalk.green(diary[i].date) + ' ' + chalk.bgGrey(` `) + ' ' + diary[i].text.substr(0, 10) + '...');
    }
}

function promptChoice(diary){
    readline.question(messages.CHOICE_REQUEST, function (entry) {
        let entryNumber = Number(entry);
        if(entryNumber === 0){
            promptDiaryEntryAddition(diary);
        } else {
            let selectedEntry = diary[entryNumber-1];
            console.log(`Date: ${selectedEntry.date}`);
            console.log(`Answer: ${selectedEntry.text}`);
            console.log(`OS type: ${selectedEntry.os}`);
            console.log(`Number of cores: ${selectedEntry.processorCores}`);
            console.log(`Number of files and folders in C: ${selectedEntry.pathsInC.length}`)
            readline.close();
        }
    });
}

fs.readFile(DIARY_FILE, (err, data) => {
    let diary = getDiary(err, data);
    displayDiary(diary);
    promptChoice(diary);
});


readline.on('close', () => process.exit(0));