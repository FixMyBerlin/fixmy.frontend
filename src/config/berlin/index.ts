export default {
  districts: {
    xhain: {
      title: 'Friedrichshain-Kreuzberg',
      path: 'friedrichshain-kreuzberg',
      short: 'xhain',
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
      short: 'tempelberg',
      backend: {
        local: 'http://localhost:8000/api',
        staging: 'https://fixmyberlin-staging.netlify.app/api/tempelberg/next',
        production: 'https://fixmyberlin.de/api/tempelberg/v1'
      },
      apps: {
        gastro: {
          path: 'terrassen'
        }
      }
    }
  }
};
