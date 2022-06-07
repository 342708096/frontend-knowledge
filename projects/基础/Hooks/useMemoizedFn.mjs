function useMemoizedFn(fn) {  
    const fnRef = useRef(fn);
  
    // why not write `fnRef.current = fn`?
    // https://github.com/alibaba/hooks/issues/728
    fnRef.current = useMemo(() => fn, [fn]);
  
    const memoizedFn = useRef();
    if (!memoizedFn.current) {
      memoizedFn.current = function (this, ...args) {
        return fnRef.current.apply(this, args);
      };
    }
  
    return memoizedFn.current;
  }
  