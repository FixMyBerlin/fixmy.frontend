import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import config from '~/pages/Reports/config';
import FMBLogo from '~/images/FixMyCity_positiv_300px.png';
import { media } from '~/styles/utils';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 3em 0;

  ${media.m`
    margin-top: 7em;
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

const LogoFooter = () => (
  <Wrapper>
    <section className="bezirksamt">
      <LogoWrapper>
        <img
          src={config.reports.landing.logoFooter.large}
          srcSet={`${config.reports.landing.logoFooter.small} 450w, ${config.reports.landing.logoFooter.large} 750w`}
          alt={config.reports.landing.logoFooter.alt}
        />
      </LogoWrapper>
      <span>{config.reports.landing.logoFooter.footerLine}</span>
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

export default LogoFooter;
