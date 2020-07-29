import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import Entry from './TOCEntry';
import Heading from '../Typography/Heading';
import config from '~/config';

const TOCWrapper = styled.div`
  max-width: 520px;
  margin: 1.875em auto 0;
  font-size: 16px;
  color: ${config.colors.darkbg};

  ${media.xl`
    position: sticky;
    transform: translate(-145px, 25px);
    top: 25px;
    height: 0;
    width: 145px;
    margin: 0;
  `};
`;

const TOCHeaderArticle = styled(Heading)`
  margin-bottom: 1em;

  ${media.xl`
    display: none;
  `}
`;

function TOC({ entries, activeIndex, hasActiveState = false }) {
  const tocChildren = React.Children.toArray(entries).filter(
    (child: ReactElement) => child.props.toc
  );

  return (
    <TOCWrapper>
      <TOCHeaderArticle as="h2">Gehe direkt zu einem Kapitel</TOCHeaderArticle>
      {tocChildren.map((entry: ReactElement, index) => (
        <Entry
          entry={entry}
          key={`tocentry__${entry.props.toc}`}
          active={hasActiveState && activeIndex === index}
          index={index}
        />
      ))}
    </TOCWrapper>
  );
}

export default TOC;
