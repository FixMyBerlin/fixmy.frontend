import React from 'react';
import styled from 'styled-components';

import config from '~/config';

interface TOCEntryWrapperProps {
  active: boolean;
}

const TOCEntryWrapper = styled.div<TOCEntryWrapperProps>`
  text-align: right;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }
`;

const TOCEntryIndex = styled.div`
  font-weight: 700;
  font-family: '${config.titleFont}', serif;
`;

const TOCEntryText = styled.div<TOCEntryWrapperProps>`
  font-weight: ${(props) => (props.active ? 700 : 400)};
  font-family: ${(props) =>
    props.active ? config.titleFont : config.baseFont};
`;

function TOCEntry({ index, entry, active = false }) {
  const goToEntry = () => {
    const headlineDomNode = document.querySelector(`.toc__anchor-${index}`);

    if (!headlineDomNode) {
      return null;
    }

    const bounds = headlineDomNode.getBoundingClientRect();
    window.scrollTo({
      top: bounds.top,
      behavior: 'smooth'
    });
  };

  return (
    <TOCEntryWrapper active={active} onClick={goToEntry}>
      <TOCEntryIndex>{index + 1}</TOCEntryIndex>
      <TOCEntryText active={active}>{entry.props.toc}</TOCEntryText>
    </TOCEntryWrapper>
  );
}

export default TOCEntry;
