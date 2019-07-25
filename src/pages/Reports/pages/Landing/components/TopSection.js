import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import FixMyLogo from '~/images/logofmb@2x.png';
import MenuButton from '~/components/MenuButton';
import BycicleParkingBgImg from '~/images/reports/bycicle-parking@3x.png';
import BycicleParkingBgImgLargeScreen from '~/images/reports/landing-christin-hume-595752-unsplash.jpg';
import Button from '~/components/Button';
import Link from '~/components/Link';
import { media } from '~/styles/utils';

const Section = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${BycicleParkingBgImg});
  background-size: cover;
  background-position: center 80%;
  padding-left: 34px;
  padding-right: 34px;

  ${media.m`
    background-image: url(${BycicleParkingBgImgLargeScreen});
    background-position: top;
  `}
`;

const StyledMenuButton = styled(MenuButton)`
  padding: 8px;
  background-color: #353535; /*TODO: factor out color to config */
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`;


const Credits = styled.p`
  font-size: 10px;
  letter-spacing: 0.2px;
  color: ${config.colors.lightgrey};
  position: absolute;
  bottom: 8px;
  right: 4px;

  ${media.m`
    display: none;
  `}
`;

const StyledHeading = styled.h2`
  height: 120px;
  font-family: "Roboto Slab", sans-serif;
  font-size: 32px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: white;
  margin-bottom: 39px;
`;

const StyledButton = styled(Button)`
  width: 167px;
  padding: 10px 18px;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.25);

   &:hover {
    box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 18px;

  &:visited, &:hover {
    color: white;
  }
`;

const TopSection = ({ toUrl }) => (
  <Section>
    <StyledMenuButton whiteFill="true" />
    <img width="92px" src={FixMyLogo} alt="logo" />
    <Credits>Photo by Trae Gould on Unsplash</Credits>
    <StyledHeading>Neue Fahrradbügel für Friedrichshain-Kreuzberg</StyledHeading>
    <StyledButton className="wiggle">
      <StyledLink to={toUrl}>
        <strong>Sagt uns wo</strong><br /> in 30 Sekunden
      </StyledLink>
    </StyledButton>
  </Section>
);

TopSection.propTypes = {
  toUrl: PropTypes.string
};

TopSection.defaultProps = {
  toUrl: '/meldungen/wo'
};

export default TopSection;
