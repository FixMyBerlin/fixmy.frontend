import React from 'react';

import {
  CadastreLegendItemColor,
  CadastreLegendItemImage,
  Header,
  LegendCol,
  LegendItem,
  LegendWrapper,
} from './LegendStyles';
import ConstructionLegendImage from './construction.png';
import DividersLegendImage from './dividers.png';
import FootwaysLegendImage from './footways.png';

const CadastreLegendGrid = (props) => (
  <LegendWrapper {...props}>
    <Header>Flächennutzung</Header>
    <LegendCol>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#b8d09f" />
        Grünfläche / Baumscheibe
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemImage imageUrl={FootwaysLegendImage} />
        Gehwege
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#dad7c3" />
        Gehwegüberfahrt
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#2eccac" />
        Radwege
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#843982" />
        Bushaltestelle
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#a3a3a3" />
        Fahrbahn
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemImage imageUrl={DividersLegendImage} />
        Trennstreifen
      </LegendItem>
    </LegendCol>
    <LegendCol>
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
      <LegendItem>
        <CadastreLegendItemImage imageUrl={ConstructionLegendImage} />
        Baustelle
      </LegendItem>
    </LegendCol>
    <Header>Objekte / Markierungen</Header>
    <LegendCol>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#b8d09f" />
        Poller
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemImage imageUrl={FootwaysLegendImage} />
        Lichtsignalanlage
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemImage imageUrl={DividersLegendImage} />
        Treppe
      </LegendItem>
    </LegendCol>
    <LegendCol>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#e4e2cd" />
        Sicherheitsgitter / Leitplanke
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemImage imageUrl="" />
        Leitmarkierung Sehbehinderte
      </LegendItem>
    </LegendCol>
  </LegendWrapper>
);

export default CadastreLegendGrid;
