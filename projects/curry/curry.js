

function curry(fn) {
    var expectLength = fn.length;
    return function _fn() {
        if (arguments.length < expectLength) {
            return _fn.bind(null, ...arguments);
        } else {
            return fn.apply(null, arguments)
        }
    }
}

function add(x, y) {
    console.log(x + y);
    return x + y
}

var _add = curry(add);

_add(1, 2);


_add(1)(2);
