import React from 'react';
import { ArticleHeader } from '~/components2/Article';
import LogoZES from './components/Logos/assets/logo-zes.png';
import LogoZES2 from './components/Logos/assets/logo-zes@2x.png';
import LogoZES3 from './components/Logos/assets/logo-zes@3x.png';
import { Logos } from './components/Logos/Logos';
import {
  SectionCurrent,
  SectionFromTo,
  SectionInfrastructure,
  SectionInteractive,
  SectionNetwork,
  SectionRoadClassification,
  SectionSafety,
  SectionSurfacequality,
} from './radnetzplanung';
import { SectionIntro } from './radnetzplanung/00_SectionIntro';
import { Logo, Wrapper } from './styles';

export const RadnetzplanungPage = () => (
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
      publishDate={new Date('2022-10-01 10:00')}
      author="Christoph Koller, Projektleitung Nudafa"
    >
      Entwicklung Radverkehrsatlas &amp; digitale Radnetzplanung
    </ArticleHeader>

    <SectionIntro toc="Einleitung" />
    <SectionCurrent toc="Ist-Zustand" />
    <SectionSafety toc="Sicherheit" />
    <SectionFromTo toc="Quellen/Ziele" />
    <SectionInfrastructure toc="Radinfrastruktur" />
    <SectionSurfacequality toc="Kompfort" />
    <SectionRoadClassification toc="Straßentypen" />
    <SectionInteractive toc="Atlas" />
    <SectionNetwork toc="Maßnahmen" />

    <Logos />
  </Wrapper>
);
