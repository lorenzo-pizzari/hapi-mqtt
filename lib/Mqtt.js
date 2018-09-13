'use strict';
const mqtt = require('mqtt');

module.exports = {
    /**
     * Connect to broker. You must wait for this before starting the plugin.
     * @returns {Promise}
     */
    async connect(server, url, options) {
        return new Promise((resolve, reject) => {
            const client = mqtt.connect(url, options);

            client.on('connect', async () => {
                this._mqtt = client;
                server.log(['hapi-Mqtt', 'info'], 'Client connected');
                server.expose('client', client);
                resolve(client);
            });

            client.on('error', (err) => {
                server.log(['hapi-Mqtt', 'info'], err.toString());
                reject(err)
            });

            client.on('offline', () => {
                server.log(['hapi-Mqtt', 'info'], 'Client offline');
            });

            client.on('close', () => {
                server.log(['hapi-Mqtt', 'info'], 'Client disconnected');
            });

            client.on('reconnect', () => {
                server.log(['hapi-Mqtt', 'info'], 'Started reconnection');
            });
        })
    },

    async publish(topic, message){
        await this._mqtt.publish(topic, message);
    },

    async subscribe(topic){
        await this._mqtt.subscribe(topic);
    },

    get client() {
        return this._mqtt;
    }
};