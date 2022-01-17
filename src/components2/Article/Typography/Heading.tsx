import React, { ReactNode } from 'react';
import slugify from 'slugify';
import styled from 'styled-components';

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
  className?: string;
}

const Heading1 = styled.h1<StyledHeadingProps>`
  font-size: 1.5em;
  font-family: ${config.titleFont};
  font-weight: 700;
  margin: 0.5em auto;
  line-height: 1.25;
  max-width: 518px;
  color: ${config.colors.darkbg};

  ${media.s`
    font-size: 1.875em;
  `}

  ${media.m`
    font-size: 2em;
  `}

  ${media.l`
    max-width: 646px;
  `}
`;

const Heading2style = styled.h2<StyledHeadingProps>`
  color: ${config.colors.darkbg};
  font-size: 1.5em;
  margin: 1.5em auto 0.25em;
  max-width: 518px;
  text-transform: uppercase;

  ${media.s`
    font-size: 2em;
  `}

  ${media.m`
    margin: 2em auto 0.5rem 0;
  `}

  ${media.l`
    max-width: calc(646px + 151px);
  `}
`;

const DecoLine = styled.div`
  font-size: 1.5rem;
  width: 50%;
  border-bottom: 2px solid ${config.colors.change_2};
  margin-bottom: 0.5em;

  ${media.s`
    margin-bottom: 1.5em;
  `}
`;

const Heading2 = ({ children, ...props }) => (
  <>
    <Heading2style {...props}>{children}</Heading2style>
    <DecoLine />
  </>
);

const Heading3 = styled.h3<StyledHeadingProps>`
  font-size: 1.5em;
  line-height: 1.2;
  margin: 2em auto 0;
  max-width: 518px;
  color: ${config.colors.darkbg};

  ${media.s`
    line-height: 1.3;
  `}

  ${media.m`
    margin: 2em auto 1em;
  `}

  ${media.l`
    max-width: 598px;
  `}
`;

const AnchorStyle = styled.a`
  display: block;
  border-bottom: none !important;

  &:before {
    display: block;
    content: '';
    height: 4em;
    margin: -4em 0 0;

    ${media.m`
    height: 1px;
    margin: -1px 0 0;
    `}
  }
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
  if (toc == null) return children;
  return (
    <AnchorStyle
      href={`#${slugify(tocAnchor || toc, { lower: true })}`}
      id={slugify(tocAnchor || toc, { lower: true })}
      className="internal"
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
