import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { InsertImage } from '~/components2/Image';
import { AnchorLink } from '~/components2/Link';
import ImgDebugMapParking from '../assets/debug-map-parking.png';

export const Section04Mapping: React.FC<SectionProps> = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Wie genau werden die Daten erfasst?
    </Heading>
    <InsertImage
      src={ImgDebugMapParking}
      alt="Karte zeigt das Subtraktive Modell zur Erfassung der Daten in OpenStreetMap"
    />
    <Paragraph>
      Wir arbeiten bei der Erfassung nach einem “subtraktiven Verfahren”. D.h.
      es wird zunächst für alle Straßen erfasst, ob überhaupt geparkt werden
      darf und in welcher Ausrichtung. Dann werden weitere Daten herangezogen
      bzw. gemappt: Wo ist kein Parken erlaubt ist, wo gibt es z.B.
      freizuhaltende Einfahrten oder Haltestellen? Diese Daten werden verrechnet
      und an den Bezirksgrenzen “ausgeschnitten” um eine präzise Abbildung des
      verfügbaren Parkraum zu erreichen. Dieses Verfahren wurde von OSM-Mapper
      Alex im Ortsteil Neukölln entwickelt und erprobt. In seinem{' '}
      <AnchorLink href="https://supaplex osm.github.io/strassenraumkarte-neukoelln/posts/2021-06-08-vortrag-fossgis">
        Vortrag auf der FOSSGIS 2021 Konferenz beschreibt er Details dazu
      </AnchorLink>
      .
    </Paragraph>
  </>
);
