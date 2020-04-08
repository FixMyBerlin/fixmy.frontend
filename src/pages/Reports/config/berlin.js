import config from '~/config';

export default {
  overviewMap: {
    style: 'mapbox://styles/hejco/cjpnt0cc41ipy2rlpu19jgt7a',
    bounds: [
      [13.3651, 52.4658],
      [13.4945, 52.5479]
    ],
    maxBounds: [
      [13.2, 52.4158],
      [13.6, 52.5979]
    ],
    clusterColor: {
      outer: 'rgba(145, 0, 85, 0.5)',
      inner: 'rgba(207, 10, 125, 0.4)'
    }
  },
  locateMeMap: {
    zoomOnGeocodedLocation: 15.5,
    boundaryGeodataUrl: '/data/Fhain-Xberg-trimmed.json',
    outofBoundaryText:
      'Diese Adresse liegt außerhalb Friedrichshain-Kreuzbergs',
    reverseGeocoderUrl:
      'https://api.mapbox.com/geocoding/v5/mapbox.places/{long},{lat}.json',
    paddingInDegree: 0.1,
    geocoder: {
      debounceTime: 1000,
      searchStringMinLength: 3
    }
  },
  landing: {
    title: 'Melde neue Fahrradbügel für Friedrichshain-Kreuzberg',
    stepColors: [config.colors.interaction, '#ff99d5', config.colors.black]
  },
  form: { placementNotice: true },
  reportsDisabled: true,
  markerSet: 'default',
  tests: {
    addressInput: 'meh',
    mockGeoLocation: {
      latitude: 52.490064,
      longitude: 13.38694
    }
  },
  title: 'Fahrradbügel für Friedrichshain-Kreuzberg',
  region: 'Friedrichshain-Kreuzberg',
  intro:
    'Damit du dein Fahrrad überall sicher abschließen kannst, installiert das Bezirksamt Friedrichshain-Kreuzberg neue Fahrradbügel. Da du als Bürger:in am besten weißt, wo du dein Fahrrad abstellst, kannst du hier melden, wo genau im Bezirk du neue Bügel benötigst.',
  steps: [
    {
      step: 1,
      text: 'Du meldest, wo neue Bügel benötigt werden.'
    },
    {
      step: 2,
      text:
        'Alle Meldungen, die bis zum 10. Oktober eingegangen sind, werden vom Bezirksamt geprüft.'
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
        Im Rahmen des Mobilitätsgesetzes sollen in ganz Berlin 100.000 neue Abstellplätze für den Radverkehr geschaffen werden.
        Friedrichshain-Kreuzberg setzt sich für sicheres Fahrradparken im Bezirk ein und möchte möglichst viele der Meldungen umsetzen.<br />
        Ihr könnt mit eurer Bedarfsmeldung aktiv an einer Verbesserung der Rad-Infrastruktur des Bezirks mithelfen indem ihr beschreibt wo neue Fahrradbügel benötigt werden.
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
        Nach Abschluss des Meldezeitraums werden die Mitarbeiter und Mitarbeiterinnen des Straßen- und Grünflächenamtes 
        in Friedrichshain-Kreuzberg alle Meldungen anschauen und auswerten, welche umsetzbar sind. 
        Wenn du deine Mailadresse hinterlegt hast, bekommst du auf jeden Fall eine Rückmeldung, 
        ob dein Wunsch realisiert werden kann. Wenn es Rückfragen gibt, wird sich das Bezirksamt ebenfalls bei dir melden. 
        Zusätzlich wird auf FixMyBerlin veröffentlicht, an welchen Orten neue Fahrradbügel installiert werden.
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
    },
    {
      heading: 'Warum ist mein Bezirk nicht dabei?',
      text: `
        Dieses Pilotprojekt wird zunächst nur in Friedrichshain-Kreuzberg durchgeführt.
        Wenn es erfolgreich läuft, soll es auch in anderen Bezirken gestartet werden.
        Unter <a class="feedbackmail"
        href="mailto:feedback@fixmyberlin.de?subject=Feedback zum Meldedialog"
        >feedback@fixmyberlin.de</a>
        kannst du uns gerne eine Rückmeldung geben,
        was wir noch verbessern können und in welchem Bezirk du diesen Dialog gerne sehen würdest.
      `
    }
  ],
  thankYouNote: {
    base:
      'Deine Meldung ist nun online! Alle Meldungen werden gesammelt und dann dem Bezirksamt am 10. Oktober 2019 übergeben. Die Planer:innen im Straßen- und Grünflächenamt prüfen, welche Meldungen umgesetzt werden können. Die Ergebnisse siehst du anschließend hier auf der Karte',
    endingLoggedIn:
      'und wir benachrichtigen dich an deine im Login hinterlegte E-Mail-Adresse.',
    endingLoggedOut:
      'und wenn du deine E-Mail-Adresse eingibst, benachrichtigen wir dich auch per E-Mail.'
  }
};
