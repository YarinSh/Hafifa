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

// The function that will print everything using a simple await
async function printFibNums(maxNumber) {
    const fibGenerator = getFibGenerator(maxNumber);
    for (let num of fibGenerator) {
        // A promise that resolves after 100ms and we wait for it each time.
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log(num);
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

//We will ignore the promise
printFibNums(10000);
console.log(onlyEven([[1, 2, 3], [4, 6, 9]]));
