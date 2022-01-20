import React from 'react';
import styled from 'styled-components';

import { Heading } from '~/components2/Article/Typography/Heading';
import { LocaleSwitcher } from '~/components2/LocaleSwitcher';
import { media } from '~/styles/utils';
import { LocaleCode } from '~/types';

import { ArticleMeta } from './ArticleMeta';

type Props = React.FC<{
  kicker?: string;
  logo?: React.ReactNode;
  publishDate?: Date;
  author?: string;
  toc?: string;
  children?: React.ReactNode;
  className?: string;
  locales?: LocaleCode[];
}> & {
  displayName?: string;
};

const ArticleHeaderWrapper = styled.div`
  margin: 2em auto 1em auto;
  max-width: 518px;

  ${media.l`
    max-width: 598px;
  `}
`;

const LogoWrapper = styled.div`
  float: right;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const Kicker = styled.div`
  text-transform: uppercase;
  font-size: 0.75em;
  letter-spacing: 0.25em;
  font-weight: 300;

  ${media.s`
    font-size: 0.88em;
  `}
`;

export const ArticleHeader: Props = ({
  kicker,
  logo,
  publishDate,
  author,
  toc,
  children,
  locales = null,
  className,
}) => {
  return (
    <ArticleHeaderWrapper className={className}>
      {locales && <LocaleSwitcher locales={locales} />}
      {logo && <LogoWrapper>{logo}</LogoWrapper>}
      {kicker && <Kicker>{kicker}</Kicker>}
      <Heading toc={toc}>{children}</Heading>
      <ArticleMeta publishDate={publishDate} author={author} />
    </ArticleHeaderWrapper>
  );
};

ArticleHeader.displayName = 'ArticleHeader';
