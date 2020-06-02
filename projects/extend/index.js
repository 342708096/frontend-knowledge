/**
 * 实现对构造函数Super的继承
 * @param params
 * @constructor
 */
function Super(...params) {
    // ...
}


function Sub(...params) {
    Super.apply(this, params);
}

Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
