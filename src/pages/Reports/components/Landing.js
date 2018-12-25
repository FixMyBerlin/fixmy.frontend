import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeading = styled.h2`
  color: green;
`;

export default () => (
  <div>
    <StyledHeading>This is the landing page</StyledHeading>
    <Link to="/meldungen/wo">Zur Karte</Link>
  </div>
);
