import React from 'react';
import styled from 'styled-components';

import { Paragraph } from '~/components2/Article';
import LogoBMBF from '~/images/eichwalde/logo-bmbf.png';
import LogoBMBF2 from '~/images/eichwalde/logo-bmbf@2x.png';
import LogoBMBF3 from '~/images/eichwalde/logo-bmbf@3x.png';
import LogoFONA from '~/images/eichwalde/logo-fona.svg';
import LogoEichwalde from '~/images/eichwalde/logo-eichwalde.png';
import LogoEichwalde2 from '~/images/eichwalde/logo-eichwalde@2x.png';
import LogoEichwalde3 from '~/images/eichwalde/logo-eichwalde@3x.png';
import LogoZeuthen from '~/images/eichwalde/logo-zeuthen.png';
import LogoZeuthen2 from '~/images/eichwalde/logo-zeuthen@2x.png';
import LogoZeuthen3 from '~/images/eichwalde/logo-zeuthen@3x.png';
import LogoSchulzendorf from '~/images/eichwalde/logo-schulzendorf.png';
import LogoSchulzendorf2 from '~/images/eichwalde/logo-schulzendorf@2x.png';
import LogoSchulzendorf3 from '~/images/eichwalde/logo-schulzendorf@3x.png';
import LogoTU from '~/images/eichwalde/logo-tu.png';
import LogoTU2 from '~/images/eichwalde/logo-tu@2x.png';
import LogoTU3 from '~/images/eichwalde/logo-tu@3x.png';
import LogoFMB from '~/images/logofmb.png';
import LogoFMB2 from '~/images/logofmb@2x.png';
import LogoFMB3 from '~/images/logofmb@3x.png';
import { media } from '~/styles/utils';
import config from '~/config';

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.l`
    flex-direction: row;
    flex-wrap: wrap;
  `}

  ${media.xl`
    max-width: 900px;
  `}
`;

const LogoGrid1 = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 1em auto;

  ${media.m`
    width: 518px;
  `}

  ${media.l`
    width: 598px;
  `}

  ${media.xl`
    width: auto;
  `}
`;

const LogoGrid2 = styled(LogoGrid1)`
  flex-wrap: wrap;
  img {
    margin-right: 1em;
    margin-bottom: 1em;
    height: 45px;
    width: auto;

    ${media.m`
      margin-right: 2em;
    `}
  }
`;

const LogoAnnotation = styled(Paragraph)`
  flex: 1 0 100%;
  font-size: 0.8em;
  color: ${config.colors.darkgrey};
`;

const Logos = () => (
  <Footer>
    <LogoGrid1>
      <img
        src={LogoBMBF2}
        srcSet={`${LogoBMBF} 1x, ${LogoBMBF2} 2x, ${LogoBMBF3} 3x`}
        alt="Logo Bundesministerium für Bildung und Forschung"
      />
      <LogoFONA />
    </LogoGrid1>
    <LogoGrid2>
      <LogoAnnotation>Projektpartner:</LogoAnnotation>
      <img
        alt="Wappen Eichwalde"
        src={LogoEichwalde2}
        srcSet={`${LogoEichwalde} 1x, ${LogoEichwalde2} 2x, ${LogoEichwalde3} 3x`}
      />
      <img
        alt="Wappen Zeuthen"
        src={LogoZeuthen2}
        srcSet={`${LogoZeuthen} 1x, ${LogoZeuthen2} 2x, ${LogoZeuthen3} 3x`}
      />
      <img
        alt="Wappen Schulzendorf"
        src={LogoSchulzendorf2}
        srcSet={`${LogoSchulzendorf} 1x, ${LogoSchulzendorf2} 2x, ${LogoSchulzendorf3} 3x`}
      />
      <img
        alt="Logo FixMyBerlin"
        src={LogoFMB2}
        srcSet={`${LogoFMB} 1x, ${LogoFMB2} 2x, ${LogoFMB3} 3x`}
      />
      <img
        alt="Logo TU"
        src={LogoTU2}
        srcSet={`${LogoTU} 1x, ${LogoTU2} 2x, ${LogoTU3} 3x`}
      />
    </LogoGrid2>
  </Footer>
);

export default Logos;
