1. vue生命周期钩子有哪些?

    * beforeCreate
    * created
    * beforeMount
    * mounted
    * beforeUpdate
    * updated
    * activated
    * deactivated
    * beforeDestroy
    * destroyed
    * errorCaptured (2.5.0 + 新增)

2. 模板的本质是什么?

 	* 字符串
 	* 最终转换成js代码, 只有js是图灵完备的可以处理逻辑
 	* 最终转换为render函数, with语法, 类似snabbdom里面h函数的样子
 	* render函数执行返回vnode
 	* 对比,执行patch, 见updateComponent方法
 	
3. vue的整个实现流程
	* 解析模板成render函数
	* 响应式开始监听
		* Object.defineProperty
		* 将data的属性代理到vm上
	* 首次渲染, 显示页面, 且绑定依赖

	   * 初次渲染, 执行updateComponent, 执行 vm._render()
	   * 执行render函数, 会访问到vm.list 和 vm.title
	   * 会被响应式的get方法监听到
	   * 执行updateComponent, 会走到vdom 的patch方法
	   * patch 将vnode渲染成DOM, 初次渲染完成
	   * 未走get中的属性, set的时候我们无需关心
	   * 避免不必要的重复渲染
	* data属性变化, 触发rerender


4. vue三要素

	1. 模板解析
	2. 响应式
	3. 渲染 	

	
5. 使用jquery 和使用框架的区别

	* 数据和视图的分离, 解耦
	* 以数据驱动视图, 只关心数据的变化, DOM操作被封装

6. 什么是MVVM? 

	* MVVM- model view viewModel
	* 三者之间的关系, 以及如何对应到各段代码
	* ViewModel的理解, 联系View 和 Model

7. vue如何实现响应式

	* 关键是理解Object.defineProperty
	* 将data的属性代理到VM上

8. vue如何解析模板?

	* 模板就是一段字符串，非结构化的数据，没法分析。因此，第一步是将非结构化的模板字符串，转变成结构化的 JS 对象，抽象语法树，即 AST 。其实就是一个 JS 对象，这样就结构化了。
   * 第二步，将 AST 转换成一个 render 函数，步骤是先转换为一段函数体的字符串，然后再用new Function(...)生成函数。
   * 第三部，渲染时执行 render 函数，返回虚拟 DOM 对象，然后执行虚拟 DOM 的patch方法，渲染成真正的 html 。

9. React 的 setState 为何是异步渲染？

	这个问题其实很简单，只是很多同学没有考虑到。答案就是：为了防止一次性执行多次setState而带来的渲染性能问题。即，你如果连续不断执行 100 次setState的话，那么 React 是否有必要渲染 100 次？—— 肯定没必要。第一，浏览器会卡死；第二，用户只需要看到最后的结果即可，不用关心前 99 次的过程。

10. hybrid 和 h5 有何区别？

 * hybrid 是通过file协议加载的本地文件，h5 是通过http协议加载的网络文件，前者速度快。
 * hybrid 是通过为不同版本打包进行更新，而 h5 没有版本的概念，每次都获取服务端的最新版。
 * hybrid 更加依赖于客户端的能力，因此会更多的和客户端通讯，而 h5 基本用不到和客户端通讯。
		
		
11. 目前js对于异步的解决方案有哪些?

	* 	deferred （jQuery 或者 zepto 中）—— 注意，这块很多同学不知道，可以多去查查相关资料，因为 jQuery 和 zepto 目前还有很多、很多、很多项目在用！！！
	* Promise（ES6 或者第三方库，如 q.js bluebird.js），不仅要知道怎么用，还要熟悉 Promise 的标准
	* Generator（从 koa 升级 2.x 之后已经不再常用）
	* async/await （ES7 草案）

	