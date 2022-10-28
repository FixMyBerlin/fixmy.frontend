import { RegionConfig } from '~/types';
import { menu } from './menu';
import { routes } from './routes';

const zesplusConfig: RegionConfig = {
  siteTitle: 'ZESplus',
  titleFont: 'Roboto Slab',
  baseFont: 'Roboto',
  routes,
  menu,
  newsletter: {
    embedUrl: 'https://app.mailjet.com/widget/iframe/2YIa/EuZ',
  },
};

export default zesplusConfig;
