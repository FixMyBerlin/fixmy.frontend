import React, { ReactNode } from 'react';
import styled from 'styled-components';

import config from '~/config';

import PublishDate from './PublishDate';
import Author from './Author';

interface ArticleMetaProps {
  publishDate?: Date;
  author?: string;
  className?: string;
  children?: ReactNode;
}

const MetaWrap = styled.div`
  display: flex;
  font-size: 1em;
  align-items: center;
`;

const AuthorIcon = styled.div`
  width: 2.375em;
  height: 2.375em;
  flex: 0 0 2.375em;
  border-radius: 50%;
  margin-right: 0.5em;
  background-color: ${config.colors.interaction};
`;

const Divider = styled.div`
  height: 1.1em;
  flex: 0 0 1px;
  background: currentColor;
  margin: 0 0.5em;
`;

const ArticleMeta = ({
  publishDate,
  author,
  className,
  children
}: ArticleMetaProps) => {
  if (!publishDate && !author) {
    return null;
  }

  return (
    <MetaWrap className={className}>
      <AuthorIcon />
      <PublishDate date={publishDate} />
      <Divider />
      <Author name={author} />
      {children}
    </MetaWrap>
  );
};

export default ArticleMeta;
