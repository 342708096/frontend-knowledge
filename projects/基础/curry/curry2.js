function curry(fn) {
    var expectLength = fn.length;
    var params = [];
    return function _fn() {
        if (arguments.length + params.length < expectLength) {
            params.push(...arguments);
            return _fn
        } else {
            return fn.call(null, ...params, ...arguments);
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
