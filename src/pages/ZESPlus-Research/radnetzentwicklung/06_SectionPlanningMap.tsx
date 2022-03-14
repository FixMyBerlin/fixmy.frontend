import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import MapPlaceholder from '../components/MapPlaceholder';

export const SectionPlanningMap = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Zusammengeführte Netzplanungskarte
    </Heading>
    <Paragraph>
      Damit die zuvor erläuterten Karten ideal für die Netzplanung betrachtet
      werden können, wurde eine integrierte interaktive Karte erstellt. Diese
      enthält die wesentlichen Daten für die Netzplanung, bei der sich die
      unterschiedlichen Ebenen ein- und ausschalten lassen. In einem Workshop
      wird auf dieser Grundlage das finale Netzkonzept erstellt.
    </Paragraph>

    <Heading as="h3">Themenkarte 5: Interaktive Karte für Netzplanung:</Heading>
    <Paragraph>
      Barrieren + Anschlußpunkte + Ziele + Straßentypen + Radinfra + surface bad
      + vorhandene Netzkonzept
    </Paragraph>
    <MapPlaceholder alt="Platzhalter Karte" />
    <MapPlaceholder alt="Platzhalter Karte" />

    <Heading as="h3">Ergänzend: Anforderungen Verkehrssicherheit</Heading>
    <Paragraph>
      Als ergänzende Karte – insbesondere, um Maßnahmen ergänzen und
      priorisieren zu können – wurde eine Sicherheitskarte erstellt. Für diese
      Karte wurden Unfalldaten ausgewertet und besondere Erfordernisse von
      Schüler:innen erfasst.
    </Paragraph>
    <Heading as="h3">Themenkarte 6: Sicherheit (Gefahrenanalyse):</Heading>
    <MapPlaceholder alt="Platzhalter Karte" />
  </>
);
