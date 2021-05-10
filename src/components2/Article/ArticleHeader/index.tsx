import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Heading from '~/components2/Article/Typography/Heading';
import { LocaleSwitcher } from '~/components2/LocaleSwitcher';
import { media } from '~/styles/utils';
import { LocaleCode } from '~/types';

import ArticleMeta from './ArticleMeta';
import Kicker from './Kicker';

interface ArticleHeaderProps {
  kicker?: string;
  logo?: ReactNode;
  title?: string;
  publishDate?: Date;
  author?: string;
  toc?: string;
  children?: ReactNode;
  className?: string;
  locales?: LocaleCode[];
}

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

const ArticleHeader = ({
  kicker,
  logo,
  publishDate,
  author,
  toc,
  children,
  locales = null,
  className,
}: ArticleHeaderProps) => {
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

export default ArticleHeader;
