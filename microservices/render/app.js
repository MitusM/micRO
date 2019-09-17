const MicroMQ = require('micromq')
// eslint-disable-next-line no-unused-vars
var fn = require('funclib')
const error = require('./error/index')
const render = require('./service/render')

const rabbitUrl = process.env.RABBIT_URL || 'amqp://localhost:5672'
/**
 * 
 */
const app = new MicroMQ({
  name: 'render',
  rabbit: {
    url: rabbitUrl 
  }
})
// === === === === === === === === === === === ===
// 1. Перехват и обработка ошибок
// === === === === === === === === === === === ===
error(app)

// === === === === === === === === === === === ===
// 2. Обрабатываем шаблон получив html
// === === === === === === === === === === === ===
app.action('html', async (meta, res) => {
  console.log(':::[ meta ]:::', meta)
   let page = new render(app, meta.dir)
  let html = await page.render(meta.page, meta.data)
  // TODO: Продумать название обьекта и в каком виде его отдовать
  res.json({html: html})
})

app.start()