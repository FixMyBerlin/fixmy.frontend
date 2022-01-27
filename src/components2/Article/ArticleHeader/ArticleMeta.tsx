import React from 'react';
import styled from 'styled-components';
import config from '~/config';
import AuthorSvg from '~/images/author-icon.svg';
import { media } from '~/styles/utils';
import { Author } from './Author';
import { PublishDate } from './PublishDate';

type ArticleMetaProps = {
  publishDate?: Date;
  author?: string;
  className?: string;
};

const MetaWrap = styled.div`
  display: flex;
  font-size: 0.88em;
  align-items: center;
  margin: 2em auto;

  ${media.m`
    font-size: 1em;
    margin: initial;
  `}
`;

const AuthorIcon = styled.div`
  width: 2.375em;
  height: 2.375em;
  flex: 0 0 2.375em;
  border-radius: 50%;
  margin-right: 0.5em;
  background-color: ${config.colors.interaction};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.div`
  height: 1.1em;
  flex: 0 0 1px;
  background: currentColor;
  margin: 0 0.5em;
`;

const MetaInnerWrap = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-wrap: wrap;
`;

export const ArticleMeta: React.VFC<ArticleMetaProps> = ({
  publishDate,
  author,
  className,
}) => {
  if (!publishDate && !author) {
    return null;
  }

  return (
    <MetaWrap className={className}>
      <AuthorIcon>
        <AuthorSvg />
      </AuthorIcon>
      <MetaInnerWrap>
        <PublishDate date={publishDate} />
        {author && (
          <>
            <Divider />
            <Author name={author} />
          </>
        )}
      </MetaInnerWrap>
    </MetaWrap>
  );
};
