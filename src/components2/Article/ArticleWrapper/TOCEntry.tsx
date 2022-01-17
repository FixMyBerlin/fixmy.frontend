import React from 'react';
import slugify from 'slugify';
import styled, { StyledProps } from 'styled-components';

import config from '~/config';
import { media } from '~/styles/utils';

interface TOCEntryWrapperProps {
  active: boolean;
  className?: string;
}

const TOCEntryWrapper = styled.a<TOCEntryWrapperProps>`
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  line-height: 1;
  border-bottom: none !important;

  &:hover {
    opacity: 0.75;
  }

  ${media.l`
    line-height: 1.2;
    display: block;
    text-align: right;
    margin-bottom: 1em;
    padding: 0 24px 0 1em;
    border-left: ${(props: StyledProps<TOCEntryWrapperProps>) =>
      props.active ? `3px solid ${config.colors.change_2}` : 'none'};
  `}
`;

const TOCEntryIndex = styled.div`
  font-weight: 700;

  ${media.l`
    margin-right: 0;
  `}
`;

const TOCEntrySeparator = styled.div`
  width: 2px;
  height: 18px;
  margin: 0 10px;
  background: #999;

  ${media.l`
    display: none;
  `}
`;

const TOCEntryText = styled.div<TOCEntryWrapperProps>`
  ${media.l`
    font-weight: ${(props: StyledProps<TOCEntryWrapperProps>) =>
      props.active ? 700 : 300};
      hyphens: auto;
  `}
`;

const padIndex = (index: number) => {
  return index < 10 ? `0${index}` : index;
};

const TOCEntry = ({ index, entry, active = false, enumerate = true }) => {
  const goToEntry = () => {
    const headlineDomNode = document.querySelector(`.toc__anchor-${index}`);
    if (headlineDomNode) {
      headlineDomNode.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slug = slugify(entry.props.tocAnchor || entry.props.toc, {
    lower: true,
  });

  return (
    <TOCEntryWrapper
      active={active}
      onClick={goToEntry}
      href={`#${slug}`}
      className={`fmc-article-tocentry internal ${
        active ? 'fmc-article-tocentry-active' : ''
      }`}
    >
      {enumerate && (
        <>
          <TOCEntryIndex>{padIndex(index + 1)}</TOCEntryIndex>
          <TOCEntrySeparator />
        </>
      )}
      <TOCEntryText active={active}>{entry.props.toc}</TOCEntryText>
    </TOCEntryWrapper>
  );
};

export default TOCEntry;
