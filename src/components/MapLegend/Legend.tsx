import React from 'react';
import styled from 'styled-components';

import { Link } from '~/components2/Link';
import config from '~/config';
import { media } from '~/styles/utils';

import { CadastreLegendGrid, IncidentLegendGrid } from './index';
import { ModalCloseIcon } from '../../components2/ModalCloseIcon';

const BaseWrapper = styled.section`
  background-color: ${config.colors.lightbg};
  color: ${config.colors.darkbg};
  display: flex;
  width: 100%;
  line-height: 1.4;
  border: solid 1px #cccccc;
  border-radius: 1px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
  bottom: 0;
  position: absolute;

  ${media.s`
    padding: 0;
  `}

  ${media.m`
    position: static;
    min-width: 400px;
  `}

  ${media.m`
    bottom: initial;
    position: absolute;
    left: 15px;
    top: 95px;
    width: 40vw;
    max-width: 24em;
    font-size: 1.5625vw;
  `}

  ${media.l`
    font-size: 16px;
  `}

  ${media.xl`
    left: 15px;
    top: 95px;
  `}
`;

const Wrapper = styled(BaseWrapper)`
  display: flex;
  flex-direction: column;
  z-index: 400;
`;

const Header = styled.h1`
  font-size: 1.2em;
  font-weight: 400;
  margin: 0;
  padding-bottom: 0.5em;
  border-bottom: solid 1px #e0e0e0;
  margin-top: 1rem;
`;

const LegendListWrapper = styled.div`
  overflow-y: auto;
  padding: 0.625rem 1.2rem;
  height: calc(100vh - 100px);
  min-width: 100vw;

  ${media.m`
    min-width: 100%;
    height: calc(100vh - 230px);
  `}
`;

export const MutedText = styled.div`
  color: ${config.colors.midgrey};
  font-size: 0.9rem;
  margin: 0.5rem 0 1.5rem 0;
`;

const Legend = ({ closeLegend }) => (
  <Wrapper id="Legend">
    <ModalCloseIcon
      onClick={() => closeLegend()}
      controlsId="Legend"
      label="Legende schließen"
      positionRight="25px"
    />
    <LegendListWrapper>
      <Header>Legende Katasterdaten</Header>
      <CadastreLegendGrid />
      <MutedText>Quellen: Fis-Broker Berlin 2014</MutedText>

      <Header>Legende Unfälle</Header>
      <IncidentLegendGrid />
      <Link href="https://de.wikipedia.org/wiki/Unfalltyp">
        Erläuterungen der Unfallkategorien
      </Link>
    </LegendListWrapper>
  </Wrapper>
);

export default Legend;
