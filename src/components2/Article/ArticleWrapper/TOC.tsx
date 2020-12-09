import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import Entry from './TOCEntry';
import Heading from '../Typography/Heading';
import config from '~/config';

const TOCWrapper = styled.nav`
  max-width: 600px;
  margin: 1.875em auto;
  font-size: 16px;
  color: ${config.colors.darkbg};

  ${media.xl`
    position: sticky;
    transform: translate(-170px, 25px);
    top: 25px;
    height: 0;
    width: 170px;
    margin: 0;
  `};
`;

const TOCHeaderArticle = styled(Heading)`
  margin-bottom: 1em;

  ${media.xl`
    display: none;
  `}
`;

function TOC({
  entries,
  activeIndex,
  hasActiveState = false,
  title = null,
  enumerate = true,
}) {
  const tocChildren = React.Children.toArray(entries).filter(
    (child: ReactElement) => child.props.toc
  );

  return (
    <TOCWrapper aria-labelledby="toc-header-article">
      <TOCHeaderArticle as="h2" id="toc-header-article">
        {title || (
          <FormattedMessage
            id="components.article.tocHeader"
            defaultMessage="Gehe direkt zu einem Kapitel"
          />
        )}
      </TOCHeaderArticle>
      {tocChildren.map((entry: ReactElement, index) => (
        <Entry
          entry={entry}
          key={`tocentry__${entry.props.toc}`}
          active={hasActiveState && activeIndex === index}
          index={index}
          enumerate={enumerate}
        />
      ))}
    </TOCWrapper>
  );
}

export default TOC;
