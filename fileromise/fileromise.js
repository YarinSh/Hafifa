const fs = require('fs');

function wrapReadFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

function wrapAppendFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(fileName, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
}

function wrapCopyFile(source, dest) {
    return new Promise((resolve, reject) => {
        fs.copyFile(source, dest, err => {
           if (err) {
               reject(err);
           } else {
               resolve();
           }
        });
    });
}

function wrapReadDir(dir) {
    return new Promise((resolve, reject) => {
       fs.readdir(dir, (err, files) => {
           if (err) {
               reject(err);
           } else {
               resolve(files);
           }
       });
    });
}