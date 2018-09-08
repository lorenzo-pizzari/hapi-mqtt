'use strict';
const Hapi = require('hapi');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;
const expect = require('code').expect;

describe('Hapi server', () => {

    let server;

    beforeEach((done) => {

        server = new Hapi.Server();
        done();
    });

    it('should register plugin with only Broker url', (done) => {

        server.register({
            register: require('../'),
            options: {
                brokerUrl: 'mqtt://srvmqttdev.cloudapp.net'
            }
        }, (err) => {

            expect(err).not.exist();
            done();
        });
    });
});
