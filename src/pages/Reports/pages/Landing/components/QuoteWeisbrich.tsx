import React from 'react';
import ImgFelixWeisbrich from '~/images/reports/felix-weisbrich-circle.jpg';
import { FaceQuote } from '~/components2/Article/Quote';

export const QuoteWeisbrich = () => (
  <FaceQuote
    image={<img src={ImgFelixWeisbrich} alt="Portrait Felix Weisbrich" />}
    sourceName="Felix Weisbrich"
    sourceFunction="Leiter des Straßen- und Grünflächenamtes Friedrichshain-Kreuzberg"
  >
    Wir wollen Friedrichshain-Kreuzberg zusammen mit den Bürger:innen zu einem
    fahrradfreundlichen Bezirk machen. Ihre Meldungen helfen uns dabei, noch
    schneller zu werden.
  </FaceQuote>
);
