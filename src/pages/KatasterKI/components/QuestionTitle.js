/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

import config from '~/config';
import { isSmallScreen } from '~/styles/utils';

const HeadlineWrapper = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 24px;
    line-height: 1.3;
    margin: 5px 0;
    font-family: 'Franklin Gothic FS', 'Open Sans', sans-serif;
    font-weight: 500;
  }

  svg {
    width: 100%;
    height: 2px;

    line {
      stroke: ${config.colors.inactivegrey};
      stroke-dasharray: 3 5;
      stroke-width: 1.5;
    }
  }
`;

export default (props) => (
  <HeadlineWrapper {...props}>
    <h1>{props.children}</h1>
    {isSmallScreen() && (
      <svg>
        <line x1="0" y1="0" x2="100%" />
      </svg>
    )}
  </HeadlineWrapper>
);
