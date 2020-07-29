import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Kicker from './Kicker';
import ArticleMeta from './ArticleMeta';
import Heading from '~/components2/Article/Typography/Heading';

interface ArticleHeaderProps {
  kicker?: string;
  logo?: ReactNode;
  title?: string;
  publishDate?: Date;
  author?: string;
  toc?: string;
  children?: ReactNode;
  className?: string;
}

const ArticleHeaderWrapper = styled.div`
  margin: 2em auto 1em auto;
  max-width: 520px;
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
  className
}: ArticleHeaderProps) => {
  return (
    <ArticleHeaderWrapper className={className}>
      {logo && <LogoWrapper>{logo}</LogoWrapper>}
      {kicker && <Kicker>{kicker}</Kicker>}
      <Heading toc={toc}>{children}</Heading>
      <ArticleMeta publishDate={publishDate} author={author} />
    </ArticleHeaderWrapper>
  );
};

ArticleHeader.displayName = 'ArticleHeader';

export default ArticleHeader;
