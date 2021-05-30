"use strict";

// Инициализация базы!
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")

const process = require('process');

// const OrientDBClient = require("orientjs").OrientDBClient
let ODatabase = require('orientjs').ODatabase;

module.exports = (uri) => {

  // ------- Do the DB stuff -------

  const orientHost = "localhost";
  const orientPort = 2424;
  const orientUser = "root";
  const orientPassword = "23502350";
  const orientDbName = "frtsu";

  mongoose.connect(uri, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    poolSize: 10,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.set("useCreateIndex", true)
  mongoose.set("useFindAndModify", false)
  const db = mongoose.connection;
  global.mongooseConnection = db;

  // If the connection throws an error
  mongoose.connection.on("error", function (err) {
    console.error("Failed to connect to DB on startup ", err)
  });

  mongoose.connection.on("connected", function () {
    console.log('-----------------------------------------')
    console.info("Successfully connected to MongoDB Database")
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection to DB : disconnected")
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Buy: Mongoose default connection disconnected through app termination"
      )
      process.exit(0)
    })
  })

  const orientdb = new ODatabase({
    host: orientHost,
    port: orientPort,
    username: orientUser,
    password: orientPassword,
    name: orientDbName,
    useToken: true
    // pool: {
    // 	max: 10
    // }
  });

  // const client = new OrientDBClient({
  //   host: "localhost",
  //   port: 2424,
  //   pool: {
  //     max: 10
  //   }
  // });

  // client
  //   .connect()
  //   .then(() => {
  //     console.log('-----------------------------------------')
  //     console.log('=========== connect OrientDB ============')
  //     console.log('-----------------------------------------')
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })

  orientdb.open().then(function () {
    console.info('  <----------------------------------->')
    console.info('⚡ :article - Successfully connected to OrientDB Database')
    console.info('  <----------------------------------->')

  })


  // process.on('SIGINT', function () {
  //   orientdb.close().then(function () {
  //     console.info('⚡ :article - disconnect')
  //     process.exit(0)
  //   })
  // })
  // let proc = ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGKILL']

  // proc.forEach(signal => process.on(signal, () => {
  //   /** do your logic */
  //   console.info('⚡ :article - disconnect')
  //   process.exit(0);
  // }));

  // process.argv.forEach((val, index) => {
  //   console.log(`${index}: ${val}`);
  // });


  // process.on('warning', (warning) => {
  //   console.warn(warning.name); // Выводит на экран имя предупреждения
  //   console.warn(warning.message); // Выводит на экран сообщение предупреждения
  //   console.warn(warning.stack); // Выводит на экран стэк трассировки
  // });

  // process.on("exit", function () {
  //   console.log("never see this log message");
  // });


  return mongoose;
};