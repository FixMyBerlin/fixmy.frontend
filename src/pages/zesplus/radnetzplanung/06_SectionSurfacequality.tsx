import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { MapSurfacequality } from './components/Maps';

export const SectionSurfacequality = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Komfort &amp; Qualität
    </Heading>
    <Paragraph>
      Die “Themenkarte <strong>Komfort & Qualität</strong>” bildet ab, wie gut
      sich die vorhandenen Straßen und Wege mit dem Rad befahren lassen. Dies
      ist für die Entwicklung des Netzes und die daran anschließende Entwicklung
      von Maßnahmen entscheidend. Daher werden in dieser Karte die Oberflächen
      aller Fahrbahnen (inkl. separate Radinfrastruktur) dargestellt. Die
      Bewertung ergibt sich dabei aus einer Kombination der Bewertung der
      Oberflächenqualität (gut bzw. schlecht) und aus der Beschreibung des
      Oberflächentyps (Deckschicht, bspw. Kopfsteinpflaster).
    </Paragraph>

    <MapSurfacequality />
  </>
);
