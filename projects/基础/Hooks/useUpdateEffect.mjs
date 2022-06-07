function useUpdateEffect(callback) {
    const ref = React.useRef(false)
    React.useEffect(() => {
        if (ref.current) {
            callback()
        } else {
            ref.current = true
        }
    })
}