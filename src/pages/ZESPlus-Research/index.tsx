import React from 'react';
import styled from 'styled-components';
import {
  ArticleHeader,
  ArticleWrapper,
  ImageFull,
  Intro,
} from '~/components2/Article';
import LogoZES from './components/Logos/assets/logo-zes.png';
import LogoZES2 from './components/Logos/assets/logo-zes@2x.png';
import LogoZES3 from './components/Logos/assets/logo-zes@3x.png';
import Logos from './components/Logos/Logos';
import SectionIntroduction from './sections/01_introduction';
import SectionData from './sections/02_data';
import SectionTopicalMaps from './sections/03_topical_maps';
import SectionConceptMaps from './sections/04_concept_maps';
import SectionNextSteps from './sections/05_next_steps';
import SectionContribute from './sections/06_contribute';
import SectionAbout from './sections/07_about';
import Image2 from './sections/images/research-2.jpg';

const Wrapper = styled(ArticleWrapper)`
  background: none;
  h2 {
    text-transform: none;
  }

  .contentWrapper {
    box-shadow: none;
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
  width: 105px;
  height: 42px;
`;

const ZESPlusResearch = () => (
  <Wrapper
    hasToc
    tocTitle="Inhalt"
    enumerateToc={false}
    bannerTitle="Forschungs&shy;projekt - ZES-Plus"
    logo={
      <Logo
        src={LogoZES2}
        srcSet={`${LogoZES} 1x, ${LogoZES2} 2x, ${LogoZES3} 3x`}
        alt="Logo ZES+"
      />
    }
  >
    <ArticleHeader
      kicker="Modellprojekt der MobilitätsWerkStatt 2025"
      publishDate={new Date(2020, 11, 15, 10, 0)}
      author="Jörg Jenoch, Bürgermeister Eichwalde"
    >
      Radverkehr neu denken: Innovative Ansätze der Radverkehrs&shy;planung in
      Eichwalde, Zeuthen und Schulzendorf
    </ArticleHeader>
    <Intro>
      Der Radverkehr in Zeuthen, Eichwalde und Schulzendorf soll eine bessere
      Infrastruktur erhalten, auf der alle Menschen komfortabel vorankommen und
      sich sicher fühlen – auf dem Weg zur Arbeit, zur Schule, zur S-Bahn, zu
      Freunden und Bekannten, zum Sport und zum Einkauf. Um dies zu erreichen,
      wird aktuell ein innovatives, partizipatives und interkommunales
      Radverkehrskonzept erstellt.
    </Intro>
    <SectionIntroduction toc="Einleitung" />
    <SectionData toc="Daten&shy;grundlagen" />
    <SectionTopicalMaps toc="Themenkarten" />
    <SectionConceptMaps toc="Das ZESplus-Konzept" />
    <SectionNextSteps toc="Wie geht es weiter?" />
    <SectionContribute toc="Mitmachen" />
    <SectionAbout toc="Über das Projekt" />
    <ImageFull source={Image2} alt="" role="presentation" />
    <Logos />
  </Wrapper>
);

export default ZESPlusResearch;
