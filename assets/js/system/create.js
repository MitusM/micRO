export function create (tag, params, textHtml) {
  params = params || {}
  let elem = document.createElement(tag)
  for (var pr in params) {
    if (pr === 'class' || pr === 'className') {
      elem.className = params[pr]
    } else {
      elem.setAttribute(pr, params[pr])
    }
  }
  if (textHtml) {
    elem.innerHTML = textHtml
  }
  return elem
}