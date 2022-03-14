import React from 'react';
import { ArticleHeader, ImageFull, Intro } from '~/components2/Article';
import {
  SectionAbout,
  SectionConceptMaps,
  SectionContribute,
  SectionData,
  SectionIntroduction,
  SectionNetwork,
  SectionNextSteps,
} from './forschungsprojekt';
import { Logos } from './components/Logos/Logos';
import LogoZES from './components/Logos/assets/logo-zes.png';
import LogoZES2 from './components/Logos/assets/logo-zes@2x.png';
import LogoZES3 from './components/Logos/assets/logo-zes@3x.png';
import Image2 from './forschungsprojekt/images/research-2.jpg';
import { Wrapper, Logo } from './styles';

export const ZesPlusResearchPage = () => (
  <Wrapper
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
    <SectionNetwork toc="Themenkarten" />
    <SectionConceptMaps toc="Das ZESplus-Konzept" />
    <SectionNextSteps toc="Wie geht es weiter?" />
    <SectionContribute toc="Mitmachen" />
    <SectionAbout toc="Über das Projekt" />
    <ImageFull source={Image2} alt="" role="presentation" />
    <Logos />
  </Wrapper>
);
