"use strict"
// const MicroMQ = require("micromq")
const MicroMQ = require('../../core/micromq/src/MicroService');
const error = require("./service/error")
const middlewares = require('./service/middlewares/index')
const action = require('./action/')
const endpoints = require('./controllers/app')

const {
  dir
} = require('./service/viewsServices')
/** Config */
const config = require('./config/config.json')
require('./service/dbServices')(config.mongoose.uri)

// === === === === === === === === === === === ===
// 1. Connecting Gateway - Create Microservice
// === === === === === === === === === === === ===
const app = new MicroMQ({
  microservices: ['render', 'users', 'auth', 'widget', 'home', 'files'],
  name: "article",
  rabbit: {
    url: process.env.RABBIT_URL || config.rabbit.url
  },
  config: config,
  dirTemplate: dir(),
  adminTemplate: dir(config.adminTemplate)
})

// === === === === === === === === === === === ===
// 2. Interception and error handling
// === === === === === === === === === === === ===
error(app)

// === === === === === === === === === === === ===
// 3. middleware - setup route middlewares
// === === === === === === === === === === === ===
middlewares(app)

// === === === === === === === === === === === ===
// 4. Create an action notify that other microservices can cause
// === === === === === === === === === === === ===
action(app)

// === === === === === === === === === === === ===
// 5. URL (interfaces)
// === === === === === === === === === === === ===
endpoints(app)

// === === === === === === === === === === === ===
// 6. Run Microservice
// === === === === === === === === === === === ===
app.start()