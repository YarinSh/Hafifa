/****************************
 * Filename: nameTag.js
 * Purpose: Learning Javascript
 * Author: YS
 * Date: 5.4.2020
 ****************************/

class Tag {
    getClassName() {
       return this.constructor.name;
    }
}

const tag = new Tag();
console.log(tag.getClassName());
