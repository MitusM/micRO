/*global _$*/

/** 
 * Зависимости: _$.extend
 */
const defSettings = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
}

let initArguments = (options) => {
  return typeof options === 'function' || options === undefined ? defSettings : _$.extend(defSettings, options)
  // {
    // options: 
    
  // }
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

export function ajax(url, options) {
  options = initArguments(options)
  console.log(':::[ options ]:::', options)
  return fetch(url, {
      method: options.method,
      headers: options.headers,
      body: JSON.stringify(options.body)
    })
    .then(status)
    .then(json)
    .then(data => {
      return data
    }).catch(function (error) {
      console.log('Request failed', error);
      _$.message('error', {
        title: 'Ошибка',
        message: error,
        position: 'topCenter'
      })
    })
}