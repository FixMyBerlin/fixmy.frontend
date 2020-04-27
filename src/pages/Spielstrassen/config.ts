import config from '~/config';

export default {
  spielstrassen: {
    campaign: 'xhain',
    email: 'aufsicht@ba-fk.berlin.de',
    supporterGoal: 7,
    shareTitle: 'Melde dich an für temporäre Spielstraßen',
    shareText:
      'Friedrichshain-Kreuzberg richtet temporäre Spielstraßen ein, hier kann man sich melden um eine Spielstraße zu unterstützen. Bitte unterstütze diese Spielstraße, damit das möglich wird:',
    streets: [
      {
        street: 'Samariterstraße',
        kiez: 'Samariterviertel',
        region: 'Friedrichshain'
      },
      {
        street: 'Richard-Sorge-Straße',
        kiez: 'Richard-Sorge-Viertel',
        region: 'Friedrichshain'
      },
      {
        street: 'Gärtnerstraße',
        kiez: 'Boxhagener Platz',
        region: 'Friedrichshain'
      },
      {
        street: 'Krossener Straße',
        kiez: 'Boxhagener Platz',
        region: 'Friedrichshain'
      },
      {
        street: 'Lausitzer Platz',
        kiez: 'Lausitzer Platz',
        region: 'Kreuzberg'
      },
      { street: 'Waldemarstraße', kiez: 'Oranienplatz', region: 'Kreuzberg' },
      { street: 'Wassertorstraße', kiez: 'Moritzplatz', region: 'Kreuzberg' },
      { street: 'Friedrichstraße', kiez: 'Mehringplatz', region: 'Kreuzberg' },
      { street: 'Arndtstraße', kiez: 'Chamissokiez', region: 'Kreuzberg' },
      { street: 'Böckstraße', kiez: 'Graefekiez', region: 'Kreuzberg' },
      { street: 'Lachmannstraße', kiez: 'Graefekiez', region: 'Kreuzberg' },
      { street: 'Lübbener Straße', kiez: 'Wrangelkiez', region: 'Kreuzberg' },
      { street: 'Cuvrystraße', kiez: 'Wrangelkiez', region: 'Kreuzberg' },
      {
        street: 'Helmerdingstraße',
        kiez: 'Boxhagener Platz',
        region: 'Friedrichshain'
      },
      {
        street: 'Paul-Lincke-Ufer',
        kiez: 'Reichenberger Straße',
        region: 'Kreuzberg'
      },
      { street: 'Lilienthalstraße', kiez: 'Chamissokiez', region: 'Kreuzberg' },
      { street: 'Dresdener Straße', kiez: 'Oranienplatz', region: 'Kreuzberg' },
      {
        street: 'Rudolfstraße	Stralauer',
        kiez: 'Kiez',
        region: 'Friedrichshain'
      },
      {
        street: 'Liebigstraße',
        kiez: 'Samarieterviertel',
        region: 'Friedrichshain'
      }
    ]
  },
  ...config
};
