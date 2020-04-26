function sum(x) {
    return function (y) {
        return x + y;
    };
}

/*We would like 0 to be printed last, so we will give it the biggest timeout
* And 3 needs to be first, so it needs to has the lowest timeout, dividing
* will get us this desired result. */
function count3To1() {
    for(let i = 0; i <= 3; i++) {
        setTimeout(() => console.log(i), 1000 / (i + 1));
    }
}

//Works exactly like sum so redundant
function createBase(num1) {
    return function (num2) {
        return num1 + num2;
    }
}

console.log(sum(1)(2));
console.log(sum(5)(-1));
count3To1();
const addSix = createBase(6);
console.log(addSix(10));
console.log(addSix(21));
