import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import Link from '~/components2/Link';

const SectionDataset = ({ toc, tocAnchor }: SectionProps) => (
  <>
    <Heading as="h2" toc={toc} tocAnchor={tocAnchor}>
      <FormattedMessage
        id="research.04_dataset.heading"
        defaultMessage="Datensatz der Ergebnisse zum Download"
      />
    </Heading>
    <Paragraph>
      <FormattedMessage
        id="research.04_dataset.p1"
        defaultMessage='FixMyCity stellt die Daten offen zur Verfügung ("open data"), unter der Bedingung, dass abgeleitete Werke auch veröffentlicht werden ("share-alike"). Details zur Lizenz können Sie auf den Seiten der {linkLicense} nachlesen. Die Erklärung zu den Spalten in dem JSON-Datensatz finden Sie in {linkSpec}.'
        values={{
          linkLicense: (
            <Link href="https://www.opendatacommons.org/licenses/odbl/summary/index.html">
              <FormattedMessage
                id="research.04_dataset.p1.linkLicense"
                defaultMessage="Open Knowledge Foundation"
              />
            </Link>
          ),
          linkSpec: (
            <Link href="/uploads/kataster-ki/Spezifikation_Ausgabeformat_des_Strassenchecks.pdf">
              <FormattedMessage
                id="research.04_dataset.p1.linkSpec"
                defaultMessage="diesem PDF zu den Spezifikationen"
              />
            </Link>
          )
        }}
      />
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.04_dataset.p2"
        defaultMessage="Unter folgendem Link gelangen Sie zu den {linkResults}, die sie dort Einsehen und Herunterladen können."
        values={{
          linkResults: (
            <Link href="https://raw.githubusercontent.com/FixMyBerlin/fixmy.data/master/SurveyResults_200414.json">
              <FormattedMessage
                id="research.04_dataset.p2.linkResults"
                defaultMessage="Ergebnissen der Umfrage als JSON-Datensatz"
              />
            </Link>
          )
        }}
      />
    </Paragraph>
  </>
);

export default SectionDataset;
