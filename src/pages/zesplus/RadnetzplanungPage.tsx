import React from 'react';
import { ArticleHeader, Intro } from '~/components2/Article';
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
import { Wrapper } from './styles';

export const RadnetzplanungPage = () => (
  <Wrapper
    tocTitle="Inhalt"
    enumerateToc={false}
    bannerTitle="Digitale Planungstools"
  >
    <ArticleHeader
      kicker="NUDAFA-Realexperiment “Digitale Planungstools”"
      publishDate={new Date('2022/11/22 10:00')}
      author="Christoph Kollert, Projektleitung Nudafa"
    >
      Entwicklung Radverkehrsatlas und digitale Radnetzplanung
    </ArticleHeader>
    <Intro>
      {/* Required to display the TOC which is magically included only if the <Intro> is added here. */}
    </Intro>

    <SectionIntro toc="Einleitung" />
    <SectionFromTo toc="Quellen und Ziele" />
    <SectionCurrent toc="Netze und Planungen" />
    <SectionSafety toc="Sicherheit" />
    <SectionInfrastructure toc="Radinfra&shy;struktur" />
    <SectionSurfacequality toc="Komfort" />
    <SectionRoadClassification toc="Straßentypen" />
    <SectionNetwork toc="Zielnetz" />
    <SectionInteractive toc="Radverkehrsatlas" />

    <Logos />
  </Wrapper>
);
