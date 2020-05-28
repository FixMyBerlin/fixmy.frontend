import React, { ReactNode } from 'react';
import styled from 'styled-components';

import config from '~/config';

interface HeadingProps {
  as?: 'h1' | 'h2';
  children?: ReactNode;
  className?: string;
}

const Heading1 = styled.h1`
  font-size: 2em;
  font-family: ${config.titleFont};
  font-weight: 700;
  margin: 0.5em 0;
  line-height: 1.25;
`;

const Heading2 = styled.h2`
  font-size: 1.5em;
  margin: 0.67em 0;
`;

const Heading = ({ as, children, className }: HeadingProps) => {
  if (as === 'h2') {
    return <Heading2 className={className}>{children}</Heading2>;
  }
  return <Heading1 className={className}>{children}</Heading1>;
};

export default Heading;
