/* eslint-disable no-prototype-builtins */

const widgetList = require('../widgets/app')
const widgets = widgetList().getAllFiles().read()._read

async function widgetSelect() {
  'use strict'
  let arr = []
  for (const key in widgets) {
    if (widgets.hasOwnProperty(key)) {
      const item = widgets[key];
      let list = await new item.function().widget()
      console.log(':::[ list ]:::', list)
      arr.push({
        name: item.name,
        icon: item.config.icon,
       list
      })
    }
  }
  return arr
}

module.exports = (app) => {
  'use strict'
  /** Получаем все виджеты */
  app.action('list', async (meta, res) => {
    let selectWidgets = widgetSelect()
    await res.end({
      widget: await selectWidgets
    })
  })
}