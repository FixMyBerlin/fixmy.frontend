import React from 'react';
import styled from 'styled-components';

const Separator = styled.div`
  border-top: 1px solid #eee;
  text-transform: uppercase;
  font-size: 10px;
  color: ${config.colors.inactivegrey};
  padding: .5rem 2rem;
`;

export default ({ label }) => (
  <Separator>{label}</Separator>
);

