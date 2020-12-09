import React, { ReactNode } from 'react';
import styled from 'styled-components';
import slugify from 'slugify';

import config from '~/config';
import { media } from '~/styles/utils';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  toc?: string;
  tocAnchor?: string;
  children?: ReactNode;
  className?: string;
}

interface StyledHeadingProps {
  toc?: string;
}

const Heading1 = styled.h1<StyledHeadingProps>`
  font-size: 1.875rem;
  font-family: ${config.titleFont};
  font-weight: 700;
  margin: 0.5em auto;
  line-height: 1.25;
  max-width: 600px;
  color: ${config.colors.darkbg};

  ${media.m`
    font-size: 2em;
  `}
`;

const Heading2style = styled.h2<StyledHeadingProps>`
  font-size: 1.5rem;
  margin: 1.5em auto 0.5em;
  max-width: 600px;
  color: ${config.colors.darkbg};
  text-transform: uppercase;

  ${media.m`
    margin: 2em auto 0.5rem 0;
  `}
`;

const DecoLine = styled.div`
  font-size: 1.5rem;
  width: 50%;
  border-bottom: 2px solid ${config.colors.change_4};
  margin-bottom: 1em;
`;

const Heading2 = ({ children, ...props }) => (
  <>
    <Heading2style {...props}>{children}</Heading2style>
    <DecoLine />
  </>
);

const Heading3 = styled.h2<StyledHeadingProps>`
  font-size: 1rem;
  margin: 0.67em auto;
  max-width: 600px;
  color: ${config.colors.darkbg};

  ${media.m`
    font-size: 1.25rem;
    margin: 2em auto;
  `}
`;

const AnchorStyle = styled.a`
  display: block;
  border-bottom: none !important;
`;

const headings = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
};

/**
 * Provide an anchor for accessibility if toc prop is provided
 */
const AnchorWrapper = ({ toc, children, tocAnchor = null }) => {
  if (toc == null) return <>{children}</>;
  return (
    <AnchorStyle
      href={`#${slugify(tocAnchor || toc, { lower: true })}`}
      id={slugify(tocAnchor || toc, { lower: true })}
    >
      {children}
    </AnchorStyle>
  );
};

const Heading = ({ as, toc, tocAnchor, children, className }: HeadingProps) => {
  const HeadingComponent = headings[as] ? headings[as] : Heading1;

  return (
    <AnchorWrapper toc={toc} tocAnchor={tocAnchor}>
      <HeadingComponent className={className}>{children}</HeadingComponent>
    </AnchorWrapper>
  );
};

export default Heading;
