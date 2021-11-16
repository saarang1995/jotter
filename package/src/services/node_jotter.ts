import winston, { Logger, format, level } from 'winston';
import { Environment } from '../enums/environment.enum';
import { LoggerConfiguration } from '../main';
const { combine, timestamp, json, errors } = format;

export class NodeJotter {
  private loggingAgent: Logger;

  constructor(configuration: LoggerConfiguration) {
    const { filename, serviceName, level, environment } = configuration;

    this.loggingAgent = winston.createLogger({
      defaultMeta: {
        serviceName,
        environment,
      },
      format: this.getFormat(),
      level,
      transports: [
        new winston.transports.File({ filename }), // Enable logging in a file
        new winston.transports.Console({}),
      ],
    });
  }

  private getFormat(): winston.Logform.Format {
    // const myFormat = printf(({ level, message, label, timestamp }) => {
    //   return `${timestamp} [${serviceName}] ${level}: ${message}`;
    // });
    const combinedFormat = combine(
      timestamp(), // timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      json(),
      format.metadata({
        fillExcept: ['message', 'level', 'timestamp', 'label'],
      })
      // myFormat
    );

    return combinedFormat;
  }
  /**
   * Application level logs of INFO level
   */
  info(message: string, ...meta: any[]): void {
    this.loggingAgent.info(message, meta);
  }

  /**
   * Logs of DEBUG Level
   * Should be used in development
   */
  debug(message: string, ...meta: any[]): void {
    this.loggingAgent.debug(message, meta);
  }

  /**
   * Server error logs which can cause crashing
   */
  fatal(message: string, error: Error, ...meta: any[]): void {
    meta.push(this.getCustomErrorObject(error));
    meta.push({ isFatal: true });
    this.loggingAgent.error(message, meta);
  }

  /**
   * Application error logs
   */
  error(message: string, error: Error, ...meta: any[]): void {
    meta.push(this.getCustomErrorObject(error));
    this.loggingAgent.error(message, meta);
  }

  private getCustomErrorObject(error: Error): Object {
    return { error: { message: error.message, stack: error.stack } };
  }
}

/**
 *  TODO:
 * Read this to solve logger.error not printing issue
 * https://github.com/winstonjs/winston/issues/1338
 *  */

new NodeJotter({
  filename: 'local.log',
  serviceName: 'example',
  level: 'debug',
  environment: Environment.development,
}).fatal('Low User balance', new Error('Balance calculator crashed'), {
  source: 'Balance table',
  userName: 'ElA',
});
