import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import config from '~/config';
import FMBLogo from '~/images/logofmb@3x.png';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5em;

  span {
    font-size: 0.75em;
    margin: 0 auto;
    color: ${config.colors.darkgrey};
  }

  a {
    margin: 1em auto 3em;

    img {
      width: 6em;
    }
  }
`;

const LogoFooter = ({ children, to = '/' }) => (
  <Wrapper>
    {children && <span>{children}</span>}
    <Link to={to}>
      <img src={FMBLogo} alt="Logo FixMyBerlin" />
    </Link>
  </Wrapper>
);

export default LogoFooter;
