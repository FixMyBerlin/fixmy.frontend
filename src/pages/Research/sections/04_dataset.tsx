import React from 'react';

import styled from 'styled-components';
import { Paragraph, Heading } from '~/components2/Article';
import { AnchorButton } from '~/components2/Button';
import ButtonWrapper from '../components/ButtonWrapper';
import QuestionInfo from '../../KatasterKI/components/QuestionInfo';

const DownloadInfo = styled(QuestionInfo)`
  margin-top: 16px;
`;

const SectionDataset = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Datensatz der Ergebnisse zum Download
    </Heading>
    <Paragraph>
      FixMyCity stellt die Daten offen zur Verfügung (&ldquo;open data&rdquo;),
      unter der Bedingung, dass abgeleitete Werke auch veröffentlicht werden
      (&ldquo;share-alike&rdquo;). Details zur Lizenz können Sie auf den Seiten
      der <a
        href="https://www.opendatacommons.org/licenses/odbl/summary/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >Open Knowledge Foundation
      </a> nachlesen. Die Erklärung zu den Spalten in
      dem CSV-Datensatz finden Sie in <a
        href="/uploads/kataster-ki/Spezifikation_Ausgabeformat_des_Strassenchecks.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >diesem PDF zu den Spezifikationen</a>.
      Laden Sie sich die Ergebnisse der Umfrage über den folgenden Button als
      CSV-Datensatz herunter.
    </Paragraph>
    <ButtonWrapper>
      <AnchorButton
        flat
        href="https://drive.google.com/file/d/1FPl3-_Tfl_lgpS5Z4TXJSWTToRTBX4r9/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >Datensatz herunterladen</AnchorButton>
     <DownloadInfo>
       (Format: JSON, Größe: ~41 MB,Format: ODbL)
     </DownloadInfo>
    </ButtonWrapper>
  </>
);

export default SectionDataset;
