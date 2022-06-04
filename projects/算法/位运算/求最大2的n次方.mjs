function maxLog2n(m) {
    if (m < 1) {
        return null
    }
    // m & -m 返回最低位的1, 注意写括号
    if ((m & -m) === m) {
        return m
    }
    // 去掉低位的1
    const nextVal = m & (m-1)
    return maxLog2n(nextVal)
}

console.log(maxLog2n(17))