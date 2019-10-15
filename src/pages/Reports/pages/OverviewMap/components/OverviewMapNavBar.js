import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuButton from '~/components/MenuButton';
import BikeParkIcon from '~/images/reports/bikeparkdark.svg';
import { breakpoints, matchMediaSize } from '~/styles/utils';

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
  margin-top: -3px; /* due to increased line height */
  line-height: 1.3;
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
  flex-shrink: 0;
`;

const LinkSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TinyLink = styled(Link)`
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

const TinyEmailLink = styled(TinyLink)`
  position: ${({ isMobile }) => isMobile && 'absolute'};
  right: ${({ isMobile }) => isMobile && '8px'};
`;

const getIsDesktop = () => matchMediaSize(breakpoints.m);

const OverviewMapNavBar = ({ heading }) => (
  <Wrapper>
    <StyledMenuButton />
    <TextWrapper>
      <Heading>{heading}</Heading>
      <LinkSection>
        <TinyLink to={config.routes.reports.landing}>Alle Details</TinyLink>
        <TinyEmailLink
          as="a"
          isMobile={!getIsDesktop()}
          href={`mailto:${config.feedbackMail}?subject=Feedback zum Meldedialog`}
        >Feedback zum Meldedialog?
        </TinyEmailLink>
      </LinkSection>

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
