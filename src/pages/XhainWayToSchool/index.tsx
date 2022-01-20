import React from 'react';
import styled from 'styled-components';
import { ArticleHeader, ArticleWrapper, Intro } from '~/components2/Article';
import LogoFile from './assets/wappen.png';
import LogoFile2 from './assets/wappen@2x.png';
import LogoFile3 from './assets/wappen@3x.png';
import { Section01, Section02, Section03 } from './sections';

const Wrapper = styled(ArticleWrapper)`
  // background: none;
  // h2 {
  //   text-transform: none;
  // }

  // .contentWrapper {
  //   box-shadow: none;
  // }

  // .fmc-article-tocentry {
  //   margin-bottom: 0.75em;
  //   font-family: 'Roboto Slab';
  //   font-weight: 100;
  // }

  // .fmc-article-tocentry-active {
  //   font-weight: 700;
  // }
`;

const Logo = styled.img`
  height: 42px;
`;

const XhainWayToSchool = () => (
  <Wrapper
    hasToc
    tocTitle="Inhalt"
    enumerateToc={false}
    bannerTitle="Schulwegsicherheit in XHain"
    logo={
      <Logo
        src={LogoFile2}
        srcSet={`${LogoFile} 1x, ${LogoFile2} 2x, ${LogoFile3} 3x`}
        alt=""
      />
    }
  >
    <ArticleHeader
      kicker="Schulwegsicherheit in XHain"
      publishDate={new Date(2022, 1, 1, 10, 0)}
      author="VN NN, Rolle Bezirk Friedrichshain-Kreuzberg"
    >
      Sichere Schulwege für alle Schüler*innen im Bezirk
    </ArticleHeader>
    <Intro>
      Das Bezirksamt Friedrichshain-Kreuzberg möchte sichere Schulwege für alle
      Schüler*innen im Bezirk schaffen. Auf den Schulwegen im Bezirk sollen in
      den nächsten Jahren daher Maßnahmen umgesetzt werden, die es allen Kindern
      ermöglichen sicher und selbständig zur Schule zu kommen. Als wichtige
      Grundlage für diese Maßnahmen wurde eine Analyse zum Schulwegenetz
      erstellt, deren Ergebnisse hier erläutert werden.
    </Intro>
    <Section01 toc="Schulwegenetz" />
    <Section02 toc="Situation" />
    <Section03 toc="Fußerverkehr" />
    {/* <SectionIntroduction toc="Einleitung" />
    <SectionData toc="Daten&shy;grundlagen" />
    <SectionTopicalMaps toc="Themenkarten" />
    <SectionConceptMaps toc="Das ZESplus-Konzept" />
    <SectionNextSteps toc="Wie geht es weiter?" />
    <SectionContribute toc="Mitmachen" />
    <SectionAbout toc="Über das Projekt" /> */}
    {/* <ImageFull source={Image2} alt="" role="presentation" />
    <Logos /> */}
  </Wrapper>
);

export default XhainWayToSchool;
