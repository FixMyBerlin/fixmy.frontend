import React from 'react';
import ConstructionLegendImage from './assets/construction.png';
import DividersLegendImage from './assets/dividers.png';
import FootwaysLegendImage from './assets/footways.png';
import GuardrailLegendImage from './assets/guardrail-legend.png';
import {
  CadastreLegendItemColor,
  CadastreLegendItemImage,
  CadastreLegendItemLine,
  CadastreLegendItemPoint,
  CadastreLegendItemPointSmall,
  Header,
  LegendCol,
  LegendItem,
  LegendWrapper,
} from './Styles';

export const CadastreLegendGrid = () => (
  <LegendWrapper>
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
        <CadastreLegendItemPointSmall color="red" />
        Poller
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemPoint innerColor="#777777" borderColor="white" />
        Lichtsignalanlage
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemColor legendColor="#f6be6a" />
        Treppe
      </LegendItem>
    </LegendCol>
    <LegendCol>
      <LegendItem>
        <CadastreLegendItemLine color="red" />
        Sicherheitsgitter / Leitplanke
      </LegendItem>
      <LegendItem>
        <CadastreLegendItemImage imageUrl={GuardrailLegendImage} />
        Leitmarkierung Sehbehinderte
      </LegendItem>
    </LegendCol>
  </LegendWrapper>
);
