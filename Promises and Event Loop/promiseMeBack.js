/****************************
 * Filename: promiseMeBack.js
 * Purpose: Learning Javascript
 * Author: YS
 ****************************/

function getDivisionBy2(num) {
    return new Promise((resolve, reject) => {
        console.log(`The number ${num} passed to getDivisionBy2`);
        if (num % 2 === 0) {
            resolve(num / 2);
        } else {
            reject(`the number is not divisible by two`);
        }
    });
}

getDivisionBy2(6).then(console.log).catch(console.error);
getDivisionBy2(7).then(console.log).catch(console.error);