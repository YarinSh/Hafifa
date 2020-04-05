/****************************
 * Filename: niceTypes.js
 * Purpose: Learning Javascript
 * Author: YS
 * Date: 5.4.2020
 ****************************/

function validateTypes(args, types) {
    if (args.length !== types.length) {
        throw new Error(`You have not entered enough arguments, ${types.length} is expected`)
    }
    for (let i = 0; i < args.length; i++){
        // Handeling primitve string
        if(types[i] === String){
            if(typeof(args[i]) === 'string') {
                continue;
            }
        }

        // Handeling primitve number
        if(types[i] === Number){
            if(typeof(args[i]) === 'number') {
                continue;
            }
        }

        // Handeling primitve boolean
        if(types[i] === Boolean){
            if(typeof(args[i]) === 'boolean') {
                continue;
            }
        }

        if (!(args[i] instanceof types[i])) {
            console.log(typeof(args[i]));
            console.log((args[i] instanceof types[i]));
            throw new Error(`The ${i+1} parameter is invalid, expected: ${types[i]}`);
        }
    }
}

function doNothing(name, age, employed) {
    validateTypes(arguments, [String, Number, Boolean]);
}

doNothing(12, 45, false);