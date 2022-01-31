import React from 'react';
import styled from 'styled-components';

import config from '~/config';
import { media } from '~/styles/utils';

type LegendItemPointInner = {
  borderColor: string;
  innerColor: string;
};

export const LegendWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  ${media.s`
    flex-direction: row;
  `}
`;

export const Header = styled.h2`
  font-size: 0.9rem;
  flex-basis: 100%;
`;

export const HeaderCol = styled(Header)`
  flex-basis: max-content;
`;

export const LegendCol = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 10px;
`;

export const LegendItem = styled.div`
  align-items: center;
  color: ${config.colors.darkbg};
  display: flex;
  flex-direction: row;
  font-size: 0.9em;
  line-height: 1.16;
  height: 2.2rem;

  & img {
    margin-right: 10px;
  }
`;

export const CadastreLegendItem = styled.span`
  min-width: 27px;
  height: 18px;
  margin: 5px 10px 5px 0;
  display: flex;

  ${media.s`
    margin: 7px 20px 6px 0;
  `}
`;

export const CadastreLegendItemColor = styled(CadastreLegendItem)<{
  legendColor: string;
}>`
  background: ${(props) => props.legendColor};
`;

const CadastreLegendItemPointInner = styled.div<LegendItemPointInner>`
  border: solid 2px ${(props) => props.borderColor};
  background-color: ${(props) => props.innerColor};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: auto;
`;

export const CadastreLegendItemPoint = (
  props: LegendItemPointInner
): JSX.Element => (
  <CadastreLegendItem>
    <CadastreLegendItemPointInner {...props} />
  </CadastreLegendItem>
);

const CadastreLegendItemPointSmallInner = styled.div<{
  color: string;
}>`
  background-color: ${(props) => props.color};
  width: 2px;
  height: 2px;
  margin: 3px 17px 3px 0;
  border-radius: 50%;
  margin: auto;
`;

export const CadastreLegendItemPointSmall = (props) => (
  <CadastreLegendItem>
    <CadastreLegendItemPointSmallInner {...props} />
  </CadastreLegendItem>
);

export const CadastreLegendItemLine = styled(CadastreLegendItem)<{
  color: string;
}>`
  background-color: ${(props) => props.color};
  width: 2px;
  height: 2px;
  margin: 3px 17px 3px 0;
`;

export const CadastreLegendItemImage = styled(CadastreLegendItem)<{
  imageUrl: string;
}>`
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: contain;
`;
