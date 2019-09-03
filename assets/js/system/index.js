
function data (e, attr, val) {
  let element = e.target || e
  let data = !attr ? element.dataset : (!val ? element.dataset[attr] : element.dataset[attr] = val)
  return data
}

export {data}