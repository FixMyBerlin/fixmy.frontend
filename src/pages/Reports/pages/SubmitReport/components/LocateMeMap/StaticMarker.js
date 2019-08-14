/**
 * Marker image to indicate current center of mapView.
 */

import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { X } from 'react-feather';

import LocateMeMarkerIcon from '~/images/reports/locate-me-marker.svg';
import TickIcon from '~/images/reports/locate-me-marker-tick.svg';

const MapcenterIndicator = styled(X)`
  font-weight: bold;
  font-size: 34px;
  color: #cf0a7d;
  transform: rotate(45deg);
`;

// TODO: do proper dimensioning and positioning

const Wrapper = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 114px;
  z-index: 99999999;
  height: 114px;
  width: 82px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  pointer-events: none;
`;

const StyledPinnedLocateMeMarkerIcon = styled(LocateMeMarkerIcon)`
  position: relative;
  top: 23px;
  filter: drop-shadow(0px 1px 4px rgba(0,0,0,0.4));
`;

const StyledTickIcon = styled(TickIcon)`
  position: relative;
  bottom: 35px;
`;

const StyledMapCenterIndicator = styled(MapcenterIndicator)`
  position: absolute;
  bottom: -10px;
`;

const StaticMarker = ({ pinned }) => (
  <Wrapper>
    {pinned && (
      <Fragment>
        <StyledPinnedLocateMeMarkerIcon />
        <StyledTickIcon />
      </Fragment>
    )}
    {!pinned && <StyledMapCenterIndicator>+</StyledMapCenterIndicator>}
  </Wrapper>
);

StaticMarker.propTypes = {
  pinned: PropTypes.bool
};

StaticMarker.defaultProps = {
  pinned: false
};

export default StaticMarker;
