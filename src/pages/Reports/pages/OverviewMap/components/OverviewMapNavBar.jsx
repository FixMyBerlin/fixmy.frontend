import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import MenuButton from '~/components/MenuButton';
import BikeParkIcon from '~/images/reports/bikeparkdark.svg?component';
import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';

const Wrapper = styled.div`
  margin: 0;
  padding: 18px 8px 12px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 0.5px solid #979797;
`;

const StyledMenuButton = styled(MenuButton)`
  padding-top: 1px;
  position: static;
`;

const TextWrapper = styled.div`
  padding-left: 1.5em;
  padding-right: 8px;
  margin-top: -3px; /* due to increased line height */
  line-height: 1.3;

  & > a {
    text-decoration: none;
  }
`;

const Heading = styled.h2`
  font-size: 16px;
  color: ${config.colors.darkgrey};
  letter-spacing: 0.8px;
  margin: 0;

  ${media.m`
    font-family: '${config.titleFont}', sans-serif;

    font-size: 1.6em;
  `}
`;

const BikeParkImg = styled(BikeParkIcon)`
  width: 65px;
  height: 40px;
  display: block;
  flex-shrink: 0;
  margin-left: auto;
`;

const AachenHeaderImage = styled.img`
  width: 67px;
  margin-top: -0.5em;

  ${media.m`
    width: 100px;
  `}
`;

const HeaderLogo = styled.div`
  margin-left: auto;
`;

const LinkSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TinyLink = styled.a`
  display: block;
  margin-top: 2px;
  font-size: 10px;
  color: #999999;
  margin: 0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const headerImage =
  config.region === 'aachen' ? (
    <AachenHeaderImage
      src={config.reports.landing.logo.source}
      alt="Logo der Stadt Aachen"
    />
  ) : (
    <BikeParkImg alt="Icon Fahrradparkplätze" />
  );

const OverviewMapNavBar = ({ heading }) => (
  <Wrapper data-cy="reports-heading">
    <StyledMenuButton />
    <TextWrapper>
      <Link to={config.routes.reports.landing}>
        <Heading>{heading}</Heading>
      </Link>
      <LinkSection>
        <TinyLink
          as="a"
          href={`mailto:${config.feedbackMail}?subject=Feedback zum Meldedialog ${config.reports.region}`}
        >
          Feedback zum Meldedialog?
        </TinyLink>
      </LinkSection>
    </TextWrapper>
    <HeaderLogo>
      <Link to={config.routes.reports.landing}>{headerImage}</Link>
    </HeaderLogo>
  </Wrapper>
);

OverviewMapNavBar.propTypes = {
  heading: PropTypes.string,
};

OverviewMapNavBar.defaultProps = {
  heading: `Neue Fahrradbügel für ${config.reports.region}`,
};

export default OverviewMapNavBar;
