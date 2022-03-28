import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { ArticleHeader, ArticleWrapper, Intro } from '~/components2/Article';
import LogoFile from './assets/wappen.png';
import LogoFile2 from './assets/wappen@2x.png';
import LogoFile3 from './assets/wappen@3x.png';
import {
  Section01Intro,
  Section02Process,
  Section03Participate,
  Section04Mapping,
  Section05Potential,
} from './sections';

const Wrapper = styled(ArticleWrapper)`
  background: none;
  padding-bottom: 5rem;

  h2 {
    text-transform: none;
  }

  .fmc-article-tocentry {
    margin-bottom: 0.75em;
    font-family: 'Roboto Slab';
    font-weight: 100;
  }

  .fmc-article-tocentry-active {
    font-weight: 700;
  }
`;

const Logo = styled.img`
  height: 42px;
`;

const ParkingLane = () => (
  <>
    <Helmet>
      <title>Parkraumdaten in OpenStreetMap erfassen</title>
      <meta
        name="description"
        content="Die Verkehrswende braucht gute Daten – hilf dem Bezirksamt diese zu erfassen."
      />
    </Helmet>
    <Wrapper
      tocTitle="Inhalt"
      enumerateToc={false}
      bannerTitle="Daten erheben"
      logo={
        <Logo
          src={LogoFile2}
          srcSet={`${LogoFile} 1x, ${LogoFile2} 2x, ${LogoFile3} 3x`}
          alt=""
        />
      }
    >
      <ArticleHeader
        kicker="Daten erheben"
        publishDate={new Date('2022-03-01 10:00')}
      >
        Gemeinsam Daten für die Verkehrswende erheben
      </ArticleHeader>
      <Intro>
        Die Verkehrswende braucht gute Daten – hilf dem Bezirksamt diese zu
        erfassen.
      </Intro>
      <Section01Intro toc="Gute Daten" />
      <Section02Process toc="Vorgehen" />
      <Section03Participate toc="Mitmachen" />
      <Section04Mapping toc="OpenStreetMap" />
      <Section05Potential toc="Potential" />
    </Wrapper>
  </>
);

export default ParkingLane;
