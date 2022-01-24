import React from 'react';

import {
  CadastreLegendItemColor,
  CadastreLegendItemImage,
  Header,
  LegendCol,
  LegendItem,
  LegendWrapper,
} from './LegendStyles';
import FootwaysLegendImage from './footways.png';

const CadastreLegendGrid = (props) => (
  <LegendWrapper {...props}>
    <LegendCol>
      <Header>Unfallkategorie</Header>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#b8d09f" />
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemImage imageUrl={FootwaysLegendImage} />
        Gehwege
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#dad7c3" />
        Gehwegüberfahrt
      </LegendItem>
    </LegendCol>
    <LegendCol>
      <Header>Unfalltyp</Header>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#e4e2cd" />
        Kleinbauten / Sondernutzung
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#e9d3af" />
        Öffentlicher Platz
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#20927c" />
        Fahrradparken
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#b5a4cc" />
        Wartebereich Haltestelle
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#465e72" />
        Kfz-Parken
      </LegendItem>
    </LegendCol>
  </LegendWrapper>
);

export default CadastreLegendGrid;
