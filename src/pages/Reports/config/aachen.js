export default {
  overviewMap: {
    style: 'mapbox://styles/hejco/ck7q440d50b6s1ip928c7zlbb',
    bounds: [
      [6.054187, 50.759965],
      [6.113367, 50.787419]
    ],
    maxBounds: [
      [5.87, 50.5],
      [6.5, 50.95]
    ]
  },
  locateMeMap: {
    zoomOnGeocodedLocation: 15.5,
    boundaryGeodataUrl: '/data/aachen.geojson',
    outofBoundaryText: 'Dieser Ort gehört leider nicht zum Meldegebiet',
    reverseGeocoderUrl:
      'https://api.mapbox.com/geocoding/v5/mapbox.places/{long},{lat}.json',
    paddingInDegree: 0.1,
    geocoder: {
      debounceTime: 1000,
      searchStringMinLength: 3
    }
  },
  landing: {
    title: 'Radbügel für Aachen',
    logo: false
  },
  form: { newsletter: false, zoomOutForInvalidLocations: false },
  title: 'Radbügel für Aachen',
  region: 'Aachen',
  intro:
    'Damit du dein Fahrrad überall sicher abschließen kannst, installiert die Stadt Aachen neue Fahrradbügel. Da du als Bürger:in am besten weißt, wo du dein Fahrrad abstellst, kannst du hier melden, wo genau du neue Bügel benötigst.',
  steps: [
    {
      step: 1,
      text: 'Du meldest, wo neue Bügel benötigt werden.'
    },
    {
      step: 2,
      text:
        'Alle Meldungen, die bis zum 15. Mai eingegangen sind, werden von der Stadt Aachen geprüft.'
    },
    {
      step: 3,
      text:
        'Sofern sie umsetzbar sind, werden die Bügel noch in diesem Jahr installiert.'
    }
  ],
  faq: [
    {
      heading: 'Warum sollte ich mitmachen?',
      text: `
        In Aachen werden neue Fahrradbügel gebaut. Hier könnt ihr sagen, wo sie stehen sollen.
      `
    },
    {
      heading: 'Wie kann ich mitmachen?',
      text: `
        Klicke unten auf den Button „Sag uns, wo du Radbügel benötigst“, oder schaue dir zunächst die Karte mit den
        vorhandenen Meldungen an. Für eine neue Meldung wirst du durch einen kurzen Dialog geführt,
        bei dem du den Ort und weitere Informationen zu deiner Meldung angeben musst.
        Am einfachsten kannst du eine Meldung unterwegs von deinem Smartphone machen,
        du kannst aber auch von zu Hause am PC einen Eintrag erstellen.
      `
    },
    {
      heading: 'Was passiert mit den Meldungen?',
      text: `
        Nach Abschluss des Meldezeitraums werden die Mitarbeiter und Mitarbeiterinnen der Stadt Aachen alle Meldungen anschauen und auswerten, welche umsetzbar sind. 
        Wenn du deine Mailadresse hinterlegt hast, bekommst du auf jeden Fall eine Rückmeldung, 
        ob dein Wunsch realisiert werden kann. Wenn es Rückfragen gibt, wird sich die Stadt ebenfalls bei dir melden. 
        Zusätzlich wird über Radbügel für Aachen veröffentlicht, an welchen Orten neue Fahrradbügel installiert werden.
      `
    },
    {
      heading: 'Werden alle Meldungen umgesetzt?',
      text: `
        Zunächst muss geprüft werden, ob an der gemeldeten Stelle Bügel aufgestellt werden können oder ob andere Aspekte dagegen sprechen. 
        Ggf. wird der Ort besichtigt, oder eine Rückfrage gestellt. Außerdem gibt es natürlich eine Grenze, 
        wie viele Bügel finanzierbar sind und von den beauftragten Fachfirmen pro Jahr aufgestellt werden können. 
        Mehrere Meldungen an einem Ort werden zusammengefasst und gemeinsam betrachtet. 
      `
    }
  ],
  thankYouNote: {
    base:
      'Deine Meldung ist nun online! Alle Meldungen werden gesammelt und dann der Stadt am 15. Mai 2020 übergeben. Die Planer:innen werden dann prüfen, welche Meldungen umgesetzt werden können. Die Ergebnisse siehst du anschließend hier auf der Karte',
    loggedIn:
      'und wir benachrichtigen dich an deine im Login hinterlegte E-Mail-Adresse.',
    loggedOut:
      'und wenn du deine E-Mail-Adresse eingibst, benachrichtigen wir dich auch per E-Mail.'
  }
};
