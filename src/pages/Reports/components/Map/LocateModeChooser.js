/**
 User can pick between a) using the current device location and b) geocoding the location.
 Receives URLS for re-routing when an options has been chosen.
 * */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import LocateIcon from '~/images/reports/location-button.svg';
import MapIcon from '~/images/reports/noun-map-1909219.svg';


const Wrapper = styled.div`
  position: absolute;
  top: 77px;
  height: calc(100% - 77px);
  background-color: #fabe28;
  border: 1px solid #979797;
  padding: 12px;
  z-index: 999999;
`;

const Heading = styled.h2`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  line-height: 1.33;
  margin-top: 76px;
  margin-bottom: 58px;
`;

const LinkButton = styled(Link)`
  display: flex;
  width: 100%;
  max-width: 360px;
  height: 74.5px;
  margin-bottom: 22px;
  font-size: 18px;
  line-height: 1.33;
  background-color: white;
  border-radius: 6px;
  color: #0f0f0f;
  text-decoration: none;
  padding: 14px;
  -webkit-box-shadow: 0px 0px 15px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 15px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
`;

const LinkButtonIcon = styled.div`
  display: block;
  padding-right: 18px;
`;

// again, because of propbles using SVGs, feather icons are used
const CloseButton = styled.div`
  position: absolute;
  top: -21.5px;
  right: 21px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #545454;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseIcon = styled(X)`
  color: #fff;
`;

const LocateModeChooser = ({ heading, useCurrentPositionRoute, onUseGeocodingRoute, onClose }) => (
  <Wrapper>
    <Heading>{heading}</Heading>

    <LinkButton to={useCurrentPositionRoute}>
      <LinkButtonIcon><LocateIcon /></LinkButtonIcon>
      An meiner aktuellen Position
    </LinkButton>
    <LinkButton to={onUseGeocodingRoute}>
      <LinkButtonIcon><MapIcon /></LinkButtonIcon>
      Ich möchte eine Adresse auf der Karte eingeben
    </LinkButton>
    <CloseButton onClick={onClose}>
      <CloseIcon />
    </CloseButton>
  </Wrapper>
);

LocateModeChooser.propTypes = {
  heading: PropTypes.string,
  useCurrentPositionRoute: PropTypes.string,
  onUseGeocodingRoute: PropTypes.string,
  onClose: PropTypes.func
};

LocateModeChooser.defaultProps = {
  heading: 'Wo benötigst du neue Fahrradbügel?',
  useCurrentPositionRoute: 'please/state/a/route',
  onUseGeocodingRoute: 'please/state/a/route',
  onClose: () => console.log('LocateModeChooser.onClose says implement me')
};

export default LocateModeChooser;
