import React from 'react';
import Header from '~/components2/Header';
import config from '~/pages/Gastro/config';

const GastroHeader = ({ showInfoLink }) => (
  <Header to={config.routes.gastro.landing} showInfoLink={showInfoLink}>
    Gastro Sonderflächen für Friedrichshain-Kreuzberg
  </Header>
);

export default GastroHeader;
