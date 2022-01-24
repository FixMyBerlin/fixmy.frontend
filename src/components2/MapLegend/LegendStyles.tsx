import styled from 'styled-components';

import config from '~/config';

export const LegendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 20px;
`;

export const Header = styled.h2`
  font-size: 0.9rem;
  flex-basis: 100%;
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
  margin: 7px 20px 6px 0;
`;

export const CadastreLegendItemColor = styled(CadastreLegendItem)<{
  legendColor: string;
}>`
  background: ${(props) => props.legendColor};
`;

export const CadastreLegendItemPoint= styled(CadastreLegendItem)<{
  borderColor: string;
  innerColor: string;
}>`
  border: solid 2px ${(props) => props.borderColor};
  background-color: ${(props) => props.innerColor};
  width: 8px;
  height: 8px;
  margin: 3px 17px 3px 0;
`;

export const CadastreLegendItemImage = styled(CadastreLegendItem)<{
  imageUrl: string;
}>`
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: contain;
`;
