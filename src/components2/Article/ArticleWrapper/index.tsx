import React, { useState, ReactElement } from 'react';
import styled from 'styled-components';
import { InView } from 'react-intersection-observer';

import defaultBgPattern from './bg-pattern.png';

import TOC from './TOC';
import MenuButton from '~/components2/MenuButton';
import { media } from '~/styles/utils';

interface PageProps {
  bgPattern?: string;
}

const Page = styled.div<PageProps>`
  background: url(${(props) => props.bgPattern});
  min-height: 100%;
`;

const ContentWrapperOuter = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;

  ${media.l`
    margin: 20px auto;
  `}
`;

const ContentWrapper = styled.div`
  padding: 0 16px 12px 16px;
  background: white;

  ${media.l`
    box-shadow: 0 2px 20px 2px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    padding: 20px 60px;
  `}
`;

export default function SinglePageWrapper({
  bgPattern = defaultBgPattern,
  hasToc = false,
  className = null,
  children
}) {
  const [activeTocIndex, setActiveTocIndex] = useState(0);

  const onViewChange = (inView, entry, index) => {
    if (!inView) {
      return null;
    }

    return setActiveTocIndex(index);
  };

  const tocChildren = React.Children.toArray(children).filter(
    (child: ReactElement) => child.props.toc
  );

  return (
    <Page className={className} bgPattern={bgPattern}>
      <MenuButton />
      <ContentWrapperOuter>
        {hasToc && <TOC entries={children} activeIndex={activeTocIndex} />}
        <ContentWrapper>
          {React.Children.map(children, (child) => {
            if (!child.props.toc) {
              return child;
            }

            const tocIndex = tocChildren.findIndex(
              (c: ReactElement) => c.props.toc === child.props.toc
            );

            return (
              <InView
                onChange={(inView, entry) =>
                  onViewChange(inView, entry, tocIndex)
                }
              >
                {child}
              </InView>
            );
          })}
        </ContentWrapper>
      </ContentWrapperOuter>
    </Page>
  );
}
