import React from 'react';

import { Paragraph, Heading, SectionProps } from '~/components2/Article';

const SectionAbout = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Über das Projekt NUDAFA
    </Heading>
    <Paragraph>
      Um den Radverkehr in den Gemeinden Eichwalde, Zeuthen und Schulzendorf zu
      stärken, soll ein integriertes Radverkehrsnetz entwickelt werden. Ziel des
      BMBF-geförderten Forschungsprojektes zur “Nutzerdaten-gestützten Planung
      eines integrierten Fahrradverkehrsnetzes” (NUDAFA) ist es, gemeinsam mit
      den lokalen Akteuren die Eignung des Straßennetzes im Siedlungsraum der
      Gemeinden Eichwalde, Zeuthen und Schulzendorf zu klassifizieren. Außerdem
      werden Grundlagendaten zur Entwicklung der Netzplanung aufbereitet.
      Dadurch wird die Konzepterstellung maßgeblich unterstützt und die
      Netzplanung kann besser an den tatsächlichen Bedarfen der Bürger*innen
      angepasst werden. Neben der Bewertung von räumlichen Parametern, der
      Verkehrsbedingungen sowie der vorhandenen Radverkehrsanlagen werden dabei
      (mit SimRa) auch Aspekte der subjektiven Sicherheit und des Fahrkomforts
      integriert. Das Ergebnis der Klassifizierung wird in Form einer
      interaktiven Karte dargestellt und auf dieser Seite veröffentlicht.
    </Paragraph>
  </>
);

export default SectionAbout;
