import globalConfig from '~/config';
import hbiConfig from './hbi';

const mapConfig = {
  hbi: hbiConfig.labels,
  hbiStops: hbiConfig.stops,
  planningPhases: [
    {
      id: 'draft',
      color: '#fa96d0',
      icon: 'konzept.svg',
      name: 'Konzept'
    },
    {
      id: 'planning',
      color: '#cf0a7d',
      icon: 'planung.svg',
      name: 'Planung'
    },
    {
      id: 'execution',
      color: '#910055',
      icon: 'bau.svg',
      name: 'im Bau'
    },
    {
      id: 'ready',
      color: '#0f0f0f',
      icon: 'fertig.svg',
      name: 'Fertig'
    }
  ]
};

export default {
  ...mapConfig,
  ...globalConfig
};
