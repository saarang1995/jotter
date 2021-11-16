import { NodeJotter } from '../services/node_jotter';
import { expect } from 'chai';
import { Environment } from '../enums/environment.enum';

const nodeJotter = new NodeJotter({
  filename: 'local.log',
  environment: Environment.development,
  serviceName: 'UNIT_TEST',
  level: 'info',
});

describe('node_jotter', () => {
  it('it should print an info log', () => {
    nodeJotter.info('This is a test message');
    // expect();
  });
});
