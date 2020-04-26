/****************************
 * Filename: asyncMeBack.js
 * Purpose: Learning Javascript
 * Author: YS
 ****************************/

async function getDivisionBy2(num) {
    console.log(`The number ${num} passed to getDivisionBy2`);
    if (num % 2 === 0) {
        return num / 2;
    } else {
        throw new Error('the number is not divisible by two');
    }
}

async function test() {
    try{
        const res = await getDivisionBy2(10);
        console.log(res);
        await getDivisionBy2(11);
    } catch (e) {
        console.error(e);
    }
}

getDivisionBy2(6).then(console.log).catch(console.error);
getDivisionBy2(7).then(console.log).catch(console.error);
test();