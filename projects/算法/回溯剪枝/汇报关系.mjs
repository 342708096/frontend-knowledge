const m = [
    {mid: 1, children: [2, 3]},
    {mid: 2, children: [4, 5]},
    {mid: 3, children: [5, 6]},
    {mid: 4 },
    {mid: 5 },
    {mid: 6 },
]

function resolve(m) {
    const result = []
    for (let i=0; i<m.length; i++) {
        const current = m[i]
        process(current.mid, m, [current.mid], result)
    }
    return result
}

function process(mid, m, path, result) {
    const current = m.find(({mid: _mid}) => mid === _mid)
    if (!current.children && path.length > 1) {
        result.push(path.slice())
        return
    }
    if (current.children) {
        for (let i=0;i<current.children.length; i++) {
            path.push(current.children[i])
            process(current.children[i], m, path, result)
            path.pop()
        }
    }
}

console.log(resolve(m))