/**
 * Marker image to indicate current center of mapView.
 */

import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LocateMeMarkerIcon from '~/images/reports/locate-me-marker.svg';
import TickIcon from '~/images/reports/locate-me-marker-tick.svg';
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
  margin: auto;
  top: 0; 
  left: 0;  
  right: 0;
  bottom: calc(114px / 2);
  z-index: 99999999;
  height: 114px;
  width: 82px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledPinnedLocateMeMarkerIcon = styled(LocateMeMarkerIcon)`
  position: relative;
  top: 33px;
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

    {pinned ?
      (
        <Fragment>
          <StyledPinnedLocateMeMarkerIcon />
          <StyledTickIcon />
        </Fragment>
      ) :
        <LocateMeMarkerIcon />}

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
