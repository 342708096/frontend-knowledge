import { getType } from './getType.mjs'

function deepClone(ori) {
    const type = getType(ori);
    switch(type) {
        case 'array':
            return copyArray(ori);
        case 'object':
            return copyObject(ori);
        case 'function':
            return copyFunction(ori);
        default:
            return ori;
    }
}

function copyArray(arr) {
    let copy = [];
    for (const [index, value] of arr.entries()) {
        copy[index] = deepClone(value);
    }
    return copy;
}

function copyObject(obj) {
    let copy = {};
    for (const [index, value] of Object.entries(obj)) {
        copy[index] = deepClone(value);
    }
    return copy;
}

function copyFunction(func) {

    return func;
}


~function test() {
    console.log(deepClone({
        a: 1,
        b() {
            console.log('hello');
        },
        c: [3, 2, 1]}))
}()
