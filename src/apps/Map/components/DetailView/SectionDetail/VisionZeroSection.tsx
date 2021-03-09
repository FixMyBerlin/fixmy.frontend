import React from 'react';
import styled from 'styled-components';

import { HBIData } from '~/apps/Map/MapState';
import config from '~/config';

const Container = styled.section`
  padding: 0 1em 1em 1em;
  border-bottom: 1px dashed #c6c6c6;

  h2 {
    font-size: 1.17em;
  }
`;

const DataTable = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    align-items: center;
    display: flex;
    flex-direction: row;
    padding: 0.5em 0;
  }

  li + li {
    border-top: 1px solid #c6c6c6;
  }
`;

const Value = styled.span<{ color: string }>`
  align-items: center;
  border-radius: 100%;
  border: ${({ color }) => `2px solid ${color}`};
  display: flex;
  height: 30px;
  justify-content: center;
  margin-right: 10px;
  width: 30px;
`;

const Sources = styled.p`
  color: ${config.colors.darkgrey};
  font-size: 12px;
  line-height: 1.4;
`;

type Props = {
  accidents: HBIData['accidents'][number];
};

export const VisionZeroSection = ({ accidents }: Props) => (
  <Container>
    <h2>Fahrrad-Unfälle an diesem Knotenpunkt</h2>
    <DataTable>
      <li>
        <Value color="#cf0a7d">{accidents.killed}</Value>
        Unfälle mit Getöteten
      </li>
      <li>
        <Value color="#c01d1d">{accidents.severely_injured}</Value>
        Unfälle mit Schwerverletzten
      </li>
      <li>
        <Value color="#f08141">{accidents.slightly_injured}</Value>
        Unfälle mit Leichtverletzten
      </li>
    </DataTable>
    <Sources>Quellen: {accidents.source}</Sources>
  </Container>
);
