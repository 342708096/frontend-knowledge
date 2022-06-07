function useClickOutside(refObject, callback) {
    const handler = (e) => {
        if (refObject?.current?.contains(e.target)) {
            callback()
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])
}