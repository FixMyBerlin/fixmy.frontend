import React from 'react';
import styled from 'styled-components';
import { ModalCloseIcon } from '~/components2/ModalCloseIcon';
import config from '~/config';
import { media } from '~/styles/utils';

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
    top: 85px;
    width: 40vw;
    max-width: 24em;
    font-size: 1.5625vw;
  `}

  ${media.l`
    font-size: 16px;
  `}

  ${media.xl`
    left: 15px;
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
  margin-top: 1rem;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  padding-bottom: 0.5em;
  border-bottom: solid 1px #e0e0e0;
`;

const LegendListWrapper = styled.div`
  overflow-y: auto;
  padding: 0.625rem 1.2rem 1.2rem 1.2rem;
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

const IconWrapper = styled.div`
  ${media.m`
    display: none;
  `}
`;

type Props = {
  closeLegend: () => void;
};

export const FlyingLegend: React.FC<Props> = ({ closeLegend, children }) => (
  <Wrapper id="Legend">
    <IconWrapper>
      <ModalCloseIcon
        onClick={() => closeLegend()}
        controlsId="Legend"
        label="Legende schließen"
        positionRight="25px"
      />
    </IconWrapper>
    <LegendListWrapper>{children}</LegendListWrapper>
  </Wrapper>
);
