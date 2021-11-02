import { NodeJotter, Environment } from '../services/node_jotter';
import { expect } from 'chai';

const nodeJotter = new NodeJotter({
  filename: 'local',
  environment: Environment.DEVELOPMENT,
  serviceName: 'UNIT_TEST',
});

describe('node_jotter', () => {
  it('it should print log', () => {
    nodeJotter.info();
    // expect();
  });
});
