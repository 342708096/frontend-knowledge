/**
 * 

function howOld(name, tree) {

}

console.log(howOld('b', tree)) // 17
console.log(howOld('c', tree)) // -1
console.log(howOld('f', tree)) // null
 */

const tree = {
    name: 'a',
    age: 16,
    child: [{
      name: 'b',
      age: 17
    }, {
      name: 'c',
      age: -1,
      child: [{
        name: 'd',
        age: 18,
        child: [{ name: 'e', age: 19 }]
      }]
    }]
  }

function howOld(name, tree) {
    if (tree.name === name) {
        return tree.age
    }
    if (tree.child) {
        for (let i = 0; i<tree.child.length; i++) {
            const child = tree.child[i]
            const age = howOld(name, child)
            if (age !== null) {
                return age
            }
        }
    }
    return null
}

console.log(howOld('b', tree)) // 17
console.log(howOld('c', tree)) // -1
console.log(howOld('f', tree)) // null