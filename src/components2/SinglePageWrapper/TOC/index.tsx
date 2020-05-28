import React, { ReactElement } from 'react';
import styled from 'styled-components';

import Entry from './Entry';

const TOCWrapper = styled.div`
  position: absolute;
  line-height: 1.2;
  font-weight: 400;
  width: 100px;
  left: -110px;
`;

function TOC({ entries }) {
  const tocChildren: string[] = React.Children.toArray(entries)
    .filter((child: ReactElement) => child.props.toc)
    .map((child: ReactElement) => child.props.toc);

  return (
    <TOCWrapper>
      {tocChildren.map((entry, index) => (
        <Entry key={`tocentry__${entry}`} index={index} text={entry} />
      ))}
    </TOCWrapper>
  );
}

export default TOC;
