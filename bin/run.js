'use strict';

const Mqtt = require("../lib/Mqtt");
/**
 *
 * @param server
 * @param {Object} options
 * @param {String} options.brokerUrl
 * @param {Object} options.opts
 * @param next
 */
 const hapiMqtt = async function (server, options) {
    try{
        await Mqtt.connect(server, options.brokerUrl, options.opts);
    }
    catch (e) {
        console.error(e);
        return e;
    }
};

exports.plugin = {
    name: "hapi-mqtt",
    version: "1.0",
    pkg: require('../package.json'),
    register: hapiMqtt
};
