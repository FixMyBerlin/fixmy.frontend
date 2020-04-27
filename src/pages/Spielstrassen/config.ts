import config from '~/config';

export default {
  spielstrassen: {
    campaign: 'xhain',
    email: 'aufsicht@ba-fk.berlin.de',
    supporterGoal: 7,
    streets: [
      { kiez: 'Andreasviertel', street: 'Arndtstrasse' },
      { kiez: 'Askanischer Platz', street: 'Friedrichstrasse' },
      { kiez: 'Barnimkiez', street: 'Lilienthalstrasse' },
      { kiez: 'Boxhagener Platz', street: 'Straßenname' },
      { kiez: 'Chamissokiez', street: 'Bergmannstraße' }
    ]
  },
  ...config
};
