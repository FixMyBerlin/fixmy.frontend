import React from 'react';
import styled from 'styled-components';

import { isSmallScreen } from '~/styles/utils';

const HeadlineWrapper = styled.div`
  margin-bottom: 25px;

  h1 {
    font-size: 26px;
    line-height: 1;
    margin: 5px 0;
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
  <HeadlineWrapper>
    <h1>{props.children}</h1>
    {isSmallScreen() && (
      <svg>
        <line x1="0" y1="0" x2="100%" />
      </svg>
    )}
  </HeadlineWrapper>
);
