/**
 * jquery 本身就是工厂方法
 * @param selector
 */
var jQuery = function(selector) {
    return new jQuery.fn.init(selector)
}

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    css: function(key, value) {

    },
    html: function(value) {

    }
}
/**
 * 构造函数
 * @type {jQuery.init}
 */
var init = jQuery.fn.init = function(selector) {
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) {
        this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
}

init.prototype = jQuery.fn

window.$ = jQuery


// 好处, 不暴露构造函数