export default [
  {
    type: 'multi_choice',
    name: 'berlinTraffic',
    title: 'Was nervt Sie am meisten am Straßenverkehr?',
    options: [
      {
        label: 'Hohes Verkehrsaufkommen und Staus',
        name: 'traffic'
      },
      {
        label: 'Der Zustand der Straßen / Radwege',
        name: 'maintenance'
      },
      {
        label: 'Missachtung der Verkehrsregeln',
        name: 'rules'
      },
      {
        label: 'Der Lärm',
        name: 'noise'
      },
      {
        label: 'Die Unfälle',
        name: 'accidents'
      },
      {
        label: 'Aggressives Verhalten anderer',
        name: 'aggression'
      },
      {
        label: 'Die Luftverschmutzung',
        name: 'polution'
      }
    ]
  },
  {
    type: 'single_choice',
    name: 'offended',
    title: 'Wurden Sie im vergangenen Jahr im Verkehr verbal beleidigt?',
    options: [
      {
        label: 'Ja, häufig',
        value: 0
      },
      {
        label: 'Ja, ab und zu',
        value: 1
      },
      {
        label: 'Selten',
        value: 2
      },
      {
        label: 'Nein, nie',
        value: 3
      }
    ]
  },
  {
    type: 'single_choice',
    name: 'responsible',
    title: 'Wer trägt die größte Verantwortung für die Probleme im Verkehr?',
    options: [
      {
        label: 'Die Politik',
        value: 0
      },
      {
        label: 'Die Polizei / das Ordnungsamt',
        value: 1
      },
      {
        label: 'Die Autofahrer',
        value: 2
      },
      {
        label: 'Die Radfahrer',
        value: 3
      },
      {
        label: 'Die Fußgänger',
        value: 4
      }
    ]
  }
];
