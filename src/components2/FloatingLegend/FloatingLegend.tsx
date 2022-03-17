import React from 'react';
import styled from 'styled-components';
import { ClosePanelButton } from '~/components2/ClosePanelButton';
import config from '~/config';
import { media } from '~/styles/utils';

const FloatingWrapper = styled.section`
  background-color: ${config.colors.lightbg};
  color: ${config.colors.darkbg};
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 1.4;
  border: solid 1px #cccccc;
  border-radius: 1px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
  bottom: 0;
  position: absolute;
  z-index: 700;

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

const IconWrapper = styled.div`
  ${media.m`
    display: none;
  `}
`;

export type FloatingLegendProps = {
  visible: boolean;
  closeLegend: () => void;
  closeLegendStyle?: React.CSSProperties;
  style?: React.CSSProperties;
};

export const FloatingLegend: React.FC<FloatingLegendProps> = ({
  visible,
  closeLegend,
  closeLegendStyle,
  style,
  children,
}) => {
  if (!visible) return null;

  return (
    <FloatingWrapper id="Legend" style={style}>
      <IconWrapper>
        <ClosePanelButton
          onClick={() => closeLegend()}
          controlsId="Legend"
          label="Legende schließen"
          style={closeLegendStyle}
        />
      </IconWrapper>
      <LegendListWrapper>{children}</LegendListWrapper>
    </FloatingWrapper>
  );
};
