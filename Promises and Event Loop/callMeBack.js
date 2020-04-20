/****************************
 * Filename: callMeBack.js
 * Purpose: Learning Javascript
 * Author: YS
 ****************************/

function getDivisionBy2(num, func) {
    console.log(`The number ${num} passed to getDivisionBy2`);
    if (num % 2 === 0){
        func(num/2);
    } else {
        throw new Error(`The number is not divisible by 2`);
    }
}