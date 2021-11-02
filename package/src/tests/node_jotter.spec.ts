import { NodeJotter, Environment } from '../services/node_jotter';
import { expect } from 'chai';

const nodeJotter = new NodeJotter({
  filename: 'local.log',
  environment: Environment.DEVELOPMENT,
  serviceName: 'UNIT_TEST',
});

describe('node_jotter', () => {
  it('it should print an info log', () => {
    nodeJotter.info('This is a test message');
    // expect();
  });
});
