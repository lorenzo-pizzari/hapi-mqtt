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
 
 const server = new Hapi.Server();
 
 server.register({
     register: require('hapi-mqtt'),
     options: mqttOpts
 }, function (err) {
     if (err) {
         console.error(err);
         throw err;
     }
 
     server.route( {
         method: 'POST',
         path: '/say',
         handler(request, reply) {
             const mqttClient = server.plugins['hapi-mqtt'].client;
             mqttClient.publish('user/say','something',(err)=>{
                 if(err) 
                     return reply(Boom.internal('Internal MQTT error',err));
                 reply('something');
             })
         }
     });
 
     server.start(function() {
         console.log(`Server started at ${server.info.uri}`);
     });
 });

```
