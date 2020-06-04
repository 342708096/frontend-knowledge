
const Vue = (function() {
    function noop () {}
    let uid = 0;
    // 用于储存订阅者并发布消息, 依赖收集器
    class Dep {
        constructor() {
            // 设置id,用于区分新Watcher和只改变属性值后新产生的Watcher
            this.id = uid++;
            // 储存订阅者的数组
            this.subs = [];
        }
        // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
        depend() {
            Dep.target.addDep(this);
        }
        // 添加订阅者
        addSub(sub) {
            this.subs.push(sub);
        }
        notify() {
            // 将subs做浅拷贝, 防止意外
            const subs = this.subs.slice();
            // 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理, 注意该写法比较优化
            for (let i = 0, l = subs.length; i < l; i++) {
                subs[i].update()
            }
        }
    }
    // 为Dep类设置一个静态属性,默认为null,工作时指向当前的Watcher
    Dep.target = null;

    const targetStack = []

    function pushTarget (target) {
        targetStack.push(target)
        Dep.target = target
    }

    function popTarget () {
        targetStack.pop()
        Dep.target = targetStack[targetStack.length - 1]
    }

    // 监听者,监听对象属性值的变化
    class Observer {
        constructor(value) {
            this.value = value;
            this.vmCount = 0
            this.dep = new Dep()
            def(value, '__ob__', this) // 将Observer实例挂载到__ob__属性上
            this.walk(value); // 遍历子节点
        }
        // 遍历属性值并监听, 暂时先不考虑array的情况
        walk (obj) {
            const keys = Object.keys(obj);
            for (let i = 0, l = keys.length; i < l; i++) {
                defineReactive(obj, keys[i]);
            }
        }
    }
    function def (obj, key, val, enumerable) {
        Object.defineProperty(obj, key, {
            value: val,
            enumerable: !!enumerable,
            writable: true,
            configurable: true
        })
    }
    // 每有一个属性, 则生成一个依赖收集器
    function defineReactive(obj, key, val) {
        const dep = new Dep();

        const property = Object.getOwnPropertyDescriptor(obj, key);
        if (property && property.configurable === false) {
            return
        }

        // cater for pre-defined getter/setters
        const getter = property && property.get;
        const setter = property && property.set;
        if ((!getter || setter) && arguments.length === 2) {
            val = obj[key]
        }

        let childOb = observe(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
                const value = getter ? getter.call(obj) : val
                if (Dep.target) {
                    dep.depend()
                    if (childOb) {
                        childOb.dep.depend()
                    }
                }
                return value
            },
            set: function reactiveSetter(newVal) {
                const value = getter ? getter.call(obj) : val
                /* eslint-disable no-self-compare */
                if (newVal === value || (newVal !== newVal && value !== value)) {
                    return
                }
                // #7981: for accessor properties without setter
                if (getter && !setter) return;
                if (setter) {
                    setter.call(obj, newVal)
                } else {
                    val = newVal
                }
                childOb = observe(newVal);
                dep.notify()
            }
        })
    }
    // 简化版parsePath, 不考虑中文啥的乱七八糟的情况
     function parsePath (path) {
        const segments = path.split('.');
        return function (obj) {
            for (let i = 0, l = segments.length; i < l; i++) {
                if (!obj) return
                obj = obj[segments[i]]
            }
            return obj
        }
    }
    // 简化版的observe
    function observe(value, asRootData) {
        // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
        if (!value || typeof value !== 'object') {
            return;
        }
        let ob;
        ob = new Observer(value);
        if (asRootData ) {
            ob.vmCount ++
        }
        return ob
    }
    function initData (vm) {
        let data = vm.$options.data
        // proxy data on instance
        const keys = Object.keys(data)
        let i = keys.length
        while (i--) {
            const key = keys[i]
            proxy(vm, `_data`, key)
        }
        // observe data
        observe(data, true /* asRootData */)
    }

    function proxy (target, sourceKey, key) {
        const sharedPropertyDefinition = {
            enumerable: true,
            configurable: true,
            get() {
                return this[sourceKey][key]
            },
            set(val) {
                this[sourceKey][key] = val
            }
        }
        Object.defineProperty(target, key, sharedPropertyDefinition)
    }
    // 1. 初始化computed
    function initComputed (vm, computed) {
        const watchers = vm._computedWatchers = Object.create(null); // 创建computed watcher map
        for (const key in computed) {
            const userDef = computed[key]
            const getter = typeof userDef === 'function' ? userDef : userDef.get

            // 拿到getter后, 创建Watcher并存入map中, 方便以后调用
            watchers[key] = new Watcher(vm, getter || noop, noop, { lazy: true })


            // component-defined computed properties are already defined on the
            // component prototype. We only need to define computed properties defined
            // at instantiation here.
            // 如果 computed key还没有绑定到vm中, 我们就定义Computed
            if (!(key in vm)) {
                defineComputed(vm, key, userDef)
            }
        }
    }
    // 2. 定义计算属性, vm key  和 callback, 这个callback用来计算自身value用的
    function defineComputed (target, key, userDef) {
        let properties = {
            enumerable: true,
            configurable: true,
            set: noop
        };
        // 仅考虑function情况
        if (typeof userDef === 'function') {
            properties.get = createComputedGetter(key);
        }
        Object.defineProperty(target, key, properties)
    }
    // 3. 重新创建 vm[key] 的 getter
    function createComputedGetter (key) {
        return function computedGetter () {
            // 拿到watcher, 根据key 从 computedWatcherMap中
            const watcher = this._computedWatchers && this._computedWatchers[key]
            if (watcher) {
                // 如果是脏的就进行value的计算, 会捎带手进行依赖收集, 把watcher自身收集到依赖的dep中
                if (watcher.dirty) {
                    watcher.evaluate()
                }
                // 这时候再看是谁依赖了此computed, 把观察者放入computed的dep
                debugger
                if (Dep.target) {
                    watcher.depend()
                }
                return watcher.value
            }
        }
    }

    class Watcher {
        constructor(vm, expOrFn, cb, config = {lazy: false}) {
            this.deps = [];
            this.depIds = {}; // hash储存订阅者的id,避免重复的订阅者
            this.vm = vm; // 被订阅的数据一定来自于当前Vue实例
            this.cb = cb; // 当数据更新时想要做的事情

            if (typeof expOrFn === 'function') {
                this.getter = expOrFn
            } else {
                this.getter = parsePath(expOrFn);
            }

            this.lazy = config.lazy;
            this.dirty = this.lazy;

            this.value = this.lazy ? undefined : this.get(); // 维护更新之前的数据, 首次创建时先来一波依赖收集
        }
        // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
        update() {
            if (this.lazy) {
                this.dirty = true;
            } else {
                this.run();
            }

        }
        // 此方法是给收集器用的回调, 非内部主动调用
        addDep(dep) {
            // 如果在depIds的hash中没有当前的id,可以判断是新Watcher,因此可以添加到dep的数组中储存
            // 此判断是避免同id的Watcher被多次储存
            // watcher里面同时维护依赖收集器的集合, 用来判断是否需要加入依赖收集器
            if (!this.depIds.hasOwnProperty(dep.id)) {
                dep.addSub(this);
                this.depIds[dep.id] = dep;
                this.deps.push(dep)
            }
        }
        run() {
            const value = this.get();
            const oldVal = this.value;
            if (value !== oldVal) {
                this.value = value;
                this.cb.call(this.vm, value, oldVal);
            }
        }
        evaluate() {  // 强制获取最新的值, 不会触发callback, 并把dirty设置为false
            this.value = this.get();
            this.dirty = false;
        }
        get() {
            pushTarget(this); // 推入依赖收集队列
            let value;
            const vm = this.vm;
            try {
                value = this.getter.call(vm, vm); // 调用getter进行依赖收集
            } finally {
                popTarget(); // 推出依赖收集队列
            }
            return value;
        }
        depend () { // 通知所有相关的依赖收集器dep进行依赖收集
            debugger
            let i = this.deps.length
            while (i--) {
                this.deps[i].depend()
            }
        }
        // cleanupDeps () {
        //     let i = this.deps.length
        //     while (i--) {
        //         const dep = this.deps[i]
        //         if (!this.newDepIds.has(dep.id)) {
        //             dep.removeSub(this)
        //         }
        //     }
        //     let tmp = this.depIds
        //     this.depIds = this.newDepIds
        //     this.newDepIds = tmp
        //     this.newDepIds.clear()
        //     tmp = this.deps
        //     this.deps = this.newDeps
        //     this.newDeps = tmp
        //     this.newDeps.length = 0
        // }
    }

    class Vue {
        constructor(options = {}) {
            // 简化了$options的处理
            const opts = this.$options = options;
            // 简化了对data的处理
            let data = (this._data = this.$options.data);

            if (options.data) {
                initData(this)
            } else {
                observe(this._data = {}, true)
            }

            if (options.computed) initComputed(this, options.computed);
            // 监听数据
        }
        // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
        $watch(expOrFn, cb) {
            new Watcher(this, expOrFn, cb);
        }
    }

    return Vue;
})();

let demo = new Vue({
    data: {
        text: '',
    },
    computed: {
        test() {
            return this.text + 'computed'
        }
    }
});

const p = document.getElementById('p');
const div = document.getElementById('div');
const input = document.getElementById('input');

input.addEventListener('keyup', function(e) {
    demo.text = e.target.value;
});

demo.$watch('text', str => p.innerHTML = str);
demo.$watch('test', str => div.innerHTML = str);
