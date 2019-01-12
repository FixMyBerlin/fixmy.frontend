/**
 * Marker image to indicate current center of mapView.
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LocateMeMarkerIcon from '~/images/reports/locate-me-marker.svg';
import LocateMeMarkerPinnedIcon from '~/images/reports/locate-me-marker-pinned.svg';
import { X } from 'react-feather';

const MapcenterIndicator = styled(X)`
  font-weight: bold;
  font-size: 34px;
  color: #cf0a7d;
  transform: rotate(45deg);
`;

// TODO: do proper dimensioning and positioning

const Wrapper = styled.div`
z-index: 99999999;
  position: absolute;
  height: 164px;
  width: 64px; 
  top: calc(50% - 137px); // TODO: leave positioning to parent component
  left: calc(50% - 64px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StaticMarker = ({ pinned }) => (
  <Wrapper>
    {pinned ? <LocateMeMarkerIcon /> : <LocateMeMarkerPinnedIcon />}
    <MapcenterIndicator>+</MapcenterIndicator>
  </Wrapper>
);

StaticMarker.propTypes = {
  pinned: PropTypes.bool
};

StaticMarker.defaultProps = {
  pinned: false
}

export default StaticMarker;
