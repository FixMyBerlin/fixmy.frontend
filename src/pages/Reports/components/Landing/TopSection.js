import React from 'react';
import styled from 'styled-components';
import FixMyLogo from '~/images/logofmb@2x.png';
import BycicleParkingBgImg from '~/images/reports/bycicle-parking@3x.jpg'; // TODO: pick image size depending on screen size
import Button from '~/components/Button';
import Link from '~/components/Link';
import PropTypes from 'prop-types';

// TODO: styling for desktop

const StyledSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${BycicleParkingBgImg});
  background-size: cover;
  background-position: center center;
  padding-left: 34px;
  padding-right: 34px;
`;

const StyledHeading = styled.h2`
  height: 120px;
  font-family: "Roboto Slab";
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
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 18px;
  
  &:visited {
    color: white;
  }
`;


const TopSection = ({ toUrl }) => (
  <StyledSection>
    <img width="92px" src={FixMyLogo} alt="logo" />
    <StyledHeading>Neue Fahrradbügel für Friedrichshain-Kreuzberg</StyledHeading>
    <StyledButton>
      <StyledLink to={toUrl}>
        <strong>Sagt uns wo</strong><br /> in 30 Sekunden
      </StyledLink>
    </StyledButton>
  </StyledSection>
);

TopSection.propTypes = {
  toUrl: PropTypes.string
};

TopSection.defaultProps = {
  toUrl: '/meldungen/wo'
};

export default TopSection;