'use strict'

// Инициализация датабазы!
const mongoose = require('mongoose')

// const { mongoose } = require('mongoose')
mongoose.Promise = require('bluebird')

// mongoose.Promise = global.Promise;

// require('./orientdbService')

// const OrientDB = require('orientjs').OrientDBClient

const OrientDBClient = require("orientjs").OrientDBClient;

module.exports = (uri) => {

  mongoose.connect(uri, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    poolSize: 10,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false)
  const db = mongoose.connection
  global.mongooseConnection = db

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    console.error('Failed to connect to DB on startup ', err)
  })

  mongoose.connection.on('connected', function () {
    console.info('Succesfully connected to MongoDB Database')
  })

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection to DB : disconnected')
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0)
    })
  })

  // global.OrientDBClient = server
  // // TODO: Вынести в конфиг
  // var server = new OrientDB({
  //   host:       'localhost',
  //   port:       2424,
  //   username:   'root',
  //   password:   '123'
  // })

  // server.then(client => {
  //   console.log('client');
  //   return client.close();
  // }).then(()=> {
  //    console.log("Client closed");
  // })

  var server = OrientDBClient.connect({
    host: "localhost",
    port: 2424,
    pool: {
      max: 10
    },
    username: 'root',
    password: '123'
  }).then(client => {
    // console.log(client);
    return client
    // .close();
  })
  // .then(() => {
  //    console.log("Client closed");
  // });
  global.OrientDBClient = server

  return mongoose
}