import React from 'react';
import styled from 'styled-components';

import { Paragraph, Image, Heading, SectionProps } from '~/components2/Article';
import { AnchorButton } from '~/components2/Button';
import Link from '~/components2/Link';
import SimraSrc from '~/images/eichwalde/simra.jpg';
import { media } from '~/styles/utils';

const DownloadWrapper = styled(Paragraph)`
  display: flex;
  flex-wrap: wrap;

  ${media.m`
    margin-top: -2em;
  `}

  a {
    flex-grow: 1;
    max-width: none;
    margin: 10px;
    text-align: center;
  }
`;

const SectionContribute = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Mitmachen - jetzt SimRa-App nutzen!
    </Heading>
    <Paragraph>
      Laden Sie die SimRa-App der TU Berlin auf Ihr Handy und zeichnen Sie Ihre
      Strecken beim Radfahren auf. Damit sammeln Sie wertvolle Daten, die die
      Netzplanung in der Verwaltung unterstützen. Die Aufzeichnung erfolgt unter
      strengen Datenschutzbestimmungen und Sie können die Daten selber nach
      Ihren Wünschen anonymisieren.
    </Paragraph>
    <Paragraph>
      <Link href="https://www.digital-future.berlin/forschung/projekte/simra/">
        Mehr Informationen zum SimRa-Projekt
      </Link>
    </Paragraph>
    <Image source={SimraSrc} alt="Screenshots der SimRa-App" />
    <DownloadWrapper>
      <AnchorButton
        flat
        href="https://play.google.com/store/apps/details?id=de.tuberlin.mcc.simra.app&hl=de"
      >
        App für Android laden
      </AnchorButton>
      <AnchorButton
        flat
        href="https://apps.apple.com/de/app/simra/id1459516968"
      >
        App für iOS laden
      </AnchorButton>
      <AnchorButton
        flat
        ghost
        href="http://www.redaktion.tu-berlin.de/fileadmin/fg344/simra/SimRa.apk"
      >
        App für Android/LineageOS ohne Playstore laden
      </AnchorButton>
    </DownloadWrapper>
  </>
);

export default SectionContribute;
