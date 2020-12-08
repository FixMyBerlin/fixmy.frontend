import React from 'react';
import styled from 'styled-components';
import BaseMap from '~/components2/Map';

const StyledMap = styled(BaseMap)`
  width: 100%;
  height: 35em;
`;

// eslint-disable-next-line react/style-prop-object
const Map = ({ ...mapProps }) => <StyledMap {...mapProps} />;

export default Map;
