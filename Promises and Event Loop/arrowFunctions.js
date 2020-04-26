/****************************
 * Filename: arrowFunctions.js
 * Purpose: Learning Javascript
 * Author: YS
 ****************************/
// Let's use generators for fun :)

// The Fibonacci generator
function* getFibGenerator(maxNumber) {
    let prev = 0;
    let curr = 1;
    while (curr < maxNumber) {
        let temp = prev;
        yield curr;
        prev = curr;
        curr = temp + curr;
    }
}

function printFibNums(maxNumber) {
    const fibGenerator = getFibGenerator(maxNumber);
    const interval = setInterval(() => {
        const nextValue = fibGenerator.next();
        if(!nextValue.done){
            console.log(nextValue.value);
        } else {
            clearInterval(interval);
        }
    }, 100);
}

function onlyEven(arrOfArrays) {
    return arrOfArrays.map(arr => arr.filter(elem => elem % 2 === 0));
}

printFibNums(10000);
console.log(onlyEven([[1, 2, 3], [4, 6, 9]]));
