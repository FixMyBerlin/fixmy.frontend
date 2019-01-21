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
  position: absolute;
  z-index: 99999999;
  height: 114px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledLocateMeMarkerIcon = styled(LocateMeMarkerIcon)`
  flex-shrink: 0; // prevent svg from scaling so that the wrapper clip the viewbox
`;

const StyledMapCenterIndicator = styled(MapcenterIndicator)`
  position: absolute;
  bottom: -17px;
`;

const StaticMarker = ({ pinned }) => (
  <Wrapper>
    {pinned ? <StyledLocateMeMarkerIcon /> : <LocateMeMarkerPinnedIcon />}
    <StyledMapCenterIndicator>+</StyledMapCenterIndicator>
  </Wrapper>
);

StaticMarker.propTypes = {
  pinned: PropTypes.bool
};

StaticMarker.defaultProps = {
  pinned: false
};

export default StaticMarker;
