import React, { ReactNode } from 'react';
import styled from 'styled-components';

import config from '~/config';
import { media } from '~/styles/utils';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  toc?: string;
  children?: ReactNode;
  className?: string;
}

interface StyledHeadingProps {
  toc?: string;
}

const Heading1 = styled.h1<StyledHeadingProps>`
  font-size: 24px;
  font-family: ${config.titleFont};
  font-weight: 700;
  margin: 0.5em auto;
  line-height: 1.25;
  max-width: 520px;
  color: ${config.colors.darkbg};

  ${media.m`
    font-size: 2em;
  `}
`;

const Heading2 = styled.h2<StyledHeadingProps>`
  font-size: 24px;
  margin: 0.67em auto;
  max-width: 520px;
  color: ${config.colors.darkbg};
  text-transform: uppercase;
`;

const Heading3 = styled.h2<StyledHeadingProps>`
  font-size: 16px;
  margin: 0.67em auto;
  max-width: 520px;
  color: ${config.colors.darkbg};
`;

const headings = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3
};

const Heading = ({ as, toc, children, className }: HeadingProps) => {
  const HeadingComponent = headings[as] ? headings[as] : Heading1;

  return (
    <HeadingComponent toc={toc} className={className}>
      {children}
    </HeadingComponent>
  );
};

export default Heading;
