1. content-box和border-box，为什么看起来content-box更合理，但还是经常使用border-box?

	* 	content-box是W3C的标准盒模型 元素宽度+padding+border
	* 	border-box 是ie的怪异盒模型，他的元素宽度等于内容宽度 内容宽度包含了padding和border
	* 	比如有时候在元素基础上添加内边距padding或border会将布局撑破 但是使用border-box就可以轻松完成

2. 实现三个DIV等分排在一行（考察border-box)
	* 设置border-box width 33.33%
	* flexbox flex:1	

3. 什么是BFC与IFC
	* BFC（Block Formatting Context）即“块级格式化上下文”， IFC（Inline Formatting Context）即行内格式化上下文。常规流（也称标准流、普通流）是一个文档在被显示时最常见的布局形态。一个框在常规流中必须属于一个格式化上下文，你可以把BFC想象成一个大箱子，箱子外边的元素将不与箱子内的元素产生作用。
	
	* BFC是W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。也可以说BFC就是一个作用范围。
	
	* 在普通流中的 Box(框) 属于一种 formatting context(格式化上下文) ，类型可以是 block ，或者是 inline ，但不能同时属于这两者。并且， Block boxes(块框) 在 block formatting context(块格式化上下文) 里格式化， Inline boxes(块内框) 则在 Inline Formatting Context(行内格式化上下文) 里格式化。

4. 怎么触发BFC?

	* 浮动元素：float 除 none 以外的值。
	* 绝对定位元素：position (absolute、fixed)。
	* display 为 inline-block、table-cells、flex。
	* overflow 除了 visible 以外的值 (hidden、auto、scroll)。

	
		