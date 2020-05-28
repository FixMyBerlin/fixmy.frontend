import React from 'react';
import styled from 'styled-components';

import config from '~/config';

interface TOCEntryWrapperProps {
  active: boolean;
}

const TOCEntryWrapper = styled.div<TOCEntryWrapperProps>`
  text-align: right;
  margin-bottom: 10px;
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

function TOCEntry({ index, text, active = false }) {
  return (
    <TOCEntryWrapper active={active}>
      <TOCEntryIndex>{index + 1}</TOCEntryIndex>
      <TOCEntryText active={active}>{text}</TOCEntryText>
    </TOCEntryWrapper>
  );
}

export default TOCEntry;
