import React from 'react';
import {
  Heading,
  Paragraph,
  Paragraph2Cols,
  SectionProps,
  ImageMulti,
} from '~/components2/Article';

import MapNetworks from '../components/MapNetworks';
import MapSafety from '../components/MapSafety';

import ImageSpeed from './images/speed@2x.jpg';
import ImageWaitingTimes from './images/wating-times@2x.jpg';

const SectionNetwork = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Die Themenkarten
    </Heading>
    <Paragraph>
      Die Themenkarten fassen jeweils unterschiedliche Informationsebenen
      zusammen. Sie sind eine wichtige Diskussionsgrundlage für die
      Bürgerbeteiligung und die Kommunikation während der Planungs-,
      Beteiligungs- und Umsetzungsprozesse. Die zugrunde liegende Systematik
      wurde im Rahmen des NUDAFA-Projekts zusammen mit FixMyCity entwickelt. Die
      Systematik basiert auf gemeinfrei lizenzierten Daten sowie
      Verarbeitungsmethoden und soll möglichst auch auf andere Kommunen mit
      vergleichbaren Rahmenbedingungen übertragbar sein. Weiteren Themenkarten
      (bspw. zu Handlungsbedarfen an Knotenpunkten) sollen in der Fortführung
      des NUDAFA-Projekts[LINK zu 7b] hinzukommen.
    </Paragraph>

    <Heading as="h3">
      Themenkarte &ldquo;Radinfrastruktur&rdquo;: Komfort & Qualität
    </Heading>
    <Paragraph2Cols>
      Die Themenkarte &ldquo;Radinfrastruktur&rdquo; bildet die vorhandene
      Radinfrastruktur und die Qualität der Wegstrecken ab. Informationen zum
      Vorhandensein der Infrastruktur und zu ihrer Art liefern die eingebundenen
      OSM-Daten. Die Bewertung der Qualität der Wegstrecken erfolgt auf Basis
      der systematischen, sensorbasierten Oberflächenbewertung mit SimRa[LINK ZU
      02a]. Die Informationen beider Datenquellen wurden in Kooperation mit den
      Bürger:innen gesammelt bzw. aktualisiert und können auf diese Weise auch
      aktuell gehalten werden.
    </Paragraph2Cols>
    <MapNetworks />

    <ImageMulti>
      <ImageMulti.Inner
        source={ImageSpeed}
        subtitle="Auswertung der durchschnittlichen Geschwindigkeiten an Streckenabschnitten (Quelle: SimRa TU-Berlin)"
      />

      <ImageMulti.Inner
        source={ImageWaitingTimes}
        subtitle="Auswertung der durchschnittlichen Wartezeiten an Knotenpunkten
          (Quelle: SimRa TU-Berlin)"
      />
    </ImageMulti>

    <Heading as="h3" {...props}>
      Themenkarte &ldquo;Sicherheit&rdquo;: (Beinahe-)Unfälle &
      Sicherheitsempfinden
    </Heading>
    <Paragraph2Cols>
      Diese Themenkarte fasst mehrere Aspekte der objektiven wie auch der
      subjektiven Sicherheit der Radfahrenden zusammen. In der interaktiven
      Karte sind tatsächliche Unfälle verortet, aber Beinahe-Unfälle, die mit
      der SimRa-App identifiziert wurden. Die dünnen blauen Linien zeigen
      Strecken, die von Schüler:innen des Humboldt-Gymnasiums Eichwalde mit dem
      Fahrrad als Schulweg genutzt werden. Auf den Blau [ROT?] hinterlegten
      Abschnitte fühlen sich Schüler:innen nach eigenen Angaben unsicher.
    </Paragraph2Cols>
    <MapSafety />

    <Heading as="h3" {...props}>
      Themenkarte &ldquo;Führungsformen&rdquo;: Typische Straßenquerschnitte und
      Potenziale
    </Heading>
    <Paragraph2Cols>
      Bei der Analyse des Ist-Zustandes wurde überprüft, inwieweit OSM-Daten
      nutzbar sind und welche Analyseschritte sich mit ihnen automatisieren
      lassen. So wurde eine Systematik entwickelt, mit der die in den Gemeinden
      typischerweise vorhandenen Straßentypen bzw. Straßenquerschnitte anhand
      der OSM-Daten verortet werden können. Anhand der definierten Typen sich
      die jeweils möglichen Führungsformen nachvollziehbar zuordnen bzw.
      zuweisen. In der Übersichtstabelle werden für die einzelnen Führungsformen
      parallel Mindestbreiten und Rahmenbedingungen festlegt, die örtlichen
      Gegebenheiten (evtl. nicht der ERA) entsprechen. Auf Basis der lokalen
      Gegebenheiten unterstützt diese Herangehensweise die strukturierte
      Entwicklung eines zukunftsfähigen Radverkehrsnetzes und im Anschluss das
      Zuweisen entsprechender Verbindungsfunktion (nach RIN). <br />
      Die Karten sowie die Übersicht der Straßentypen befindet sich aktuell noch
      in der Entwicklung. Sobald diese abgeschlossen wurden, werden sie hier
      veröffentlicht.
    </Paragraph2Cols>
    <MapNetworks />
  </>
);

export default SectionNetwork;
