"use strict";

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

// const OrientDBClient = require("orientjs").OrientDBClient;
let ODatabase = require('orientjs').ODatabase;

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

  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);
  const db = mongoose.connection;
  global.mongooseConnection = db;

  // If the connection throws an error
  mongoose.connection.on("error", function (err) {
    console.error("Failed to connect to DB on startup ", err);
  });

  mongoose.connection.on("connected", function () {
    console.log('-----------------------------------------')
    console.info("Successfully connected to MongoDB Database");
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection to DB : disconnected");
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });

  const orientHost = "localhost";
  const orientPort = 2424;
  const orientUser = "root";
  const orientPassword = "23502350";
  const orientDbName = "frtsu";

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

  orientdb.open().then(function () {
    console.log('  <----------------------------------->')
    console.info('⚡ :upload - Successfully connected to OrientDB Database')
    console.log('  <----------------------------------->')

  })


  // var server = OrientDBClient.connect({
  //   host: "localhost",
  //   port: 2424,
  //   pool: {
  //     max: 10,
  //   },
  //   username: "root",
  //   password: "23502350",
  // }).then((client) => {
  //   console.log('  <----------------------------------->')
  //   console.log(':ninja:')
  //   console.info('⚡ Successfully connected to OrientDB Database')
  //   console.log('  <----------------------------------->')
  //   return client
  // }).catch(err => console.log('err::upload', err))
  // global.OrientDBClient = server;

  return mongoose;
};