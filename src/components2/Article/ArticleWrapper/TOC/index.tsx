import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import Entry from './Entry';

const TOCWrapper = styled.div`
  max-width: 520px;
  margin: 25px auto;
  font-size: 16px;

  ${media.xl`
    position: sticky;
    transform: translate(-135px, 25px);
    top: 25px;
    height: 0;
    width: 125px;
    margin: 0;
  `}
`;

const TOCHeaderArticle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;

  ${media.xl`
    display: none;
  `}
`;

function TOC({ entries, activeIndex }) {
  const tocChildren = React.Children.toArray(entries).filter(
    (child: ReactElement) => child.props.toc
  );

  return (
    <TOCWrapper>
      <TOCHeaderArticle>Gehe direkt zu einem Kapitel</TOCHeaderArticle>
      {tocChildren.map((entry: ReactElement, index) => (
        <Entry
          entry={entry}
          key={`tocentry__${entry.props.toc}`}
          active={activeIndex === index}
          index={index}
        />
      ))}
    </TOCWrapper>
  );
}

export default TOC;
