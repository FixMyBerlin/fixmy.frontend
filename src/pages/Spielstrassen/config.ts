import config from '~/config';

export default {
  spielstrassen: {
    campaign: 'xhain',
    email: 'aufsicht@ba-fk.berlin.de',
    supporterGoal: 7,
    streets: [
      {
        kiez: 'Andreasviertel',
        street: 'Arndtstrasse',
        region: 'Friedrichshain'
      },
      {
        kiez: 'Askanischer Platz',
        street: 'Friedrichstrasse',
        region: 'Friedrichshain'
      },
      {
        kiez: 'Barnimkiez',
        street: 'Lilienthalstrasse',
        region: 'Friedrichshain'
      },
      {
        kiez: 'Boxhagener Platz',
        street: 'Straßenname',
        region: 'Friedrichshain'
      },
      {
        kiez: 'Chamissokiez',
        street: 'Bergmannstraße',
        region: 'Friedrichshain'
      }
    ]
  },
  ...config
};
