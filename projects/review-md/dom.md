```
export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

/**
 * 在target节点前插入el
 **/

export function before(el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * 在target节点后插入el
 **/

export function after(el, target) {
  if (target.nextSibling) {
    before(el, target.nextSibling)
  } else {
    target.parentNode.appendChild(el)
  }
}

/**
 * 将el插入到target最前面
 **/

export function prepend(el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

/**
 * 是否有className
 **/
export function hasClass(el, cls) {
  let reg = new RegExp('(^|\\s)' + cls + '(\\s|$)')

  return reg.test(el.className)
}

/**
 * 设置class, 会覆盖掉原有的
 **/
export function setClass (el, ...cls) {
  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
    el.className = cls.join(' ')
  } else {
    el.setAttribute('class', cls.join(' '))
  }
}
/**
 * 获取class
 **/
export function getClass(el) {
  return el.className.trim()
}
/**
 * 添加class
 **/
export function addClass(el, ...cls) {
  if (el.classList) {
    el.classList.add(...cls)
  } else {
    let cur = getClass(el).split(/\s+/g)

    cls.forEach((c) => {
      if (!(c in cur)) {
        cur.push(c)
      }
    })
    setClass(el, cur.join(' '))
  }
}
/**
 * 删除class
 **/
export function removeClass(el, ...cls) {
  if (el.classList) {
    el.classList.remove(...cls)
  } else {
    let cur = getClass(el).split(/\s+/g)

    cls.forEach((c) => {
      let index = cur.indexOf(c)

      if (index !== -1) {
        cur.splice(index, 1)
      }
    })
    setClass(el, cur.join(' '))
  }
  if (!el.className) {
    el.removeAttribute('class')
  }
}

/**
 * 绑定事件
 **/
export function addEvent(el, type, fn, capture) {
  el.addEventListener(type, fn, {passive: false, capture: !!capture})
}
/**
 * 删除事件
 **/
export function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, {passive: false, capture: !!capture})
}

export function onceEvent(el, type, fn, capture) {
  let that = this

  el.addEventListener(type, function event() {
    removeEvent(el, type, event, capture)
    fn.call(that)
  }, {passive: false, capture: !!capture})
}

```
