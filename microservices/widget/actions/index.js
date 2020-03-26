/* eslint-disable no-prototype-builtins */
const widgetList = require('../widgets/app')
const widgets = widgetList().getAllFiles().read()._read
// const modelService = require('../service/modelService')
// const widgetHome = require('../widgets/app')

async function widgetSelect() {
  'use strict'
  let arr = []
  for (const key in widgets) {
    if (widgets.hasOwnProperty(key)) {
      const item = widgets[key];
      let list = await new widgets[key].function().widget()
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
    // TODO: добавить использования redis
    let selectWidgets = widgetSelect()
    await res.end({
      widget: await selectWidgets
    })
  })

  app.action('home', async (meta, res) => {
    let html = await new widgetList().home(meta, async (unit) => {
      /** имя виджета используемого в блоке */
      let name = unit.name
      let {response} = await new widgets[name].function().html(unit, res)
      return response

    })
    await res.end({...html})
  })

}

