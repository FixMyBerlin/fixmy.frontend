import React, { useState, useEffect, ReactElement } from 'react';
import styled from 'styled-components';
import { InView } from 'react-intersection-observer';
import debug from 'debug';

import TOC from './TOC';
import MenuButton from '~/components2/MenuButton';
import { media, breakpoints } from '~/styles/utils';
import config from '~/config';
import Header from '~/components2/Header';
import LocaleSwitcher from '~/components2/LocaleSwitcher';

const log = debug('fmc:Article:ArticleWrapper');

interface PageProps {
  bgPattern?: string;
}

const Page = styled.main<PageProps>`
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

const MobileHeader = styled(Header)`
  && {
    display: block;
    ${media.m`
    display: none;
  `}
  }
`;

const DesktopHeader = styled.div`
  display: none;
  ${media.m`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `}
`;

const OffsetMenuButton = styled(MenuButton)`
  display: inline-flex;
  ${media.l`
    && {
      padding: 30px 40px;
    }
  `}
`;

const StyledLocaleSwitcher = styled(LocaleSwitcher)`
  ${media.l`
    && {
      right: 1em;
    }
  `}
`;

const LogoWrapper = styled.div`
  padding: 12px;
  ${media.l`
    padding: 30px 40px;

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

const ArticleWrapper = ({
  bannerTitle,
  logo = null,
  bgPattern = null,
  tocTitle = null,
  hasToc = false,
  enumerateToc = true,
  tocHasActiveState = true,
  locales = null,
  className = null,
  children,
}) => {
  const [activeTocIndex, setActiveTocIndex] = useState(
    tocHasActiveState ? 0 : null
  );

  const [visibleSections, setVisibleSections] = useState<number[]>(
    new Array(children.length).map(() => 0)
  );

  const onViewChange = (
    inView: boolean,
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
    (child: ReactElement) => child.props.toc
  );

  return (
    <Page className={className} bgPattern={bgPattern}>
      <MobileHeader position="sticky" locales={locales} logo={logo}>
        {bannerTitle}
      </MobileHeader>
      <DesktopHeader>
        <OffsetMenuButton />
        {locales && <StyledLocaleSwitcher locales={locales} />}
        {logo && <LogoWrapper>{logo}</LogoWrapper>}
      </DesktopHeader>
      <ContentWrapperOuter>
        <ContentWrapper className="contentWrapper">
          {React.Children.map(children, (child) => {
            const appendToc =
              child.type.displayName === 'Introduction' && hasToc;

            const tocProps = {
              activeIndex: activeTocIndex,
              entries: children,
              enumerate: enumerateToc,
            };

            if (!child.props.toc) {
              return (
                <>
                  {appendToc && (
                    <DesktopTOC
                      hasActiveState={tocHasActiveState}
                      title={tocTitle}
                      {...tocProps}
                    />
                  )}
                  {child}
                  {appendToc && (
                    <MobileTOC
                      hasActiveState={tocHasActiveState}
                      title={tocTitle}
                      {...tocProps}
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
                {appendToc && <DesktopTOC {...tocProps} />}
                {child}
                {appendToc && <MobileTOC {...tocProps} />}
              </InView>
            );
          })}
        </ContentWrapper>
      </ContentWrapperOuter>
    </Page>
  );
};

export default ArticleWrapper;
