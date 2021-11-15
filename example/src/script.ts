import { Logger, LoggerConfiguration } from 'node-jotter';

const loggerConfiguration: LoggerConfiguration = {
  filename: 'local.log',
  serviceName: 'example',
  level: 'debug',
};
const logger = new Logger(loggerConfiguration);

logger.info('HEllo this is a test', { test: 'Hi' });
logger.fatal(
  'Table not found',
  new Error('Missing table User'),
  JSON.stringify({
    source: 'database',
  })
);
logger.error('Low User balance', new Error('Balance calculator crashed'), {
  source: 'Balance table',
  userName: 'ElA',
});
logger.debug('Debugging user data', {
  name: 'Saarang',
});
