/****************************
 * Filename: callMeBack.js
 * Purpose: Learning Javascript
 * Author: YS
 ****************************/

function getDivisionBy2(num, callback) {
    console.log(`The number ${num} passed to getDivisionBy2`);
    if (num % 2 === 0) {
        callback(num / 2);
    } else {
        throw new Error(`The number is not divisible by 2`);
    }
}