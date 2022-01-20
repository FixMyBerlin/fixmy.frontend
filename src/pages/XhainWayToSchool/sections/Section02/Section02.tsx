import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';

export const Section02 = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Situation vor den Schulen
    </Heading>
    <Paragraph>
      Direkt vor den Grundschulen treten besonders häufig Konflikte auf. Wir
      betrachten daher in dieser zweiten Karte die Situation an den
      Schulstandorten. 7 der 42 Grundschulen im Bezirk liegen an Hauptstraßen.
      An den meisten dieser Standorte sind bereits Tempo 30 Zone vor der Schule
      eingerichtet. Hier wird geprüft, ob diese ggf. ausgeweitet werden.
      Außerdem sind auf der Karte die Tempolimits zu sehen in allen Nebenstraßen
      gilt Tempo 30, an in einigen Straßen auch Tempor 10 oder 20. In weiteren
      Untersuchungen sollen Kfz-Verkehrsmengen und die EInhaltung der
      Tempolimits erfasst werden um in der folge zu prüfen welche weiteren
      Maßnahmen vor den Schulen zur Erhöhung der Sicherheit vor den Schulen
      umgesetzt werden sollen. Möglichkeiten wären z.B. Temporeduzierungen,
      verkehrsberuhigende Maßnahmen oder Schulstraßen (Freigabe der Straße nur
      für Fuß und Radverkehr zu bestimmten Uhrzeiten. Weiter unten können Sie
      uns schreiben, wenn Sie ihre Schule für eine Schulstraße vorschlagen
      möchten.
    </Paragraph>
    {/* <Map01 /> */}
    <div
      style={{
        height: '300px',
        width: '100%',
        backgroundColor: 'lightpink',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Karte Schulstandorte an Haupt und Nebenstraßen + Tempolimits +
      Hauptstraßenklassen + Schulwege
    </div>
    <Heading as="h3">Fehlende Querungsmöglichkeiten</Heading>
    <Paragraph>
      In der dritten Karte sehen Sie die Kreuzungen im Bezirk wo das
      Schulwegenetz eine hohe Anzahl Schüler*innen aufweist, es aber es keine
      Querungsmöglichkeit gibt. (Große Icons = über 300 Hundert Schulwege;
      kleine Icons = 150-300 Schulwege.) An diesen Orten prüft das Bezirksamt
      mögliche Maßnahmen, wie die Einrichtung von Zebrastreifen oder
      Lichtsignalanlagen (Ampeln) um ein sicheres Queren von Kindern zu
      ermöglichen. Auf der Karte sind außerdem als Heatmap die Unfalldaten zu
      Unfällen mit Fußgänger*innen dargestellt.
    </Paragraph>
    {/* <Map02 /> */}
    <div
      style={{
        height: '300px',
        width: '100%',
        backgroundColor: 'lightpink',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Karte Schulstandorte an Haupt und Nebenstraßen + Tempolimits +
      Hauptstraßenklassen + Schulwege
    </div>
    <small>
      Es wurden die Datensätze von Unfällen mit Personenschaden (von 2018 bis
      2020) aus dem Unfallatlas benutzt. In den Karten werden Unfälle mit
      Fußgängerbeteiligung dargestellt nach Häufigkeiten aggregiert (Heatmap).
    </small>
  </>
);
