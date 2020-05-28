import React from 'react';
import styled from 'styled-components';

import config from '~/config';

const TOCEntryWrapper = styled.div`
  text-align: right;
  margin-bottom: 10px;
`;

const TOCEntryIndex = styled.div`
  font-weight: 700;
  font-family: '${config.titleFont}', serif;
`;

function TOCEntry({ index, text }) {
  return (
    <TOCEntryWrapper>
      <TOCEntryIndex>{index + 1}</TOCEntryIndex>
      <div>{text}</div>
    </TOCEntryWrapper>
  );
}

export default TOCEntry;
