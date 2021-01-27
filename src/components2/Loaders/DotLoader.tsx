import React from 'react';
import styled from 'styled-components';
import PropagateLoader from 'react-spinners/PropagateLoader';
import config from '~/config';

const LoaderWrapper = styled.div`
  width: 100%;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotLoader = () => (
  <LoaderWrapper
    role="progressbar"
    aria-busy
    aria-valuetext="Wird geladen"
    aria-live="assertive"
  >
    <PropagateLoader color={`${config.colors.interaction}`} />
  </LoaderWrapper>
);

export default DotLoader;
