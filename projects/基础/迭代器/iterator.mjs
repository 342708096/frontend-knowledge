function getIterator(iterable) {
    return iterable[Symbol.iterator]()
}


const iterator = getIterator([1,2,3])
for (let i=iterator.next(); i.done === false; i=iterator.next()) {
    console.log(i.value)
}