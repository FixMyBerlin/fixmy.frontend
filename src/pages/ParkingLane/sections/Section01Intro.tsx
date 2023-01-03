import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { FaceQuote } from '~/components2/Article/Quote';
import { InsertImage } from '~/components2/Image';
import { AnchorLink } from '~/components2/Link';
import ImgFelixWeisbrich from '../assets/felix-weisbrich-circle.jpg';
import MapParkingLanes from '../assets/map-parking-lanes.jpg';
import MapParkingLanes2x from '../assets/map-parking-lanes@2x.jpg';
import MapParkingLanes3x from '../assets/map-parking-lanes@3x.jpg';
import { NewsletterBox } from '../components/NewsletterBox';

export const Section01Intro: React.FC<SectionProps> = ({ toc }) => (
  <>
    <Paragraph>
      Bisher gibt es nur unvollständige, veraltete und digital nicht nutzbare
      Daten zu Kfz-Parkraum im Bezirk (und in ganz Berlin). Auch bei anderen
      Daten z.B. zu Radinfrastruktur sieht es ähnlich aus. Dabei sind diese
      Daten wichtig für die Planung und Umsetzung der Verkehrswende und die
      klimaresiliente Nutzung des Öffentlichen Raums. Parkraumdaten sind z.B.
      sehr hilfreich um Auswertungen zur Flächengerechtigkeit zu erstellen und
      die unterschiedlichen Bedarfe von Fuß, Rad, ÖPNV und Autoverkehr besser in
      Abgleich zu bringen. Ebenso helfen sie bei der systematischen
      Radwegeanalyse und -planung. Denn dort wo Kfz-Parkflächen vorhanden sind,
      drohen Radfahrende zwischen zwei Konfliktbereichen – fließender und
      ruhender Verkehr – eingeklemmt zu werden.
    </Paragraph>
    <InsertImage
      src={MapParkingLanes2x}
      srcSet={`${MapParkingLanes} 450w, ${MapParkingLanes2x} 750w, ${MapParkingLanes3x} 1125w`}
      alt="Beispiel für eine Parkraumkarte aus OpenStreetMap für Neukölln."
    />
    <Paragraph>
      <AnchorLink href="https://supaplexosm.github.io/strassenraumkarte-neukoelln/?map=parkingmap#17/52.47935/13.44725">
        Beispiel für eine Parkraumkarte
      </AnchorLink>
      : Wenn gute Parkraumdaten vorliegen, können planerische Entscheidung
      datenbasiert getroffen werden. Zum Beispiel kann bei Planung von Radrouten
      schnell ermittelt werden, wie viel Parkraum bei der Führung als
      Radfahrstreifen an der Hauptstraße oder als Fahrradstraße in Nebenstraßen
      entfallen würden. Auch für die Umnutzung von Parkplätzen, z.B. für neue
      Plätze oder breitere Fußwege in Wohngebieten kann besser abgewogen werden.
    </Paragraph>
    <Heading as="h2" toc={toc}>
      Community erfasst Daten zu Parkraum – das Bezirksamt prüft und wertet aus.
    </Heading>
    <Paragraph>
      Um das Problem der fehlenden Daten systematisch anzugehen, setzt das
      Bezirksamt in diesem Pionierprojekt auf einen kokreativen Ansatz zwischen
      engagierter Zivilgesellschaft und Verwaltung.
    </Paragraph>
    <Paragraph>
      Engagierte Bürger:innen sind aufgefordert in diesem Projekt die Daten
      systematisch in OpenStreetMap (OSM) zu erfassen, das Straßen- und
      Grünflächenamt prüft die Daten und übernimmt diese anschließend als
      exportierten Datensatz. Dieser Prozess läuft in Feedback-Schleifen, so das
      die Daten immer detaillierter werden und gleichzeitig aktuell bleiben.
      Wenn das Projekt erfolgreich läuft, soll es auf weitere Datenbereiche, wie
      z.B. Radinfrastruktur und weitere Bezirke ausgeweitet werden.
    </Paragraph>
    <FaceQuote
      image={<img alt="Portrait Felix Weisbrich" src={ImgFelixWeisbrich} />}
      sourceName="Felix Weisbrich"
      sourceFunction="Leiter des Straßen- und Grünflächenamtes Friedrichshain-Kreuzberg"
    >
      Die Verkehrswende ist eine Teamaufgabe, helfen Sie uns gute und aktuelle
      Daten zu erfassen. Dadurch können wir unsere Arbeit besser und schneller
      erledigen.
    </FaceQuote>
    <NewsletterBox />
  </>
);
