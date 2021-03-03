import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import styled from 'styled-components';

import config from '~/config';
import logger from '~/utils/logger';

const LoaderWrapper = styled.div`
  width: 100%;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = ({ pastDelay, error, color }) => {
  if (error) {
    logger('Error loading page', error);
    return (
      <p>
        <span role="img" aria-label="sick face emoji">
          🤕
        </span>{' '}
        Ups, da ist etwas schiefgegangen: {error}
      </p>
    );
  }
  if (pastDelay)
    return (
      <LoaderWrapper>
        <PropagateLoader
          color={`${color == null ? config.colors.interaction : color}`}
        />
      </LoaderWrapper>
    );
  return null;
};

export default Loader;
