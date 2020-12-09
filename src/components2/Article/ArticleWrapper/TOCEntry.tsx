import React from 'react';
import styled, { StyledProps } from 'styled-components';
import slugify from 'slugify';

import config from '~/config';
import { media } from '~/styles/utils';

interface TOCEntryWrapperProps {
  active: boolean;
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

  ${media.xl`
    line-height: 1.2;
    display: block;
    text-align: right;
    margin-bottom: 25px;
    padding-right: 25px;
    border-right: ${(props: StyledProps<TOCEntryWrapperProps>) =>
      props.active ? `3px solid ${config.colors.interaction}` : 'none'};
  `}
`;

const TOCEntryIndex = styled.div`
  font-weight: 700;

  ${media.xl`
    margin-right: 0;
  `}
`;

const TOCEntrySeparator = styled.div`
  width: 2px;
  height: 18px;
  margin: 0 10px;
  background: #999;

  ${media.xl`
    display: none;
  `}
`;

const TOCEntryText = styled.div<TOCEntryWrapperProps>`
  ${media.xl`
    font-weight: ${(props: StyledProps<TOCEntryWrapperProps>) =>
      props.active ? 700 : 300};
  `}
`;

const padIndex = (index: number) => {
  return index < 10 ? `0${index}` : index;
};

function TOCEntry({ index, entry, active = false, enumerate = true }) {
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
    <TOCEntryWrapper active={active} onClick={goToEntry} href={`#${slug}`}>
      {enumerate && (
        <>
          <TOCEntryIndex>{padIndex(index + 1)}</TOCEntryIndex>
          <TOCEntrySeparator />
        </>
      )}
      <TOCEntryText active={active}>{entry.props.toc}</TOCEntryText>
    </TOCEntryWrapper>
  );
}

export default TOCEntry;
