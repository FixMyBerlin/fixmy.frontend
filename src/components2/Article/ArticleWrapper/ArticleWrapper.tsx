import debug from 'debug';
import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';
import config from '~/config';
import { media } from '~/styles/utils';
import { LocaleCode } from '~/types';
import { ArticleWrapperHeader } from './ArticleWrapperHeader';
import { TOC } from './TOC';

const log = debug('fmc:Article:ArticleWrapper');

const Page = styled.main<{ bgPattern?: string }>`
  background: url(${(props) => props.bgPattern});
  min-height: 100%;
`;

const ContentWrapperOuter = styled.div`
  position: relative;
  max-width: 646px;
  margin: 0 auto;
  ${media.l`
    margin: 20px auto;
  `}

  ${media.xl`
    max-width: 900px;
  `}

  a.internal, a.external {
    text-decoration: none;
    color: ${config.colors.black};
    border-bottom: 1px solid ${config.colors.interaction};

    &:hover {
      opacity: 0.8;
    }

    &:visited {
      color: ${config.colors.black};
    }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  padding: 0 16px 12px 16px;
  background: white;
  color: ${config.colors.darkbg};

  ${media.m`
    padding: 2rem 0;
  `}
`;

const MobileTOC = styled(TOC)`
  ${media.l`
      display: none;
    `}
`;

const DesktopTOC = styled(TOC)`
  display: none;
  ${media.l`
      display: block;
    `}
`;

type Props = {
  bannerTitle: string;
  logo?: React.ReactNode;
  bgPattern?: string;
  tocTitle?: string;
  enumerateToc?: boolean;
  locales?: LocaleCode[];
  className?: string;
  children: any; // Really hard to type
};

export const ArticleWrapper: React.VFC<Props> = ({
  bannerTitle,
  logo = null,
  bgPattern = null,
  tocTitle = null,
  enumerateToc = true,
  locales = null,
  className = null,
  children,
}) => {
  const [activeTocIndex, setActiveTocIndex] = useState(0);

  const [visibleSections, setVisibleSections] = useState<number[]>(
    new Array(children.length).map(() => 0)
  );

  const onViewChange = (
    _inView: boolean,
    entry: IntersectionObserverEntry,
    index: number
  ) => {
    const newVisibleSections = [...visibleSections];

    // Record the position of this sections topmost edge relative to viewport
    // set to NaN if the section is not visible. As these are only recorded
    // when sections enter or exit the screen, the number will be accurate
    // on initial page load, and then it will be low if sections are entering
    // from the top, high if they are entering from the bottom and NaN if they
    // have exited the screen.
    newVisibleSections[index] =
      entry.intersectionRatio > 0 ? entry.intersectionRect.top : NaN;

    setVisibleSections(newVisibleSections);
  };

  useEffect(() => {
    // Find the visible section that is highest up on the screen
    const active = visibleSections.reduce(
      (candidate, curPosition, index) =>
        // Default to setting the first section active that has been observed
        // at the top of the screen
        (curPosition === 0 && visibleSections[candidate] !== 0) ||
        // Handle initial page load with section 0 not visible
        Number.isNaN(visibleSections[candidate]) ||
        // If more than one section is on screen, select the one that is topmost
        curPosition < visibleSections[candidate]
          ? index
          : candidate,
      0
    );
    if (activeTocIndex !== active) {
      log(`Setting TOC highlight on section ${active + 1}`);
      setActiveTocIndex(active);
    }
  }, [visibleSections]);

  const tocChildren = React.Children.toArray(children).filter(
    (child: React.ReactElement) => child.props.toc
  );

  return (
    <Page className={className} bgPattern={bgPattern}>
      <ArticleWrapperHeader
        locales={locales}
        logo={logo}
        bannerTitle={bannerTitle}
      />
      <ContentWrapperOuter>
        <ContentWrapper className="contentWrapper">
          {React.Children.map(children, (child) => {
            const appendToc =
              child.type.displayName === 'Article/Typography/Intro';

            // TOC is attached only to the <Intro> Component
            // All other components witout props.toc are just returned.
            if (!child.props.toc) {
              if (!appendToc) return child;

              return (
                <>
                  <DesktopTOC
                    title={tocTitle}
                    activeIndex={activeTocIndex}
                    entries={children}
                    enumerate={enumerateToc}
                  />
                  {child}
                  <MobileTOC
                    title={tocTitle}
                    activeIndex={activeTocIndex}
                    entries={children}
                    enumerate={enumerateToc}
                  />
                </>
              );
            }

            const tocIndex = tocChildren.findIndex(
              (c: React.ReactElement) => c.props.toc === child.props.toc
            );

            return (
              <InView
                className={`toc__anchor-${tocIndex}`}
                onChange={(inView, entry) =>
                  onViewChange(inView, entry, tocIndex)
                }
              >
                {appendToc && (
                  <DesktopTOC
                    activeIndex={activeTocIndex}
                    entries={children}
                    enumerate={enumerateToc}
                  />
                )}
                {child}
                {appendToc && (
                  <MobileTOC
                    activeIndex={activeTocIndex}
                    entries={children}
                    enumerate={enumerateToc}
                  />
                )}
              </InView>
            );
          })}
        </ContentWrapper>
      </ContentWrapperOuter>
    </Page>
  );
};
