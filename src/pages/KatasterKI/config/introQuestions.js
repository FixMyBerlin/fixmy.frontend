export default [
  {
    type: 'single_choice',
    name: 'offended',
    title: 'Wurden Sie im vergangenen Jahr im Verkehr verbal beleidigt?',
    options: [
      {
        label: 'Ja, häufig',
        value: 0,
      },
      {
        label: 'Ja, ab und zu',
        value: 1,
      },
      {
        label: 'Selten',
        value: 2,
      },
      {
        label: 'Nein, nie',
        value: 3,
      },
    ],
  },
  {
    type: 'single_choice',
    name: 'responsible',
    title: 'Wer trägt die größte Verantwortung für die Probleme im Verkehr?',
    options: [
      {
        label: 'Die Politik',
        value: 0,
      },
      {
        label: 'Die Polizei / das Ordnungsamt',
        value: 1,
      },
      {
        label: 'Die Autofahrer',
        value: 2,
      },
      {
        label: 'Die Radfahrer',
        value: 3,
      },
      {
        label: 'Die Fußgänger',
        value: 4,
      },
    ],
  },
  {
    type: 'single_choice',
    name: 'annoyingTraffic',
    title: 'Was nervt Sie am meisten am Straßenverkehr?',
    options: [
      {
        label: 'Hohes Verkehrsaufkommen und Staus',
        value: 0,
      },
      {
        label: 'Der Zustand der Straßen/Radwege',
        value: 1,
      },
      {
        label: 'Missachtung der Verkehrsregeln',
        value: 2,
      },
      {
        label: 'Der Lärm',
        value: 3,
      },
      {
        label: 'Die Unfälle',
        value: 4,
      },
      {
        label: 'Aggressives Verhalten anderer',
        value: 5,
      },
      {
        label: 'Die Luftverschmutzung',
        value: 6,
      },
    ],
  },
  {
    type: 'multi_choice',
    name: 'annoyingPeople',
    title: 'Was nervt Sie am meisten am Verhalten anderer?',
    options: [
      { label: 'Falschparker', name: 'parkingViolations' },
      { label: 'Drängeln', name: 'tailgate' },
      { label: 'Überhöhte Geschwindigkeit anderer', name: 'speeding' },
      { label: 'Smartphone-Nutzung anderer im Verkehr', name: 'phones' },
      { label: 'Zu dichtes Überholen', name: 'overtake' },
      { label: 'Ignorieren der Vorfahrtsregeln', name: 'rightOfWay' },
      { label: 'Ignorieren von Ampeln', name: 'trafficLights' },
    ],
  },
  {
    type: 'multi_choice',
    name: 'climateTraffic',
    title:
      'Welche Maßnahmen würden Sie befürworten, um den Berliner Verkehr klimafreundlicher zu gestalten?',
    options: [
      { label: 'Besserer öffentlicher Nahverkehr', name: 'public' },
      { label: 'Bessere Radwege', name: 'cyclePaths' },
      { label: 'Mehr Platz für Fußgänger', name: 'pedestrianSpace' },
      { label: 'Mehr Tempolimits', name: 'tempolimit' },
      { label: 'Verbot von Verbrennungsmotoren', name: 'ice' },
      { label: 'Citymaut', name: 'tolls' },
      { label: 'Besteuerung großer Autos', name: 'bigCarTax' },
      { label: 'Mehr Sharing-Angebote in Außenbezirken', name: 'sharing' },
      { label: 'Mehr Ladesäulen für Elektroautos', name: 'chargers' },
    ],
  },
  {
    type: 'multi_choice',
    name: 'saveSpace',
    title:
      'Wo sollte auf Berlins Straßen am ehesten Platz eingespart werden? Durch:',
    options: [
      { label: 'Weniger Autoparkplätze', name: 'carparking' },
      { label: 'Weniger Radwege', name: 'cyclewidth' },
      { label: 'Schmalere Gehwege', name: 'pedestrianwidth' },
      { label: 'Weniger Autospuren', name: 'carlanes' },
      { label: 'Weniger Busspuren', name: 'buslanes' },
      { label: 'Weniger Grünflächen', name: 'green' },
      { label: 'Nirgendwo. Es soll so bleiben wie es ist', name: 'nada' },
    ],
  },
  {
    type: 'multi_choice',
    name: 'sharingModes',
    title: 'Welche Sharing-Angebote halten Sie für sinnvoll?',
    options: [
      { label: 'Leihräder', name: 'bikes' },
      { label: 'E-Tretroller wie Lime, Tier, Voi, etc.', name: 'scooter' },
      { label: 'E-Roller wie Emmy und Coup', name: 'bigscooter' },
      { label: 'Carsharing', name: 'car' },
      { label: 'Ridesharing, z.B. Berlkönig', name: 'ridesharing' },
      { label: 'Lastenräder', name: 'transportbikes' },
      { label: 'Kleintransporter', name: 'vans' },
      { label: 'keine', name: 'nada' },
    ],
  },
  {
    type: 'multi_choice',
    name: 'sharingConditions',
    title: 'Welche Bedingungen sollen für Sharing-Angebote gelten?',
    options: [
      {
        label:
          'Spezielle Stellplätze sollten auf der Fahrbahn geschaffen werden',
        name: 'parking',
      },
      {
        label:
          'Das Abstellen von Fahrrädern und Scootern sollte auf dem Bürgersteig erlaubt sein',
        name: 'sidewalk',
      },
      {
        label: 'Das Ausleihen sollte nur an festen Leihstationen möglich sein',
        name: 'sharingstations',
      },
      {
        label: 'Die Zahl der Sharing-Fahrzeuge soll beschränkt werden',
        name: 'limits',
      },
      {
        label:
          'Die Angebote sollten von der Stadt gefördert werden, damit sie auch in den Außenbezirken angeboten werden können',
        name: 'subsidy',
      },
    ],
  },
];
