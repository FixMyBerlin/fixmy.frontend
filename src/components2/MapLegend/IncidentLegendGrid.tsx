import React from 'react';

import {
  CadastreLegendItemColor,
  CadastreLegendItemImage,
  CadastreLegendItemPoint,
  CadastreLegendItemPointSmall,
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
        <CadastreLegendItemPoint innerColor="#ffffff" borderColor="#cf0a7d" />
        Unfälle mit Getöteten
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemPoint innerColor="#ffffff" borderColor="#c01d1d" />
        Unfälle mit Schwerverletzten
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemPoint innerColor="#ffffff" borderColor="#f08141" />
        Unfälle mit Leichtverletzten
      </LegendItem>
    </LegendCol>
    <LegendCol>
      <Header>Unfalltyp</Header>
      <LegendItem>
        <CadastreLegendItemPoint innerColor="#108a51" borderColor="#ffffff" />
        Fahrunfall
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemPoint innerColor="#fcfa00" borderColor="#ffffff" />
        Abbiege-Unfall
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemPoint innerColor="#f5473e" borderColor="#ffffff" />
        Einbiegen / Kreuzen-Unfall
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemPoint innerColor="#ffffff" borderColor="#ffffff" />
        Überschreitenunfall
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemPoint innerColor="#0087d9" borderColor="#ffffff" />
        Unfall durch ruhenden Verkehr
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemPoint innerColor="#f8a924" borderColor="#ffffff" />
        Unfall im Längsverkehr
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemPoint innerColor="#3f4948" borderColor="#ffffff" />
        Sonsiger Unfall
      </LegendItem>
    </LegendCol>
  </LegendWrapper>
);

export default CadastreLegendGrid;
