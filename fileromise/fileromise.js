const fs = require('fs');

function wrapReadFile(fileName) {
    return new Promise(((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    }));
}

function wrapAppendFile(fileName, data) {
    return new Promise(((resolve, reject) => {
        fs.appendFile(fileName, data, (err) => {
            if (err){
                reject(err);
            } else {
                resolve();
            }
        })
    }));
}

async function wrapCopyFile(from) {
    return fs.readFile.__promisify__(from);
}