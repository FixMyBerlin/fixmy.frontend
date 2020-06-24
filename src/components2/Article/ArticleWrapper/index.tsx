import React, { useState, useEffect, ReactElement } from 'react';
import styled from 'styled-components';
import { InView } from 'react-intersection-observer';

import defaultBgPattern from './assets/bg-pattern.png';

import TOC from './TOC';
import MenuButton from '~/components2/MenuButton';
import { media, breakpoints } from '~/styles/utils';
import config from '~/config';

interface PageProps {
  bgPattern?: string;
}

const Page = styled.div<PageProps>`
  background: url(${(props) => props.bgPattern});
  min-height: 100%;

  p {
    font-weight: 400;
    font-family: ${config.baseFont};
    margin: 1em auto;
    line-height: 1.5;
    max-width: 520px;
  }
`;

const ContentWrapperOuter = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  a {
    text-decoration: none;
    color: ${config.colors.black};
    border-bottom: 1px solid ${config.colors.interaction};
  }

  a:hover {
    opacity: 0.8;
  }

  a:visited {
    color: ${config.colors.black};
  }

  ${media.l`
    margin: 20px auto;
  `}
`;

const ContentWrapper = styled.div`
  padding: 0 16px 12px 16px;
  background: white;
  color: ${config.colors.darkbg};

  @media screen and (min-width: 800px) {
    box-shadow: 0 2px 20px 2px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    padding: 2rem 0;
  }
`;

export default function ArticleWrapper({
  bgPattern = defaultBgPattern,
  hasToc = false,
  tocHasActiveState = false,
  className = null,
  children
}) {
  const [renderTocInsideArticle, setRenderTocInsideArticle] = useState(
    window.innerWidth < breakpoints.xl
  );
  const [activeTocIndex, setActiveTocIndex] = useState(
    tocHasActiveState ? 0 : null
  );

  useEffect(() => {
    const onResize = () => {
      setRenderTocInsideArticle(window.innerWidth < breakpoints.xl);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onViewChange = (inView, entry, index) => {
    if (!inView || !tocHasActiveState) {
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
        {hasToc && !renderTocInsideArticle && (
          <TOC
            entries={children}
            activeIndex={activeTocIndex}
            hasActiveState={tocHasActiveState}
          />
        )}
        <ContentWrapper>
          {React.Children.map(children, (child) => {
            const appendToc =
              child.type.displayName === 'ArticleHeader' &&
              hasToc &&
              renderTocInsideArticle;

            if (!child.props.toc) {
              return (
                <>
                  {child}
                  {appendToc && (
                    <TOC
                      entries={children}
                      activeIndex={activeTocIndex}
                      hasActiveState={tocHasActiveState}
                    />
                  )}
                </>
              );
            }

            const tocIndex = tocChildren.findIndex(
              (c: ReactElement) => c.props.toc === child.props.toc
            );

            return (
              <InView
                className={`toc__anchor-${tocIndex}`}
                onChange={(inView, entry) =>
                  onViewChange(inView, entry, tocIndex)
                }
              >
                {child}
                {appendToc && (
                  <TOC entries={children} activeIndex={activeTocIndex} />
                )}
              </InView>
            );
          })}
        </ContentWrapper>
      </ContentWrapperOuter>
    </Page>
  );
}
