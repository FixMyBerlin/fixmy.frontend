import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import config from '~/config';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { Link } from '~/components2/Link';
import { AnchorButton } from '~/components2/Button';
import ButtonWrapper from '../components/ButtonWrapper';

const DownloadInfo = styled.div`
  font-size: 14px;
  color: ${config.colors.midgrey};
  padding: 0 0 15px 0;
  line-height: 1.4;
  margin-top: 16px;
`;

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
          ),
        }}
      />
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.04_dataset.p2"
        defaultMessage="Laden Sie sich die Ergebnisse der Umfrage über den folgenden Button als
        JSON-Datensatz herunter:"
      />
    </Paragraph>

    <ButtonWrapper>
      <AnchorButton
        flat
        href="https://fmb-aws-bucket.s3.eu-central-1.amazonaws.com/KatasterKI/SurveyResults_200414.json.zip"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FormattedMessage
          id="research.04_dataset.downloadLabel"
          defaultMessage="Datensatz herunterladen"
        />
      </AnchorButton>
      <DownloadInfo>
        <FormattedMessage
          id="research.04_dataset.downloadCaption"
          defaultMessage="(Format: JSON komprimiert (ZIP), Größe: 5,2 MB, Lizenz: ODbL)"
        />
      </DownloadInfo>
    </ButtonWrapper>
  </>
);

export default SectionDataset;
