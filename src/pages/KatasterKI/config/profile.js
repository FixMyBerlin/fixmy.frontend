import PedelecIcon from '~/images/kataster-icons/icon-transportation-1.svg';
import BikeIcon from '~/images/kataster-icons/icon-transportation-2.svg';
import MotorbikeIcon from '~/images/kataster-icons/icon-transportation-5.svg';
import PublicIcon from '~/images/kataster-icons/icon-transportation-3.svg';
import CarIcon from '~/images/kataster-icons/icon-transportation-4.svg';

export default [
  {
    type: 'info',
    title: 'Zunächst drei allgemeine Fragen zum Verkehr in Berlin:'
  },
  {
    type: 'single_choice',
    name: 'berlinTraffic',
    title: 'Wie empfinden Sie den Verkehr in Berlin?',
    options: [
      {
        label: 'entspannt',
        value: 0
      },
      {
        label: 'eher entspannt',
        value: 1
      },
      {
        label: 'eher stressig',
        value: 2
      },
      {
        label: 'stressig',
        value: 3
      }
    ]
  },
  {
    type: 'info',
    title: 'Erzählen Sie uns nun etwas zu Ihrer Person: (9 Fragen)'
  },
  {
    type: 'transportRatings',
    title: 'Wie häufig nutzen Sie diese Verkehrsmittel?',
    name: 'transportRatings',
    sliderOptions: {
      min: 0,
      max: 5,
      step: 1,
      marks: { 0: 'Nie' }
    },
    ratingLabels: [
      'Nie',
      'Selten',
      '1 mal im Monat',
      'Mehrmals im Monat',
      '1 mal wöchentlich',
      '(fast) täglich'
    ],
    ratings: [
      {
        icon: PedelecIcon,
        name: 'pedelec',
        label: 'Zu Fuß'
      },
      {
        icon: BikeIcon,
        name: 'bicycle',
        label: 'Fahrrad'
      },
      {
        icon: MotorbikeIcon,
        name: 'motorbike',
        label: 'Roller / Motorrad'
      },
      {
        icon: PublicIcon,
        name: 'public',
        label: 'Bus & Bahn'
      },
      {
        icon: CarIcon,
        name: 'car',
        label: 'Auto'
      }
    ]
  },
  {
    type: 'single_choice',
    name: 'ageGroup',
    title: 'Wie alt sind Sie?',
    options: [
      {
        label: 'unter 16 Jahre',
        value: 0
      },
      {
        label: '16 bis 39 Jahre',
        value: 1
      },
      {
        label: '40 bis 65 Jahre',
        value: 2
      },
      {
        label: 'stressig',
        value: 3
      }
    ]
  },
  {
    type: 'single_choice',
    name: 'hasChildren',
    title: 'Haben Sie Kinder unter 12 Jahren?',
    options: [
      {
        label: 'Ja',
        value: true
      },
      {
        label: 'Nein',
        value: false
      }
    ]
  },
  {
    type: 'single_choice',
    name: 'bicycleAccident',
    title: 'Hatten Sie schon mal einen Fahrradunfall?',
    options: [
      {
        label: 'Nein, zum Glück nicht',
        value: 0
      },
      {
        label: 'Ja, ohne Verletzung',
        value: 1
      },
      {
        label: 'Ja, mit leichter Verletzung',
        value: 2
      },
      {
        label: 'Ja, mit schwerer Verletzung',
        value: 3
      }
    ]
  },
  {
    type: 'single_choice',
    name: 'gender',
    title: 'Ihr Geschlecht?',
    options: [
      {
        label: 'Weiblich',
        value: 'w'
      },
      {
        label: 'Männlich',
        value: 'm'
      },
      {
        label: 'Divers',
        value: 'd'
      }
    ]
  },
  {
    type: 'single_choice',
    name: 'bicycleUse',
    title: 'Das Fahrrad nutze ich ...',
    options: [
      {
        label: 'In der Freizeit',
        value: 0
      },
      {
        label: 'Im Alltag',
        value: 1
      },
      {
        label: 'Im Alltag und in  der Freizeit',
        value: 2
      },
      {
        label: 'weder noch',
        value: 3
      }
    ]
  },
  {
    type: 'multi_choice',
    name: 'vehiclesOwned',
    title: 'Mir steht folgendes zur Verfügung:',
    options: [
      {
        label: 'Pedelec / E-Bike',
        name: 'pedelec'
      },
      {
        label: 'Eigenes Auto',
        name: 'car'
      },
      {
        label: 'Monatsticket Nahverkehr',
        name: 'public'
      },
      {
        label: 'Motorad / Moped',
        name: 'motorbike'
      },
      {
        label: 'Fahrrad (ohne Motor)',
        name: 'bicylce'
      },
      {
        label: 'Carsharing',
        name: 'carsharing'
      }
    ]
  },
  {
    type: 'zip',
    name: 'zipcode',
    title:
      'Geben Sie Ihre Postleitzahl an, damit wir Sie einem Ort zuordnen können.'
  },
  {
    type: 'multi_choice',
    name: 'noname',
    title: 'Welcher dieser Aussagen würden sie zustimmen?',
    options: [
      {
        label: 'Meine täglichen Wege kann ich gut mit dem Fahrrad erledigen.',
        name: 0
      },
      {
        label: 'Radfahren macht mir Spaß',
        name: 1
      },
      {
        label: 'Ich kann gut und sicher Radfahren',
        name: 2
      },
      {
        label: 'In meinem Umfeld fahren viele Menschen Fahrrad',
        name: 3
      },
      {
        label: 'Ich fühle mich sicher auf dem Rad im Verkehr',
        name: 4
      }
    ]
  }
];
