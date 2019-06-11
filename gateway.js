const Gateway = require('micromq/gateway')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const session = require('./.services/session/index')
const mongoStore = require('connect-mongo')(session)

const rabbitUrl = process.env.RABBIT_URL || 'amqp://localhost:5672'

// создаем гейтвей
const app = new Gateway({
  microservices: ['auth'],
  rabbit: {
    // url: 'amqp://localhost:5672'
    // url: process.env.RABBIT_URL
    url: rabbitUrl
  }
})

// setup route middlewares
var csrfProtection = csrf({
  cookie: true
})

app.use(cookieParser())
app.use(session({
  secret: 'keyboardqcat',
  name: 'sid',
  resave: true,
  saveUninitialized: true,
  cookie: {
    "path": "/",
    "httpOnly": false,
    "secure": false,
    "maxAge": 36000000
  },
  store: new mongoStore({
    url: "mongodb://localhost:27017/micRO",
    collection: 'sessions' // TODO: Перенести в конфиг название коллекции для сессии
  })
})).use(csrf())

// NOTE: создаем эндпоинт на все методы
app.all(/^\/(auth)(\/.+$)?/, async (req, res) => {
  await res.delegate('auth');
})

// NOTE: создаем два эндпоинта /friends & /status на все методы
app.all(['/login', '/signup'], csrfProtection, async (req, res) => {
  // делегируем запрос в микросервис auth
  await res.delegate('auth');
})

// слушаем порт и принимаем запросы
app.listen(process.env.PORT || 7505);