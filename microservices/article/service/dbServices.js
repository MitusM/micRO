"use strict";

// Инициализация датабазы!
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")

const OrientDBClient = require("orientjs").OrientDBClient

module.exports = (uri) => {
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
    console.info("Succesfully connected to MongoDB Database")
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection to DB : disconnected")
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection disconnected through app termination"
      )
      process.exit(0)
    })
  })

  const client = new OrientDBClient({
    host: "localhost",
    pool: {
      max: 10
    }
  });

  client
    .connect()
    .then(() => {
      console.log('-----------------------------------------')
      console.log('=========== connect OrientDB ============')
      console.log('-----------------------------------------')
    })
    .catch(err => {
      console.log(err);
    })

  return mongoose;
};