import React from 'react';
import { Heading, Image, Paragraph, SectionProps } from '~/components2/Article';
import ImagePlaceholder from '../forschungsprojekt/images/research-2.jpg';

export const SectionAreaOfInteres = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Betrachtungsgebiet
    </Heading>
    <Paragraph>
      Zur Identifikation des Betrachtungsgebietes, wurde um die Zentren der
      sechs Gemeinden ein 10 km Radius gezogen, welcher den entsprechenden
      Planungsraum darstellt. Die sechs Planungsräume wurden anschließend zu
      einem gemeinsamen Betrachtungsgebiet verschnitten. Die Annahme dahinter
      basiert auf der ungefähren Reichweite von E-Bike-Fahrten und entsprechend
      der Planung eines Wegeangebots für zukünftig zu erwartenden Radverkehr.
      Ziel ist die Erhöhung des Modal-Split-Anteils im Radverkehr in den
      Gemeinden. Als zusätzlicher wichtiger Zielpunkt wurde die im Bau
      befindliche Tesla-Fabrik aufgenommen, das zu diesem Ziel viele
      Pendlerverkehre entstehen werden die mit Multimodalen Reisewegen möglichst
      auf Rad und ÖPNV geleitet werden sollen.
    </Paragraph>
    <Image source={ImagePlaceholder} alt="Karte des Betrachtungsgebietes" />
  </>
);
