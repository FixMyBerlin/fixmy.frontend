export default [
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
  },
  {
    type: 'multi_choice',
    name: 'riskFactors',
    title: 'Warum fühlen Sie sich am ehesten unsicher im Straßenverkehr?',
    options: [
      {
        label: 'Wege nicht ausreichend beleuchtet',
        name: 'lighting'
      },
      {
        label: 'Baustellen auf der Fahrbahn',
        name: 'construction'
      },
      {
        label: 'Breite der Straßen und Wege nicht ausreichend',
        name: 'roadWidth'
      },
      {
        label: 'Falschparker',
        name: 'parkingViolations'
      },
      {
        label: 'Überhöhte Geschwindigkeit anderer',
        name: 'speed'
      },
      {
        label: 'Smartphone-Nutzung anderer im Verkehr',
        name: 'smartphones'
      },
      {
        label: 'Überholen ohne genügend Sicherheitsabstand',
        name: 'distance'
      },
      {
        label: 'Straßenbelag in schlechtem Zustand',
        name: 'roadSurface'
      },
      {
        label: 'Zu viel Verkehr',
        name: 'trafficAmount'
      },
      {
        label: 'Aggressives Verhalten anderer',
        name: 'aggressive'
      },
      {
        label: 'Ignorieren der Verkehrsregeln',
        name: 'ruleViolation'
      },
      {
        label: 'Schlechte Kreuzungsgestaltung',
        name: 'crossings'
      },
      {
        label: 'Ich fühle mich nie unsicher im Verkehr',
        name: 'chuckNorris'
      }
    ]
  },
  {
    type: 'multi_choice',
    name: 'bestMeasures',
    title:
      'Welche Maßnahmen würden Sie befürworten, um den Berliner Verkehr klimafreundlicher zu gestalten?',
    options: [
      {
        label: 'Besserer öffentlicher Nahverkehr',
        name: 'publicTransport'
      },
      {
        label: 'Bessere Radwege',
        name: 'cyclePaths'
      },
      {
        label: 'Mehr Platz für Fußgänger',
        name: 'pedestrianSpace'
      },
      {
        label: 'Mehr Tempolimits',
        name: 'speedLimit'
      },
      {
        label: 'Verbot von Verbrennungsmotoren',
        name: 'banICEs'
      },
      {
        label: 'Citymaut',
        name: 'toll'
      },
      {
        label: 'Besteuerung großer Autos',
        name: 'tankTax'
      },
      {
        label: 'Mehr Sharing-Angebote',
        name: 'sharing'
      },
      {
        label: 'Mehr Ladesäulen für Elektroautos',
        name: 'chargingInfrstructure'
      }
    ]
  }
];
