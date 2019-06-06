const Gateway = require('micromq/gateway')
const port = process.env.PORT || 7505
console.log(port);
// console.log(process) 
console.log(process.env.RABBIT_URL) 
console.log(process.env.PORT) 


// // создаем гейтвей
// const app = new Gateway({
//   microservices: ['market'],
//   rabbit: {
//     url: process.env.RABBIT_URL,
//   },
// })

// // создаем эндпоинт и делегируем его в микросервис market
// gateway.post('/market/buy/:id', (req, res) => res.delegate('market'))

// // слушаем порт и принимаем запросы
// gateway.listen(port)


const app = new Gateway({
  microservices: ['auth'],
  rabbit: {
    // url: 'amqp://localhost:5672'
    // url: process.env.RABBIT_URL
    url: 'amqp://localhost'
  }
})

// // NOTE: создаем эндпоинт на все методы
// app.all(/^\/(auth)(\/.+$)?/, async (req, res) => {
//   await res.delegate('auth');
// })

// NOTE: создаем два эндпоинта /friends & /status на все методы
app.all(['/login', '/signup'], async (req, res) => {
  // делегируем запрос в микросервис auth
  await res.delegate('auth');
})

// app.enablePrometheus({
//   user: 'guest',
//   password: 'guest',
// })

// // app.all(/^\/(domains)(\/.+$)?/, async (req, res) => {
// //   await res.delegate('domains');
// // });

app.listen(process.env.PORT || 7505);