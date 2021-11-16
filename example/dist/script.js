"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_jotter_1 = require("node-jotter");
var environment_enum_1 = require("node-jotter/lib/enums/environment.enum");
var loggerConfiguration = {
    filename: 'local.log',
    environment: environment_enum_1.Environment.development,
    serviceName: 'example',
    level: 'debug',
};
var logger = new node_jotter_1.Logger(loggerConfiguration);
logger.info('HEllo this is a test', { test: 'Hi' });
logger.fatal('Table not found', new Error('Missing table User'), JSON.stringify({
    source: 'database',
}));
logger.error('Low User balance', new Error('Balance calculator crashed'), {
    source: 'Balance table',
    userName: 'ElA',
});
logger.debug('Debugging user data', {
    name: 'Saarang',
});
