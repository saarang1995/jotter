import winston, { Logger } from 'winston';

export default class Agent {
  loggingAgent: Logger;

  constructor() {
    this.loggingAgent = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'somefile.log' }),
      ],
    });
  }
}
