import React from 'react';
import { ArticleHeader, Intro } from '~/components2/Article';
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
    bannerTitle="Digitale Planungstools"
    logo={
      <Logo
        src={LogoZES2}
        srcSet={`${LogoZES} 1x, ${LogoZES2} 2x, ${LogoZES3} 3x`}
        alt="Logo ZES+"
      />
    }
  >
    <ArticleHeader
      kicker="NUDAFA-Realexperiment “Digitale Planungstools”"
      publishDate={new Date('2022-10-01 10:00')}
      author="Christoph Kollert, Projektleitung Nudafa"
    >
      Entwicklung Radverkehrsatlas &amp; digitale Radnetzplanung
    </ArticleHeader>
    <Intro>
      {/* Required to display the TOC which is magically included only if the <Intro> is added here. */}
    </Intro>

    <SectionIntro toc="Einleitung" />
    <SectionFromTo toc="Quellen &amp; Ziele" />
    <SectionCurrent toc="Vorhandenes" />
    <SectionSafety toc="Sicherheit" />
    <SectionInfrastructure toc="Radinfrastruktur" />
    <SectionSurfacequality toc="Kompfort" />
    <SectionRoadClassification toc="Straßentypen" />
    <SectionNetwork toc="Zielnetz" />
    <SectionInteractive toc="Atlas" />

    <Logos />
  </Wrapper>
);
