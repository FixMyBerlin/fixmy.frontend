import React from 'react';

import { Paragraph, Heading, Button } from '~/components2/Article';

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
    <Button as="a" href="https://example.com" target="_blank">
      Datensatz herunterladen
    </Button>
  </>
);

export default SectionDataset;
