# Hapi-MQTT

A very simple module that allows the usage of a common MQTT Client in Hapi.js

Options is an object with the arguments passed to MQTT.js

- brokerUrl: MQTT connection string (eg. `mqtt://test.mosquitto.org`)
- opts: See [MQTT.js](https://github.com/mqttjs/MQTT.js) for full specs

The plugin expose:
 - `client`: The MQTT Client
 
Usage example:
 ```js
 const Hapi = require('hapi');
 const Boom = require('boom');
 
 const mqttOpts = {
     brokerUrl: 'mqtt://test.mosquitto.org',
     opts: {
         username: 'myHapiService',
         password: 'aVerySecurePassword'
     }
 };
 
 async function start() {

 const server = new Hapi.Server();
 
await server.register({
        plugin: require('hapi-mqtt'),
        options: mqttOpts
    });
 
     server.route( {
         method: 'POST',
         path: '/say',
         handler: async (request, h) => {
             const mqttClient = server.plugins['hapi-mqtt'].client;
             try{
                 await mqttClient.publish('user/say','something');
             }
             catch (err) {
                 return Boom.internal('Internal MQTT error',err);
             }
             return "something"
         }
     });
 
      // Start server
      try {
          await server.start();
      }
      catch (err) {
          console.log(err);
          process.exit(1);
      }
      
      console.log(`Server started at ${server.info.uri}`);
 }
      
 start().catch(function (err) {
     throw err;
 });
```
