import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MenuButton from '~/components/MenuButton';
import BikeParkIcon from '~/images/reports/bikeparkdark.svg';

const Wrapper = styled.div`
  margin: 0;
  padding: 18px 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 0.5px solid #979797;
`;

const StyledMenuButton = styled(MenuButton)`
  padding-top: 1px;
  position: static;
`;

const TextWrapper = styled.div`
  padding-left: 16px;
  padding-right: 8px;
`;

const Heading = styled.h2`
  font-size: 16px;
  color: ${config.colors.darkgrey};
  letter-spacing: 0.8px;
  margin: 0;
`;

const BikeParkImg = styled(BikeParkIcon)`
  width: 65px;
  height: 40px;
  display: block;
  align-self: center;
`;

const OverviewMapNavBar = ({ heading }) => (
  <Wrapper>
    <StyledMenuButton />
    <TextWrapper>
      <Heading>{heading}</Heading>
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
