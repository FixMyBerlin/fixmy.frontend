import React from 'react';
import styled from 'styled-components';
import PropagateLoader from 'react-spinners/PropagateLoader';

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BigLoader = () => (
  <LoaderWrapper>
    <PropagateLoader color={`${config.colors.interaction}`} />
  </LoaderWrapper>
);

export default BigLoader;
