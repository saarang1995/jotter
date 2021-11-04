import winston, { Logger, format } from 'winston';
const { combine, timestamp, label, printf, prettyPrint, json, errors } = format;

// import { Environment } from '../enums/environment.enum';
// import { NodeJotterConfiguration } from '../interfaces/node_jotter_config.interface';

export enum Environment {
  'PRODUCTION',
  'DEVELOPMENT',
}

export interface NodeJotterConfiguration {
  filename: string;
  environment: Environment;
  serviceName: string;
}

/**
 * todo
 * refer stackoverflow link for example configuration for winston
 * https://stackoverflow.com/questions/56090851/winston-logging-object
 *
 */
export class NodeJotter {
  private loggingAgent: Logger;

  constructor(configuration: NodeJotterConfiguration) {
    const { filename, environment, serviceName } = configuration;

    this.loggingAgent = winston.createLogger({
      defaultMeta: {
        serviceName,
      },
      format: this.getFormat(), // this.getFormat(serviceName),

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
      json()
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
    this.loggingAgent.info(message, meta);
  }

  /**
   * Server error logs which can cause crashing
   */
  fatal(message: string, error: Error, ...meta: any[]): void {
    this.loggingAgent.error(message, error, meta, {
      isFatal: true,
    });
  }

  /**
   * Application error logs
   */
  error(message: string, error: Error, ...meta: any[]): void {
    this.loggingAgent.error(message, error, meta);
  }
}

const nodeJotter = new NodeJotter({
  filename: 'local.log',
  environment: Environment.DEVELOPMENT,
  serviceName: 'UNIT_TEST',
});

// nodeJotter.info(
//   'hi There!',
//   { name: 'test', env: 'production' },
//   { test: 'true' }
// );

nodeJotter.error('test Error', new Error(), {
  source: 'userService',
});
