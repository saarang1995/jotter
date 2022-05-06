# node-jotter

## Installation

Using npm:

```shell
$ npm i --save node-jotter
```

In Node.js:

Initialize the logger instance with LoggerConfiguration. This initializes instance of logger which prints logs in a file: local.log

```js
// Setup LoggerConfiguration
const loggerConfiguration: LoggerConfiguration = {
  filename: 'local.log',
  environment: Environment.development,
  serviceName: 'example',
  level: 'debug'
};
// Initialize the Logger with the configuration
const logger = new Logger(loggerConfiguration);
```

Printing Error messages

```js

logger.info(
    'HEllo this is a test', // Message
    { test: 'Hi' } // Meta data
);

logger.fatal(
  'Table not found', // Error message
  new Error(
      'Missing table User'
      ), // Error instance
  { source: 'database' } // Meta data
);


logger.error(
    'Low balance',  // Error message
    new Error(
        'Balance calculator crashed'
        ),     // Error instance
    { 
        source: 'Balance table',
        userName: 'ElA'
    }         // Meta data
);

```