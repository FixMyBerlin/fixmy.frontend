export default {
  districts: {
    xhain: {
      title: 'Friedrichshain-Kreuzberg',
      path: 'friedrichshain-kreuzberg',
      name: 'xhain',
      bounds: [
        [13.3651, 52.4658],
        [13.4945, 52.5479]
      ],
      apps: {
        spielstrassen: {
          path: 'spielstrassen'
        },
        gastro: {
          path: 'terrassen'
        }
      }
    },
    tempelberg: {
      title: 'Tempelhof-Schöneberg',
      path: 'tempelhof-schöneberg',
      name: 'tempelberg',
      backend: {
        local: 'http://localhost:8000/api',
        staging: 'https://fixmyberlin-staging.netlify.app/api/tempelberg/next',
        production: 'https://fixmyberlin.de/api/tempelberg/v1'
      },
      bounds: [
        [13.319982942, 52.376139915],
        [13.427456693, 52.504941181]
      ],
      apps: {
        gastro: {
          path: 'terrassen'
        }
      }
    }
  }
};
