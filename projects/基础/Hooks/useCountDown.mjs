function useInterval(
    fn,
    delay,
    immediate = true
  ) {
    const timerRef = useRef()
  
    timerRef.current = fn
  
    useEffect(() => {
      if (delay === undefined || delay === null || delay === 0) {
        return
      }
      if (immediate) {
        timerRef.current?.()
      }
      const timer = setInterval(() => {
        timerRef.current?.()
      }, delay)
      return () => {
        clearInterval(timer)
      }
    }, [delay])
  }



function useCountDown(ms) {
    const [count, setCount] = React.useState(ms)
    const [isRunning, setRunning] = React.useState(false)
    useInterval(() => {
        setCount((count) => count - 1)
    }, isRunning && count > 0 ? 1000 : null , true)

    const start = React.useCallback(() => {
        setRunning(true)
    }, [])
    const pause = React.useCallback(() => {
        setRunning(false)
    }, [])
    const restart = React.useCallback(() => {
        setCount(ms)
        setRunning(true)
    }, [ms])
    return {
        start,
        pause,
        restart,
        isRunning,
    }
}