const zepto = {}

/**
 * 构造函数
 */
 function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i< len; i++ ) {
         this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
}

/**
 * 工厂方法
 * @param dom
 * @param selector
 * @constructor
 */
zepto.Z = function(dom, selector) {
     return new Z(dom, selector)
}

zepto.init = function(selector) {
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))
    return zepto.Z(dom, selector)
}

var $ = function(selector) {
    return zepto.init(selector)
}

$.fn = {
    constructor: zepto.Z,
    css: function(key, value) {

    },
    html: function(key) {

    }
}

zepto.Z.prototype = Z.prototype = $.fn