import React from 'react';
import styled from 'styled-components';
import MenuButton from '~/components/MenuButton';
import BikeParkIcon from '~/images/reports/bikeparkdark.svg';
import PropTypes from 'prop-types';
import { media } from '~/styles/utils';

const Wrapper = styled.div`
  height: 77px;
  margin: 0;
  padding: 18px 8px 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 0.5px solid #979797;
`;

const StyledMenuButton = styled(MenuButton)`
  position: static;
`

const TextWrapper = styled.div`
  padding-left: 16px;
  padding-right: 8px;
`;

const Heading = styled.h2`
   font-size: 14px;
  color: ${config.colors.darkgrey};
  letter-spacing: 0.8px;
  margin: 0;
  
  ${media.m`
    font-size: 16px;
  `}
  
`;

const BikeParkImg = styled(BikeParkIcon)`
  width: 65px;
  height: 40px;
  display: block;
`;

// TODO: find out what this is supposed to do
const AllDetailsLink = styled.p`
  font-size: 10px;
  color: #999999;
  margin: 0;
`;

const OverviewMapNavBar = ({ heading }) => (
  <Wrapper>
    <StyledMenuButton />
    <TextWrapper>
      <Heading>{heading}</Heading>
      <AllDetailsLink>Alle Details &gt;</AllDetailsLink>
    </TextWrapper>
    <BikeParkImg alt="Icon Fahrradparkplätze" />
  </Wrapper>

);

OverviewMapNavBar.propTypes = {
  heading: PropTypes.string
};

OverviewMapNavBar.defaultProps = {
  heading: 'Neue Fahrradbügel für Friedrichshain-Kreuzberg'
};

export default OverviewMapNavBar;
