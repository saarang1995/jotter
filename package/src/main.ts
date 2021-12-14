import { Environment } from './enums/environment.enum';
import { NodeJotter } from './services/node_jotter';

export const Logger = NodeJotter;

export interface LoggerConfiguration {
  environment: Environment;
  serviceName: string;
  level: 'error' | 'debug' | 'info';
  filename?: string;
}
