function useDidUpdate(callback) {
    const ref = React.useRef(false)
    // DidUpdate 属于同步执行, 不能用useEffect模拟
    React.useLayoutEffect(() => {
        if (ref.current) {
            callback()
        } else {
            ref.current = true
        }
    })
}