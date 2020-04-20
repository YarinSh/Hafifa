/****************************
 * Filename: niceTypes.js
 * Purpose: Learning Javascript
 * Author: YS
 * Date: 5.4.2020
 ****************************/
const _ = require('lodash');

/* This includes all of niceTypes+nicerTypes+nicestTypes, because I started with something
 that nicest types includes. */

function validateArrayType(arr, type) {
    for (const element of arr) {
        validateTypes([element], [type]);
    }
    return true;
}

/**
 * Validates arguments' types according to the user's requested types
 * @param {Array} args - the function's arguments (use arguments here)
 * @param {Array} types - the user's requested types for validation, order is crucial, e.g Number, Function, etc.
 * use undefined to skip over an argument's validation, meaning it can receive any type as an argument.
 * use undefined to skip over an argument's validation, meaning it can receive any type as an argument.
 */
function validateTypes(args, types) {
    if (args.length !== types.length) {
        throw new Error(`You have not entered enough arguments, ${types.length} is expected`)
    }

    for (let i = 0; i < args.length; i++){
        if ((_.isArray(types[i]) && validateArrayType(args[i], types[i][0])) ||
            (types[i] === String && _.isString(args[i])) ||
            (types[i] === Number && _.isNumber(args[i])) ||
            (types[i] === Boolean && _.isBoolean(args[i])) ||
            (types[i] === Object && _.isObject(args[i])) ||
            (types[i] === Function && _.isFunction(args[i])) ||
            (types[i] === Array && _.isArray(args[i])) ||
            (types[i] === undefined)) {
            continue;
        }

        if (!(args[i] instanceof types[i])) {
            throw new Error(`The ${i+1} parameter is invalid, expected: ${types[i].name}`);
        }
    }
}



function doNothing(name, age, employed, obj, pir, any, func, arr, numarr) {
    validateTypes(arguments, [String, Number, Boolean, Object, Pirate, undefined, Function, Array, [Number]]);
}

class Pirate {

}

doNothing('Build', 45, false, {'type':12, 'book':11}, new Pirate(), 'random', (x => x), ['q',2], [1, 5, 'a', 6]);