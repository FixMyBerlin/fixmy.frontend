import React, { ReactNode } from 'react';
import styled from 'styled-components';

import config from '~/config';
import { media } from '~/styles/utils';

interface HeadingProps {
  as?: 'h1' | 'h2';
  toc?: string;
  children?: ReactNode;
  className?: string;
}

interface StyledHeadingProps {
  toc?: string;
}

const Heading1 = styled.h1<StyledHeadingProps>`
  font-size: 1.5em;
  font-family: ${config.titleFont};
  font-weight: 700;
  margin: 0.5em auto;
  line-height: 1.25;
  max-width: 520px;

  ${media.m`
    font-size: 2em;
  `}
`;

const Heading2 = styled.h2<StyledHeadingProps>`
  font-size: 1.5em;
  margin: 0.67em auto;
  max-width: 520px;
`;

const Heading = ({ as, toc, children, className }: HeadingProps) => {
  const HeadingComponent = as === 'h2' ? Heading2 : Heading1;

  return (
    <HeadingComponent toc={toc} className={className}>
      {children}
    </HeadingComponent>
  );
};

export default Heading;
