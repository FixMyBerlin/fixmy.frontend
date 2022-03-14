import React from 'react';
import {
  Details,
  Heading,
  Paragraph,
  SectionProps,
  Image,
} from '~/components2/Article';
import { MapPlaceholder } from '../components/MapPlaceholder/MapPlaceholder';
import ImagePlaceholder from '../forschungsprojekt/images/research-2.jpg';

export const SectionCurrent = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Ist-Zustand Radinfrastruktur
    </Heading>
    <Paragraph>
      Um bei der Netzplanung vorhandene Radinfrastruktur zu berücksichtigen und
      Ausbaupotentiale zu ermitteln, wurden in OSM erfasste Radinfrastrukturen
      extrahiert und auf der Karte dargestellt. Es wird dafür alle
      Radinfrastruktur (inkl. gemeinsame Führung mit dem Fußverkehr, exkl.
      Führung im Kfz-Mischverkehr), berücksichtigt. In der Karte werden diese,
      soweit in OSM erfasst, beidseitig dargestellt. Die Führungsformen werden
      in drei Gruppen unterschieden:
    </Paragraph>
    <Details summary="Separate Radinfrastruktur ">
      ausschließlich durch Radfahrende zu nutzende Wege, z.B. getrennter Radweg
      im Seitenraum, Radfahrstreifen...
    </Details>
    <Details summary="Gemeinsame Führung mit dem Fußverkehr">
      Nutzung gemeinsam mit dem Fußverkehr, z.B. Gehweg – Radfahrende frei
    </Details>
    <Details summary="WoVerkehrsberuhigte Bereichehnstraßen">
      z.B. Spielstraßen
    </Details>
    <MapPlaceholder alt="Platzhalter Karte" />

    <Heading as="h3">Ist-Zustand Oberflächen</Heading>
    <Paragraph>
      Im nächsten Schritt wurden alle in OSM vorhandenen Oberflächen extrahiert
      und ausgewertet. Zur Übersetzung der OSM Tags in die fünf Werte:
      <strong>Sehr gut, gut, mittel, schlecht und sehr schlecht</strong> wurde
      folgende Tabelle verwendet. Da der OSM Tag für Oberflächen noch nicht sehr
      verbreitet genutzt wird, wurden hier gezielt in Zusammenarbeit mit
      Bürger:innen vor Ort die OSM-Daten zu diesem Tag ergänzt. Für die
      Netzplanung sind vor allem die Straßen mit schlechter oder sehr schlechter
      Oberfläche interessant, weshalb zur anschließenden Verwendung ein Layer
      ausschließlich mit diesen Werten erstellt wurde. So können
      Kopfsteinpflaster-Straßen gut erkannt werden, die für eine spätere
      Umsetzung besonderen Anforderungen unterliegen.
    </Paragraph>
    <Image source={ImagePlaceholder} alt="Karte des Betrachtungsgebietes" />

    <Heading as="h3">Themenkarte 3 Ist-Zustand Infrastruktur</Heading>
    <MapPlaceholder alt="Platzhalter Karte" />
  </>
);
