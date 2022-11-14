function execScript(context, code){
  const fn = new Function('context', `
  with(context)
    ${code}
`)
  fn(context)
}

execScript(window, `window.document.documentElement.innerHTML='哈哈哈'`)
