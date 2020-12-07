import AachenLogo from '~/images/aachen/logo-stadt-aachen-bg.png';
import LandingBackground from '~/images/aachen/landing_background.jpg';
import { ReportsConfig } from '.';

const aachenConfig: ReportsConfig = {
  enabled: false,
  overviewMap: {
    style: 'mapbox://styles/hejco/ck7q440d50b6s1ip928c7zlbb',
    bounds: [
      [6.054187, 50.759965],
      [6.113367, 50.787419],
    ],
    maxBounds: [
      [5.9, 50.6],
      [6.3, 50.9],
    ],
    zoomDeepLinkedMarkers: 17,
    clusterColor: {
      outer: 'rgba(133, 133, 133, 0.98)',
      inner: 'rgba(205, 205, 205, 0.91)',
    },
  },
  locateMeMap: {
    zoomOnGeocodedLocation: 15.5,
    boundaryGeodataUrl: '/data/aachen.geojson',
    outofBoundaryText: 'Dieser Ort gehört leider nicht zum Meldegebiet',
    paddingInDegree: 0.1,
    geocoder: {
      debounceTime: 1000,
      searchStringMinLength: 3,
    },
  },
  landing: {
    title: 'Radbügel für Aachen',
    CTA: 'Schauen Sie sich alle Meldungen an',
    logo: {
      source: AachenLogo,
    },
    background: {
      source: LandingBackground,
      attribution: 'Bild: © Stadt Aachen/Nadine Jungblut',
    },
    backgroundDesktop: {
      source: LandingBackground,
      attribution: 'Bild: © Stadt Aachen/Nadine Jungblut',
    },
    stepColors: ['#000', '#000', '#000'],
    reportsInactive: {
      intro:
        'Damit Sie Ihr Fahrrad überall sicher abschließen können, installiert die Stadt Aachen neue Fahrradbügel. Der Meldezeitraum für Bürger*innen ist nun abgeschlossen. Vielen Dank für die rege Teilnahme und das große Interesse. In den letzten Monaten haben über 3.500 Bürger*innen die Plattform besucht. Davon hat jeder dritte mindestens eine Meldung abgegeben, sodass bis Ende August rund 1671 Wünsche mit einem Gesamtbedarf von 8726 Bügeln eingegangen sind. ',
      sections: [
        {
          heading: 'Wie sieht das weitere Vorgehen aus?',
          text:
            'Aktuell sehen sich Mitarbeiter*innen der Stadt die vorgeschlagenen Orte an und entscheiden, ob dort oder in der Nähe Radbügel aufgestellt werden können. Dies kann bei der hohen Anzahl an Meldungen einige Zeit in Anspruch nehmen. Sofern Sie Ihre Email - Adresse hinterlassen haben, erhalten Sie bei jeder Statusänderung eine Nachricht. Zudem werden auf der Karte unter den jeweiligen Symbolen Neuigkeiten zu den Standorten dargestellt. ',
        },
      ],
      steps: null,
      faq: [
        {
          heading: 'Werden alle Vorschläge umgesetzt?',
          text: `
            Leider können nicht an allen gewünschten Standorten Fahrradbügel aufgestellt werden. Dies kann unterschiedliche Gründe haben. In manchen Fällen können die Radbügel nicht an dem exakt gewünschten Ort installiert werden, dafür aber im nahen Umfeld. Auch darüber werden die Bürger*innen informiert, sofern sie ihre E-Mail-Adresse angegeben haben. Grundsätzlich gibt es natürlich eine Grenze, wie viele Fahrradbügel finanzierbar sind und von den beauftragten Fachfirmen pro Jahr aufgestellt werden können. 
          `,
        },
        {
          heading: 'Wie erfahre ich, dass Bügel gebaut werden?',
          text: `
            Die Karte mit allen Meldungen und Planungen wird regelmäßig aktualisiert, dort wird auch angezeigt, ob eine Meldung nach der Prüfung umgesetzt werden kann. Wenn Sie Ihre E-Mail Adresse angegeben haben, erhalten Sie eine Benachrichtigung, sobald die von Ihnen erstellte Meldung bearbeitet wurde.    
          `,
        },
      ],
    },
    reportsActive: {
      intro:
        'Damit Sie Ihr Fahrrad überall sicher abschließen können, baut die Stadt Aachen umfassend neue Fahrradabstellmöglichkeiten aus. Bürger*innen haben auf dieser Seite von April bis August 2020 gemeldet, wo genau sie Radbügel benötigen, so dass die Stadt diese jetzt bedarfsgerecht aufstellen kann.',
      steps: [
        {
          step: 1,
          text: 'Sie melden, wo neue Bügel benötigt werden.',
        },
        {
          step: 2,
          text:
            'Alle Meldungen, die bis zum 31. August 2020 eingegangen sind, werden von der Stadt Aachen geprüft.',
        },
        {
          step: 3,
          text:
            'Sofern sie umsetzbar sind, werden die Bügel so schnell wie möglich installiert.',
        },
      ],
      faq: [
        {
          heading: 'Warum sollte ich mitmachen?',
          text: `
            In Aachen werden 5.000 neue Fahrradbügel aufgestellt. Hier können Sie mitbestimmen, wo diese stehen sollen.
          `,
        },
        {
          heading: 'Wie kann ich mitmachen?',
          text: `
            Klicken Sie unten auf den Button „Sagen Sie uns, wo Fahradbügel benötigt werden“, oder schauen Sie sich zunächst die Karte mit den vorhandenen Meldungen an. Für eine neue Meldung werden Sie durch einen kurzen Dialog geführt, bei dem Sie den Ort und weitere Informationen zu Ihrer Meldung angeben müssen. Am einfachsten können Sie eine Meldung von Ihrem Smartphone machen – Sie können aber auch von zu Hause am PC einen Eintrag erstellen.
          `,
        },
        {
          heading: 'Was passiert mit den Meldungen?',
          text: `
           Während des Meldezeitraums werden die Mitarbeiter und Mitarbeiterinnen der Stadt Aachen alle Meldungen anschauen und bewerten, welche umsetzbar sind. Wenn Sie Ihre Mailadresse hinterlegen, bekommenSie in jedem Fall eine Rückmeldung, ob Ihr Wunsch realisiert werden kann. Wenn es Rückfragen gibt, wird sich die Stadt ebenfalls bei Ihnen melden. Zusätzlich wird auf radbuegel-aachen.de veröffentlicht, an welchen Orten neue Fahrradbügel installiert werden.
          `,
        },
        {
          heading: 'Werden alle Meldungen umgesetzt?',
          text: `
            Zunächst muss geprüft werden, ob an der gemeldeten Stelle Bügel aufgestellt werden können oder ob andere Aspekte dagegen sprechen. Bei Bedarf wird der Ort besichtigt, oder eine Rückfrage gestellt. Außerdem gibt es natürlich eine Grenze, wie viele Bügel finanzierbar sind und von den beauftragten Fachfirmen pro Jahr aufgestellt werden können. Mehrere Meldungen an einem Ort werden zusammengefasst und gemeinsam betrachtet.
          `,
        },
        {
          heading: 'Kann im gesamten Stadtgebiet gemeldet werden?',
          text: `
            Generell können Sie für das gesamte Stadtgebiet einen Bedarf an Radbügeln anmelden. Im Umfeld von Dom und Rathaus sind zusätzliche Fahrradbügel nur unter größeren Schwierigkeiten zu realisieren. Das hat mit den vielen Veranstaltungen dort zu tun, aber auch mit Fragen des Brand- und Denkmalschutzes. Dies wird in einem separaten Prozess geprüft. Wenn Sie Vorschläge unterbreiten möchten, bitten wir Sie, alternative Standorte anzugeben.    
          `,
        },
      ],
    },
  },
  form: { newsletter: false, zoomOutForInvalidLocations: false },
  title: 'Radbügel für Aachen',
  markerSet: 'aachen',
  tests: {
    addressInput: 'kasino',
    mockGeoLocation: {
      latitude: 50.79,
      longitude: 6.114,
    },
  },
  region: 'Aachen',
  feedbackMail: 'verkehrsmanagement@mail.aachen.de',
  flatButtons: true,
  thankYouNote: {
    base:
      'Ihre Meldung ist nun online! Alle Meldungen werden gesammelt und dann der Stadt übergeben. Die Planer:innen werden dann prüfen, welche Meldungen umgesetzt werden können. Die Ergebnisse sehen Sie anschließend hier auf der Karte',
    loggedIn:
      'und wir benachrichtigen Sie an Ihre im Login hinterlegte E-Mail-Adresse.',
    loggedOut:
      'und wenn Sie Ihre E-Mail-Adresse eingeben, benachrichtigen wir Sie auch per E-Mail.',
  },
  dialog: {
    imageResizeOptions: {
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.9,
    },
  },
};

export default aachenConfig;
