import React from 'react';

import {
  Paragraph,
  Heading,
  SectionProps,
  Quote,
  List,
} from '~/components2/Article';
import { Link } from '~/components2/Link';

const SectionAbout = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Hintergrundinformationen zum Projekt
    </Heading>

    <Quote long sourceText="Jörg Jenoch, Bürgermeister Eichwalde">
      „Oft sind wir noch auf unsere Autos angewiesen. Doch für Wege innerhalb
      der Gemeinden sollte das Fahrrad das Verkehrsmittel der Wahl werden. Auch
      unsere Kinder sollen auf dem Rad eigenständig und sicher zu ihren
      Freunden, zur Schule, zum Sport oder an die Badewiese kommen. Dafür
      brauchen wir gute Angebote für den Radverkehr, von denen wir letztendlich
      alle profitieren.“
    </Quote>

    <Heading as="h3">
      Warum ist der Radverkehr wichtig für die Gemeinden?
    </Heading>
    <Paragraph>
      Viele Wege innerhalb der drei eng verflochtenen Gemeinden sind kürzer als
      5 km und könnten eigentlich leicht mit dem Fahrrad zurückgelegt werden.
      Verschiedene s.g. Radverkehrsanlagen – Schutzstreifen, Radwege oder für
      den Radverkehr freigegebene Bürgersteige - sind dafür bereits angelegt.
      Gleichzeitig gibt es in jeder der drei Gemeinden aktuell auch noch
      Missstände, die das Radfahren erschweren. Diese sollen durch das Konzept
      behoben werden, sodass das Rad für Alltagswege innerhalb der Gemeinden
      eine noch attraktivere Alternative zum Auto bildet. Dabei ist wichtig,
      Konflikte mit dem Fußverkehr und dem Auto zu vermeiden, um die Sicherheit
      für allen Verkehrsteilnehmer:innen zu erhöhen.
    </Paragraph>
    <Paragraph>
      Bereits jetzt haben Eichwalde, Zeuthen und Schulzendorf ein hohes
      Aufkommen von Pendler:innen zu den Nachbargemeinden, dem BER oder nach
      Berlin. Mit der Inbetriebnahme des Berliner Flughafens BER ist mit einer
      signifikanten Ansiedlung von Gewerbe im Umfeld des Flughafens sowie
      schätzungsweise bis zu 135.000 neuen Arbeitsplätzen im Flughafenumland
      auszugehen. Dies wird eine erheblich anwachsende Verkehrslast in der
      Region zur Folge haben. Durch die enge Verflechtung der ZES-Gemeinden mit
      ihrem direkten Umfeld (Wildau, Königs-Wusterhausen und BER) ergibt sich
      jedoch ein hohes Potenzial für eine Verlagerung hin zum Radverkehr. Dies
      wollen die beteiligten Gemeinden aufgreifen und die Entwicklung rund um
      den BER nutzen, um eine nachhaltige Mobilität in der Region
      sicherzustellen.
    </Paragraph>
    <Paragraph>
      Um im Alltagsverkehr auch auf mittlerer Distanz Alternativen zum MIV
      (Motorisierter Individualverkehr) zu schaffen, sind dabei besonders
      durchgehende, überörtliche Verbindungen erforderlich, welche eine
      störungsfreie Fahrt auf dem Fahrrad oder dem Pedelec zu den
      Nachbargemeinden oder dem BER ermöglichen. Ebenso ist eine funktionale,
      leistungsfähige Verknüpfung zwischen dem Radverkehr und dem ÖPNV
      essentiell. Neben der Förderung des Alltagsradverkehrs innerhalb der
      ZES-Gemeinden stehen dies beiden Punkte dabei ebenso im Fokus der
      Konzepterstellung.
    </Paragraph>
    <Paragraph>
      Finanziert wird diese Kooperation durch die{' '}
      <Link href="https://www.fona.de/de/massnahmen/foerdermassnahmen/mobilitaet-in-der-stadt.php">
        „MobilitätsWerkStadt 2025“
      </Link>{' '}
      des Bundesministeriums für Forschung und Entwicklung. Eine wichtige
      Grundlage für Projekt bildete auch die Vorarbeit der lokalen{' '}
      <Link href="https://www.radnetz-lds.de/">
        Initiative Netzwerk fahrradfreundliches LDS (-Nord)
      </Link>
      .
    </Paragraph>
    <a href="#about-nudafa" id="about-nudafa" className="internal">
      <Heading as="h3">Über das Projekt NUDAFA</Heading>
    </a>
    <Paragraph>
      Ziel des BMBF-geförderten Forschungsprojektes zur “Nutzerdaten-gestützten
      Planung eines integrierten Fahrradverkehrsnetzes” (NUDAFA) ist es,
      gemeinsam mit den lokalen Akteuren den Radverkehr im Siedlungsraum der
      Gemeinden Eichwalde, Zeuthen und Schulzendorf gezielt zu fördern. Im Fokus
      steht dabei,
    </Paragraph>
    <List ordered>
      <List.Item>
        die Erstellung einer datenbasierten Arbeitsgrundlage,
      </List.Item>
      <List.Item>
        die partizipative Einbindung der zivilgesellschaftlichen Akteure in die
        Konzeption des interkommunalen Radwegenetzes und die Entwicklung von
        Maßnahmen, sowie
      </List.Item>
      <List.Item>
        die Förderung der interkommunalen, transdisziplinären Vernetzung bei der
        Umsetzung von Pilotprojekten.
      </List.Item>
    </List>
    <Paragraph>
      Im Sinne transformativer Wissenschaft werden dabei neue Mechanismen für
      einen umsetzungsorientierten Planungs- und Beteiligungsprozess zur
      Förderung des Radverkehrs entwickelt und erprobt. Dabei soll erforscht
      werden, inwieweit innovative, Open-Source-basierte Datenerhebungs-,
      Visualisierungsmethoden und Partizipationsinstrumente konsensfördernd sein
      können.
    </Paragraph>
    <Paragraph>
      Außerdem werden Grundlagendaten zur Entwicklung der Netzplanung
      aufbereitet. Dadurch wird die Konzepterstellung maßgeblich unterstützt und
      die Netzplanung kann besser an den tatsächlichen Bedarfen der Bürger:innen
      angepasst werden. Neben der Bewertung von räumlichen Parametern, den
      Verkehrsbedingungen sowie den vorhandenen Radverkehrsanlagen werden dabei
      (mit SimRa) auch Aspekte der subjektiven Sicherheit und des Fahrkomforts
      integriert. Das Ergebnis der Klassifizierung wird in Form einer
      interaktiven Karte dargestellt und auf dieser Seite veröffentlicht.
    </Paragraph>
    <Paragraph>
      Für 2021 ist die Fortführung des NUDAFA-Projekts in einem
      transdisziplinären Reallabor vorgesehen, u.a. mit Beteiligung der TH
      Wildau (Stiftungsprofessur Radverkehr), der TU Berlin (FG Mobile Cloud
      Computing, FG Integrierte Verkehrsplanung), FixMyCity, den Gemeinden
      Zeuthen, Eichwalde und Schulzendorf sowie den Partnerkommunen Wildau,
      Schönefeld und Königs Wusterhausen. Hinzu kommen weitere Akteure wie die
      lokalen Initiativen Netzwerk fahrradfreundliches LDS (-Nord)und Bike2BER,
      und weitere Projektpartner wie der KJV e.V., isicargo usw.
    </Paragraph>
    <a href="zesplus-netzwerk" id="zesplus-netzwerk" className="internal">
      <Heading as="h3">Die Projektpartner / Kooperationspartner</Heading>
    </a>
    <List>
      <List.Item>
        <Link href="https://www.th-wildau.de/studieren-weiterbilden/studiengaenge/radverkehr-m-eng/projekt-stiftungsprofessur-radverkehr/">
          Stiftungsprofessur Radverkehr in intermodalen Verkehrsnetzen (TH
          Wildau)
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://www.mcc.tu-berlin.de/">
          FG Mobile Cloud Computing (TU Berlin)
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://ivp.tu-berlin.de">
          FG Integrierte Verkehrsplanung (TU Berlin)
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://fixmyberlin.de/">FixMyCity</Link>
      </List.Item>
      <List.Item>
        Die Gemeinden <Link href="https://www.zeuthen.de/">Zeuthen</Link>,{' '}
        <Link href="https://eichwalde.de">Eichwalde</Link> und{' '}
        <Link href="https://www.schulzendorf.de/">Schulzendorf</Link>
      </List.Item>
      <List.Item>
        Die Partnerkommunen <Link href="https://www.wildau.de/">Wildau</Link>,{' '}
        <Link href="https://www.gemeinde-schoenefeld.de/">Schönefeld</Link> und{' '}
        <Link href="https://www.koenigs-wusterhausen.de/">
          Königs Wusterhausen
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://www.radnetz-lds.de/">
          Das Netzwerk fahrradfreundliches LDS (-Nord)
        </Link>
      </List.Item>
      <List.Item>
        <Link href="http://bike2ber.de/">Bike2BER</Link>
      </List.Item>
      <List.Item>
        <Link href="https://www.kjv.de/">
          Der Kinder- und Jugendverein e.V.,{' '}
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://isicargo.de/">isicargo</Link>
      </List.Item>
    </List>
  </>
);

export default SectionAbout;
