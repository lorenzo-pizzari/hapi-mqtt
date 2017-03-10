'use strict';
const Mqtt = require('mqtt');
/**
 *
 * @param server
 * @param {Object} options
 * @param {String} options.brokerUrl
 * @param {Object} options.opts
 * @param next
 */
exports.register = function (server, options, next) {

    const client = Mqtt.connect(options.brokerUrl, options.opts);
    client
        .on('connect', () => {

            server.log(['hapi-Mqtt', 'info'], 'Client connected');
            server.expose('client', client);
            next();
        })
        .on('reconnect', () => {

            server.log(['hapi-Mqtt', 'info'], 'Started reconnection');
        })
        .on('close', () => {

            server.log(['hapi-Mqtt', 'info'], 'Client disconnected');
        })
        .on('offline', () => {

            server.log(['hapi-Mqtt', 'info'], 'Client offline');
        })
        .on('error', (error) => {

            server.log(['hapi-Mqtt', 'info'], error.toString());
        });
};

exports.register.attributes = {
    pkg: require('../package.json')
};
