import React from 'react';
import styled from 'styled-components';

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
  max-width: 960px;
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
    padding: 20px 24px;
  `}
`;

export default function SinglePageWrapper({
  bgPattern = defaultBgPattern,
  hasToc = false,
  className = null,
  children
}) {
  return (
    <Page className={className} bgPattern={bgPattern}>
      <MenuButton />
      <ContentWrapperOuter>
        {hasToc && <TOC entries={children} />}
        <ContentWrapper>{children}</ContentWrapper>
      </ContentWrapperOuter>
    </Page>
  );
}
