import React from 'react';
import styled from 'styled-components';
import config from '~/pages/Spielstrassen/config';
import FMBLogo from '~/images/logofmb@3x.png';
import { Link } from 'react-router-dom';

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

  img {
    margin: 1em auto 3em;
    width: 6em;
  }
`;

const Logo = () => (
  <Wrapper>
    <span>Bereitgestellt durch</span>
    <Link to="/">
      <img src={FMBLogo} alt="Logo FixMyBerlin" />
    </Link>
  </Wrapper>
);

export default Logo;
