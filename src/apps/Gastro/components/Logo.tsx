import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import config from '~/apps/Gastro/config';
import FMBLogo from '~/images/FixMyCity_positiv_300px.png';
import { media } from '~/styles/utils';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  margin-bottom: 3em;

  ${media.m`
    margin-top: 4em;
    flex-direction: row;
  `}

  section, a {
    display: flex;
    flex-direction: row;
    padding-bottom: 2em;
    padding-right: 1em;

    div {
      margin-right: 16px;
      flex-shrink: 0;
    }
  }

  .bezirksamt {
    font-size: 1em;
    font-weight: bold;
    color: ${config.colors.darkbg};
  }

  .fmb {
    font-size: 0.75em;
    line-height: 1.5em;
    text-decoration: none;
    color: ${config.colors.darkgrey};
  }
`;

const LogoWrapper = styled.div`
  width: 36px;
  img {
    width: 100%;
    height: auto;
  }
`;

const Logo = ({ district }) => (
  <Wrapper>
    <section className="bezirksamt">
      <LogoWrapper>
        <img
          src={district.emblem.large}
          srcSet={`${district.emblem.small} 450w, ${district.emblem.large} 750w`}
          alt={`Wappen ${district.title}`}
        />
      </LogoWrapper>
      <span>{district.content.footerLine}</span>
    </section>
    <Link to="/" className="fmb">
      <LogoWrapper>
        {' '}
        <img src={FMBLogo} alt="Logo FixMyCity" />
      </LogoWrapper>
      <span>Software bereitgestellt durch FixMyCity</span>
    </Link>
  </Wrapper>
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(Logo);
