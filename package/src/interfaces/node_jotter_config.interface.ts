import { Environment } from '../enums/environment.enum';

export interface NodeJotterConfiguration {
  filename: string;
  environment: Environment;
  serviceName: string;
}
