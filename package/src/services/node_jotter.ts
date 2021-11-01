import { Format } from 'logform';
import winston, { Logger } from 'winston';
import { Environment } from '../enums/environment.enum';
import { NodeJotterConfiguration } from '../interfaces/node_jotter_config.interface';

export default class NodeJotter {
  loggingAgent: Logger;

  constructor(configuration: NodeJotterConfiguration) {
    const { filename, environment, serviceName } = configuration;

    this.loggingAgent = winston.createLogger({
      defaultMeta: {
        serviceName,
      },
      format: new Format({}),
      transports: [new winston.transports.File({ filename })],
    });

    if (environment != Environment.PRODUCTION) {
      this.loggingAgent.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }
  }

  /**
   * Application level logs of INFO level
   */
  info() {}

  /**
   * Logs of DEBUG Level
   * Should be used in development
   */
  debug() {}

  /**
   * Server error logs which can cause crashing
   */
  fatal() {}

  /**
   * Application error logs
   */
  error() {}
}
