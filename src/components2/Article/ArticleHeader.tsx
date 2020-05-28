import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Kicker from './Kicker';
import ArticleMeta from './ArticleMeta';
import Heading from './Heading';

interface ArticleHeaderProps {
  kicker?: string;
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

const ArticleHeader = ({
  kicker,
  title,
  publishDate,
  author,
  toc,
  children,
  className
}: ArticleHeaderProps) => {
  return (
    <ArticleHeaderWrapper className={className}>
      {kicker && <Kicker>{kicker}</Kicker>}
      {title && <Heading toc={toc}>{title}</Heading>}
      <ArticleMeta publishDate={publishDate} author={author} />
      {children}
    </ArticleHeaderWrapper>
  );
};

export default ArticleHeader;
