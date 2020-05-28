import React, { ReactElement } from 'react';
import styled from 'styled-components';

import Entry from './Entry';

const TOCWrapper = styled.div`
  position: sticky;
  line-height: 1.2;
  font-weight: 400;
  width: 110px;
  transform: translate(-105%, 25px);
  top: 25px;
  height: 0;
`;

function TOC({ entries, activeIndex }) {
  const tocChildren: string[] = React.Children.toArray(entries)
    .filter((child: ReactElement) => child.props.toc)
    .map((child: ReactElement) => child.props.toc);

  return (
    <TOCWrapper>
      {tocChildren.map((entry, index) => (
        <Entry
          key={`tocentry__${entry}`}
          active={activeIndex === index}
          index={index}
          text={entry}
        />
      ))}
    </TOCWrapper>
  );
}

export default TOC;
