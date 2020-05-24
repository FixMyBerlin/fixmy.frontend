import React from 'react';
import styled from 'styled-components';
import Header from '~/components2/Header';
import config from '~/pages/Gastro/config';
import Wappen1 from '~/images/gastro/wappen.png';
import Wappen2 from '~/images/gastro/wappen@2x.png';

const Wappen = styled.img`
  width: 36px;
`;

const GastroHeader = ({ showInfoLink }) => (
  <Header
    to={config.routes.gastro.landing}
    showInfoLink={showInfoLink}
    logo={
      <Wappen
        src={Wappen2}
        srcSet={`${Wappen1} 450w, ${Wappen2} 750w`}
        alt="Wappen Friedrichshain-Kreuzberg"
      />
    }
  >
    Terrassen für Friedrichshain-Kreuzberg
  </Header>
);

export default GastroHeader;
