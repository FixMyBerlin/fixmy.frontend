import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import config from '~/config';

interface TOCEntryWrapperProps {
  active: boolean;
}

const TOCEntryWrapper = styled.div<TOCEntryWrapperProps>`
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  line-height: 1;

  &:hover {
    opacity: 0.75;
  }

  ${media.xl`
    line-height: 1.2;
    display: block;
    text-align: right;
  `}
`;

const TOCEntryIndex = styled.div`
  font-weight: 700;
  font-family: '${config.titleFont}', serif;
  margin-right: 10px;

  ${media.xl`
    margin-right: 0;
  `}
`;

const TOCEntryText = styled.div<TOCEntryWrapperProps>`
  ${media.xl`
    font-weight: ${(props) => (props.active ? 700 : 400)};
  `}
`;

function TOCEntry({ index, entry, active = false }) {
  const goToEntry = () => {
    const headlineDomNode = document.querySelector(`.toc__anchor-${index}`);

    if (headlineDomNode) {
      const bounds = headlineDomNode.getBoundingClientRect();
      window.scrollTo({
        top: bounds.top,
        behavior: 'smooth'
      });
    }
  };

  return (
    <TOCEntryWrapper active={active} onClick={goToEntry}>
      <TOCEntryIndex>{index + 1}</TOCEntryIndex>
      <TOCEntryText active={active}>{entry.props.toc}</TOCEntryText>
    </TOCEntryWrapper>
  );
}

export default TOCEntry;
