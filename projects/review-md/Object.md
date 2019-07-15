1. Object.keys() 和 Object.getOwnPropertyNames() 异同

    * 都是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。
    * Object.keys方法只返回可枚举的属性，Object.getOwnPropertyNames方法还返回不可枚举的属性名。

2. Object 属性描述对象的结构

	```
	{
	  value: 123,
	  writable: false,
	  enumerable: true,
	  configurable: false,
	  get: undefined,
	  set: undefined
	}
	```    
	
3. new 命令的原理	

    使用new命令时，它后面的函数依次执行下面的步骤。
    
    * 创建一个空对象，作为将要返回的对象实例。
    * 将这个空对象的原型，指向构造函数的prototype属性。
    * 将这个空对象赋值给函数内部的this关键字。
    * 开始执行构造函数内部的代码。
    也就是说，构造函数内部，this指的是一个新生成的空对象，所有针对this的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即this对象），将其“构造”为需要的样子。
    
    如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。
    
    new命令简化的内部流程，可以用下面的代码表示。
    
    ```
    function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
      // 将 arguments 对象转为数组
      var args = [].slice.call(arguments);
      // 取出构造函数
      var constructor = args.shift();
      // 创建一个空对象，继承构造函数的 prototype 属性
      var context = Object.create(constructor.prototype);
      // 执行构造函数
      var result = constructor.apply(context, args);
      // 如果返回结果是对象，就直接返回，否则返回 context 对象
      return (typeof result === 'object' && result != null) ? result : context;
    }
    
    // 实例
    var actor = _new(Person, '张三', 28);
    ```
    
4. new.target 有什么作用?
    函数内部可以使用new.target属性。如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。
    ```
    function f() {
      console.log(new.target === f);
    }
    
    f() // false
    new f() // true
    ```   
5. Object.create() 有什么作用? 

   构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。我们希望以这个现有的对象作为模板，生成新的实例对象，这时就可以使用Object.create()方法。
   ```
   var person1 = {
     name: '张三',
     age: 38,
     greeting: function() {
       console.log('Hi! I\'m ' + this.name + '.');
     }
   };
   
   var person2 = Object.create(person1);
   
   person2.name // 张三
   person2.greeting() // Hi! I'm 张三.     
   ``` 
   
 6. 构造函数的继承
    让一个构造函数继承另一个构造函数，是非常常见的需求。这可以分成两步实现。第一步是在子类的构造函数中，调用父类的构造函数。
    
    ```
    function Sub(value) {
      Super.call(this);
      this.prop = value;
    }
    ```
    
    上面代码中，Sub是子类的构造函数，this是子类的实例。在实例上调用父类的构造函数Super，就会让子类实例具有父类实例的属性。
    
    第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型。
    
    ```
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.prototype.method = '...';  
    ```
    
 7. Object.create 的本质
 
    实际上，Object.create方法可以用下面的代码代替。
     ```
     if (typeof Object.create !== 'function') {
       Object.create = function (obj) {
         function F() {}
         F.prototype = obj;
         return new F();
       };
     }
     ```  
 8. 实现对象的拷贝
    
    ```
    function copyObject(orig) {
      var copy = Object.create(Object.getPrototypeOf(orig));
      copyOwnPropertiesFrom(copy, orig);
      return copy;
    }
    
    function copyOwnPropertiesFrom(target, source) {
      Object
        .getOwnPropertyNames(source)
        .forEach(function (propKey) {
          var desc = Object.getOwnPropertyDescriptor(source, propKey);
          Object.defineProperty(target, propKey, desc);
        });
      return target;
    }

    ```
    
    ES7 写法
    
    ```
    function copyObject(orig) {
      return Object.create(
        Object.getPrototypeOf(orig),
        Object.getOwnPropertyDescriptors(orig)
      );
    }
   
    ```
        