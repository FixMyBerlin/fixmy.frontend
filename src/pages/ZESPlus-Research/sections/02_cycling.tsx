import React from 'react';
import { Paragraph, Quote, Heading, SectionProps } from '~/components2/Article';

const SectionCycling = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Warum ist der Radverkehr wichtig für die Gemeinden?
    </Heading>
    <Quote long sourceText="Jörg Jenoch, Bürgermeister Eichwalde">
      „Oft sind wir noch auf unsere Autos angewiesen. Doch für Wege innerhalb
      der Gemeinden sollte das Fahrrad das Verkehrsmittel der Wahl werden. Auch
      unsere Kinder sollen auf dem Rad eigenständig und sicher zu ihren
      Freunden, zur Schule, zum Sport oder an die Badewiese kommen. Dafür
      brauchen wir gute Angebote für den Radverkehr, von denen wir letztendlich
      alle profitieren.“
    </Quote>
    <Paragraph>
      Viele Wege innerhalb der drei eng verflochtenen Gemeinden sind kürzer als
      5 km und könnten eigentlich leicht mit dem Fahrrad zurück gelegt werden.
      Verschiedene s.g. Radverkehrsanlagen – Schutzstreifen, Radwege oder für
      den Radverkehr freigegebene Bürgersteige - sind dafür bereits angelegt.
      Gleichzeitig gibt es in jeder der drei Gemeinden aktuell auch noch
      Missstände, die das Radfahren erschweren. Diese sollen durch das Konzept
      behoben werden, sodass das Rad für Alltagswege innerhalb der Gemeinden
      eine noch attraktivere Alternative zum Auto bildet. Dabei ist wichtig,
      Konflikte mit dem Fußverkehr und dem Auto zu vermeiden, um die Sicherheit
      für allen Verkehrsteilnehmer*innen zu erhöhen.
    </Paragraph>
    <Paragraph>
      Bereits jetzt haben Eichwalde, Zeuthen und Schulzendorf ein hohes
      Aufkommen von Pendler*innen zu den Nachbargemeinden, dem BER oder nach
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
  </>
);

export default SectionCycling;
