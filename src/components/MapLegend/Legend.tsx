import React from 'react';
import styled from 'styled-components';
import { AnchorLink } from '~/components2/Link';
import {
  FloatingLegend,
  FloatingLegendProps,
} from '~/components2/FloatingLegend';
import config from '~/config';
import { CadastreLegendGrid, IncidentLegendGrid } from './index';

const Header = styled.h1`
  font-size: 1.2em;
  font-weight: 400;
  margin-top: 1rem;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  padding-bottom: 0.5em;
  border-bottom: solid 1px #e0e0e0;
`;

export const MutedText = styled.div`
  color: ${config.colors.midgrey};
  font-size: 0.9rem;
  margin: 0.5rem 0 1.5rem 0;
`;

const FooterWrapper = styled.div`
  margin-top: 1rem;
`;

type Props = Pick<FloatingLegendProps, 'visible' | 'closeLegend'>;

export const Legend: React.VFC<Props> = ({ visible, closeLegend }) => {
  return (
    <FloatingLegend visible={visible} closeLegend={closeLegend}>
      <Header>Legende Katasterdaten</Header>
      <CadastreLegendGrid />
      <MutedText>Quellen: Fis-Broker Berlin 2014</MutedText>

      <Header>Legende Unfälle</Header>
      <IncidentLegendGrid />

      <FooterWrapper>
        <AnchorLink href="https://de.wikipedia.org/wiki/Unfalltyp">
          Erläuterungen der Unfallkategorien
        </AnchorLink>
      </FooterWrapper>
    </FloatingLegend>
  );
};
