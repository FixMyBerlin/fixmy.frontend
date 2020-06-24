import React from 'react';

import { Paragraph, Heading } from '~/components2/Article';
import { AnchorButton } from '~/components2/Button';
import ButtonWrapper from '../components/ButtonWrapper';

const SectionDataset = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Datensatz der Ergebnisse zum Download
    </Heading>
    <Paragraph>
      FixMyCity stellt die Daten offen zur Verfügung (&ldquo;open data&rdquo;),
      unter der Bedingung, dass abgeleitete Werke auch veröffentlicht werden
      (&ldquo;share-alike&rdquo;). Details zur Lizenz können Sie auf den Seiten
      der Open Knowledge Foundation nachlesen. Die Erklärung zu den Spalten in
      dem CSV-Datensatz finden Sie in diesem PDF zu den Spezifikationen. Laden
      Sie sich die Ergebnisse der Umfrage über den folgenden Button als
      CSV-Datensatz herunter.
    </Paragraph>
    <ButtonWrapper>
      <AnchorButton flat>Datensatz herunterladen</AnchorButton>
    </ButtonWrapper>
  </>
);

export default SectionDataset;
