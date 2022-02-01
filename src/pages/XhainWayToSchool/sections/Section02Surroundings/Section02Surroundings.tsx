import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { Map02Surroundings } from './Map02Surroundings';

export const Section02Surroundings: React.FC<SectionProps> = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Die Verkehrssicherheit um die Schulstandorte
    </Heading>
    <Paragraph>
      Direkt vor den Grundschulen treten besonders häufig gefährliche
      Verkehrssituationen auf. Wir betrachten daher in dieser zweiten Karte die
      Situation an den Schulstandorten.
    </Paragraph>
    <Paragraph>
      Von den 42 Grundschulen im Bezirk liegen sieben an Hauptstraßen. An den
      meisten dieser Standorte gibt es bereits Tempo-30-Zonen vor der Schule, um
      die Verkehrssicherheit zu erhöhen. Das Straßen- und Grünflächenamt prüft,
      wo weitere Tempo-30-Zonen notwendig sind oder die vorhandenen ausgeweitet
      werden müssen.
    </Paragraph>
    <Paragraph>
      Bei Schulstandorten in Nebenstraßen gilt überall vor der Schule eine
      maximal zulässige Geschwindigkeit von 30 km/h. In einigen Wohngebieten
      sind zudem niedrigere Höchstgeschwindigkeiten von 5, 10 oder 20 km/h
      festgelegt, da diese als verkehrsberuhigte Bereiche ausgewiesen sind. Wo
      dies der Fall ist, lässt sich in der Karte erkennen.
    </Paragraph>
    <Paragraph>
      Um die Sicherheit vor den Schulen zu erhöhen, sollen weitere Maßnahmen
      umgesetzt werden. Möglichkeiten wären z.B. Temporeduzierungen,
      verkehrsberuhigende Maßnahmen (z.B. Fahrbahnverengung, Aufpflasterung)
      oder die Einrichtung von Schulstraßen (Freigabe der Straße nur für Fuß-
      und Radverkehr zu bestimmten Uhrzeiten). Je nach Straßenkategorie
      (Hauptstraße/ Nebenstraße) sind die rechtlichen und planerischen
      Möglichkeiten für Maßnahmen sehr unterschiedlich. In weiteren
      Untersuchungen sollen daher zudem Kfz-Verkehrsmengen und die Einhaltung
      der Tempolimits erfasst werden, um darauf aufbauend besser weitere
      Maßnahmen prüfen zu können.
    </Paragraph>
    <Heading as="h3">
      Karte 2: Schulstandorte an Haupt- und Nebenstraßen mit zulässigen
      Höchst&shy;geschwindigkeiten
    </Heading>
    <Paragraph>
      <i>
        Hinweis: Um in der Karte Details anzusehen, klicken Sie auf “Karte
        aktivieren”. Dann können Sie die Karte bewegen sowie rein- und
        rauszoomen.
      </i>
    </Paragraph>
    <Map02Surroundings />
  </>
);
