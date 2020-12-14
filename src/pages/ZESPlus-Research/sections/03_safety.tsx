import React from 'react';
import { Heading, Paragraph2Cols, SectionProps } from '~/components2/Article';

import MapSafety from '../components/MapSafety';

const SectionSafety = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Auswertung der Sicherheit
    </Heading>
    <Paragraph2Cols>
      Zunächst wurde Aspekte der Sicherheit für Radfahrende betrachtet. In der
      interaktien Karte sehen Sie eine gemeinsame Darstellung von Unfallpunkten
      und solchen Situationen, die als Beinahe-Unfälle über die SimRa-App
      identifiziert wurden. Blau hinterlgegt sind Orte an denen Schüler:innen
      angaben, sich auf ihrem Schulweg mit dem Fahrrad unsicher zu fühlen. Die
      dünen blauen Linien zeigen generell Strecken, die viel als Schulweg
      genutzt werden. Es zeigt sich hier hoher Handlungsbedarf, in den
      Beriechen…
    </Paragraph2Cols>
    <MapSafety />
  </>
);

export default SectionSafety;
