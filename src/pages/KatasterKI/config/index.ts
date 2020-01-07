import config from '~/config';

const katasterConfig = {
  katasterKI: {
    zipcodeDistricts: {
      '10247': ['Friedrichshain-Kreuzberg', 'Pankow'],
      '10249': ['Friedrichshain-Kreuzberg', 'Pankow'],
      '10435': ['Mitte', 'Pankow'],
      '10777': ['Tempelhof-Schöneberg', 'Charlottenburg-Wilmersdorf'],
      '10779': ['Tempelhof-Schöneberg', 'Charlottenburg-Wilmersdorf'],
      '10785': ['Friedrichshain-Kreuzberg', 'Tempelhof-Schöneberg', 'Mitte'],
      '10787': ['Charlottenburg-Wilmersdorf', 'Tempelhof-Schöneberg', 'Mitte'],
      '10789': ['Charlottenburg-Wilmersdorf', 'Tempelhof-Schöneberg'],
      '10825': ['Tempelhof-Schöneberg', 'Charlottenburg-Wilmersdorf'],
      '10827': ['Tempelhof-Schöneberg', 'Charlottenburg-Wilmersdorf'],
      '10963': ['Friedrichshain-Kreuzberg', 'Mitte'],
      '10965': ['Friedrichshain-Kreuzberg', 'Neukölln', 'Tempelhof-Schöneberg'],
      '10967': ['Friedrichshain-Kreuzberg', 'Neukölln'],
      '12099': ['Neukölln', 'Tempelhof-Schöneberg', 'Neukölln'],
      '12107': ['Neukölln', 'Tempelhof-Schöneberg'],
      '12157': ['Tempelhof-Schöneberg', 'Steglitz-Zehlendorf'],
      '12161': ['Tempelhof-Schöneberg', 'Steglitz-Zehlendorf'],
      '12163': ['Tempelhof-Schöneberg', 'Steglitz-Zehlendorf'],
      '12279': ['Steglitz-Zehlendorf', 'Tempelhof-Schöneberg'],
      '12305': ['Neukölln', 'Tempelhof-Schöneberg'],
      '12435': ['Treptow-Köpenick', 'Neukölln'],
      '13088': ['Lichtenberg', 'Pankow'],
      '13353': ['Charlottenburg-Wilmersdorf', 'Mitte'],
      '13405': ['Reinickendorf', 'Mitte'],
      '13407': ['Reinickendorf', 'Mitte'],
      '13409': ['Reinickendorf', 'Mitte'],
      '13597': ['Charlottenburg-Wilmersdorf', 'Spandau'],
      '13599': ['Spandau', 'Reinickendorf'],
      '13627': ['Charlottenburg-Wilmersdorf', 'Spandau'],
      '13629': ['Charlottenburg-Wilmersdorf', 'Spandau', 'Reinickendorf'],
      '14193': ['Steglitz-Zehlendorf', 'Charlottenburg-Wilmersdorf'],
      '14195': ['Steglitz-Zehlendorf', 'Charlottenburg-Wilmersdorf'],
      '14197': ['Tempelhof-Schöneberg', 'Charlottenburg-Wilmersdorf']
    },
    buttonTimeout: 300,
    projectId: '01',
    // this is the article link for the landing page and feedback page
    tspArticleLink: 'https://interaktiv.tagesspiegel.de/lab/strassencheck/',
    tspNewsletterLink: 'https://www.tagesspiegel.de/newsletter/',
    shareUrl: 'https://interaktiv.tagesspiegel.de/strassencheck/',
    shareTitle: 'Umfrage Share Title',
    shareText:
      'Wie können die Straßen sicher für alle werden? Tolle Umfrage von @FixMyBerlin und @tagesspiegel, bitte teilnehmen!'
  }
};

export default {
  ...config,
  ...katasterConfig
};
