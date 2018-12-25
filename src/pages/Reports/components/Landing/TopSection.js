import React from 'react';
import styled from 'styled-components';
import FixMyLogo from '~/images/logofmb@2x.png';
import BycicleParkingBgImg from '~/images/reports/bycicle-parking@3x.jpg';
import Button from '~/components/Button';

// TODO: styling for desktop


const TopSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-image: url(${BycicleParkingBgImg});
  background-size: cover;
  background-position: center center;
`;

const StyledHeading = styled.h2`
  width: 310px;
  height: 120px;
  font-family: "Roboto Slab";
  font-size: 32px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`;

const StyledButton = styled(Button)`
  width: 167px;
`;


export default () => (
  <TopSection>
    <img width="92px" src={FixMyLogo} alt="logo" />
    <StyledHeading>Neue Fahrradbügel für Friedrichshain-Kreuzberg</StyledHeading>
    <StyledButton>
      <strong>Sag uns wo</strong><br /> in 30 Sekunden
    </StyledButton>
  </TopSection>
);
