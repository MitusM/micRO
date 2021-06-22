// const OrientDB = require('orientjs').OrientDBClient

const OrientDBClient = require("orientjs").OrientDBClient;


module.exports = () => {
    var server = OrientDBClient.connect({
    host: "localhost",
    port: 2424,
    pool: {
      max: 10
    }
  }).then(client => {
    console.log(client);
    return client
    // .close();
  })
  .then(()=> {
    //  console.log("Client closed");
  });

// global.OrientDBClient = server
// // TODO: Вынести в конфиг
// var server = OrientDB({
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

return server
}