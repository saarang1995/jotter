import winston, { Logger } from 'winston';
import { Environment } from '../enums/environment.enum';
import { NodeJotterConfiguration } from '../interfaces/node_jotter_config.interface';

export default class NodeJotter {
  loggingAgent: Logger;

  constructor(configuration: NodeJotterConfiguration) {
    const { filename, environment } = configuration;

    this.loggingAgent = winston.createLogger({
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
}
