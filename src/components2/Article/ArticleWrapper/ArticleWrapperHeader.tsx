import React from 'react';
import styled from 'styled-components';
import { Header } from '~/components2/Header';
import { LocaleSwitcher } from '~/components2/LocaleSwitcher';
import { MenuButton } from '~/components2/MenuButton';
import { media } from '~/styles/utils';
import { LocaleCode } from '~/types';

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
      margin: 30px 40px;
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

type Props = {
  bannerTitle: string;
  locales?: LocaleCode[];
  logo?: React.ReactNode;
};

export const ArticleWrapperHeader: React.VFC<Props> = ({
  locales,
  logo,
  bannerTitle,
}) => {
  return (
    <>
      <MobileHeader position="sticky" locales={locales} logo={logo}>
        {bannerTitle}
      </MobileHeader>
      <DesktopHeader>
        <OffsetMenuButton />
        {locales && <StyledLocaleSwitcher locales={locales} />}
        {logo && <LogoWrapper>{logo}</LogoWrapper>}
      </DesktopHeader>
    </>
  );
};
