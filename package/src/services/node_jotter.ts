import winston, { Logger, format } from 'winston';
const { combine, timestamp, label, printf, prettyPrint } = format;

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
      // format: this.getFormat(serviceName),
      transports: [new winston.transports.File({ filename })],
    });

    if (environment != Environment.PRODUCTION) {
      this.loggingAgent.add(
        new winston.transports.Console({
          format: this.getFormat(serviceName),
        })
      );
    }
  }

  private getFormat(labelText: string) {
    console.log(labelText);
    const myFormat = printf(({ level, message, label, timestamp }) => {
      console.log(`${timestamp} [${label}] ${level}: ${message}`);
      return `${timestamp} [${labelText}] ${level}: ${message}`;
    });
    const combinedFormat = combine(
      // label({ label: labelText, message: true }),
      timestamp(),
      // prettyPrint(),
      myFormat
    );

    return combinedFormat;
  }
  /**
   * Application level logs of INFO level
   */
  info(message: string) {
    this.loggingAgent.info(message);
  }

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
