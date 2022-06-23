const arr = [1, 2, 3, 4, 5, 6]

Array.prototype.getReader = function() {
    let index = 0, that = this
    return {
        read(len = 1) {
            const result = that.slice(index, index + len)
            index += len
            console.log(result)
            return result
        }
    }
}

const reader = arr.getReader()

reader.read()
reader.read(1)
reader.read(2)
reader.read(2)
reader.read()