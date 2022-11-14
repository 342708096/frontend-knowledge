class MyDiv extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    // shadow-dom内部是完全隔离的环境, 自己的css不会作用于外面
    this.shadowRoot.innerHTML = `
        <div style="width: 100px; height: 100px; background: green;">
          <slot></slot>
        </div>
    `
  }
}

class Counter extends HTMLElement {
  // 注册了监听的属性, 当属性改变时重新渲染
  static get observedAttributes() {
    return ['count']
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'count') {
      this.btn.textContent = newValue
    }
  }

  get count() {
    return this.getAttribute('count') ?? 0
  }
  set count(count) {
    this.setAttribute('count', count)
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = `
      <button>${this.count}</button>
    `
    this.btn = this.shadowRoot.querySelector('button')
    this.btn.addEventListener('click', () => {
      this.count++
    })
  }
}

// 必须小写,并且至少一个横线
customElements.define('my-div', MyDiv)
customElements.define('my-counter', Counter)
