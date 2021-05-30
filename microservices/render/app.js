// const MicroMQ = require('micromq')
const MicroMQ = require('../../core/micromq/src/MicroService');
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
  let page = new render(app, meta.dir)
  let html = await page.render(meta.page, meta.data)
  console.log('html')

  // TODO: Продумать название объекта и в каком виде его отдавать
  res.json({
    html: html
  })
})

app.start()