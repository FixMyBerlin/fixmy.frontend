import React from 'react';
import { Heading, Paragraph } from '~/components2/Article';
import Link from '~/components2/Link';

const SectionDataset = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Datensatz der Ergebnisse zum Download
    </Heading>
    <Paragraph>
      FixMyCity stellt die Daten offen zur Verfügung (&ldquo;open data&rdquo;),
      unter der Bedingung, dass abgeleitete Werke auch veröffentlicht werden
      (&ldquo;share-alike&rdquo;). Details zur Lizenz können Sie auf den Seiten
      der <Link
      href="https://www.opendatacommons.org/licenses/odbl/summary/index.html"
      >Open Knowledge Foundation
      </Link> nachlesen.
    </Paragraph>
    <Paragraph>Die Erklärung zu den Spalten in
      dem JSON-Datensatz finden Sie in <Link
        href="/uploads/kataster-ki/Spezifikation_Ausgabeformat_des_Strassenchecks.pdf"
      >diesem PDF zu den Spezifikationen</Link>.
    </Paragraph>
    <Paragraph>
      Unter folgendem Link gelangen Sie zu den <Link
      href="https://raw.githubusercontent.com/FixMyBerlin/fixmy.data/master/SurveyResults_200414.json"
    >Ergebnissen der Umfrage als JSON-Datensatz</Link>, die sie dort Einsehen und Herunterladen können.
    </Paragraph>
  </>
);

export default SectionDataset;
