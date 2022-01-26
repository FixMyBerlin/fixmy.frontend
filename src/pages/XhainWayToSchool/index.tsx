import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { ArticleHeader, ArticleWrapper, Intro } from '~/components2/Article';
import LogoFile from './assets/wappen.png';
import LogoFile2 from './assets/wappen@2x.png';
import LogoFile3 from './assets/wappen@3x.png';
import {
  Section01Network,
  Section02Surroundings,
  Section03Crossing,
  Section04Next,
} from './sections';

const Wrapper = styled(ArticleWrapper)`
  background: none;
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

const XhainWayToSchool = () => (
  <>
    <Helmet>
      <title>Schulwegsicherheit in Friedrichshain-Kreuzberg</title>
      <meta
        name="description"
        content="Das Bezirksamt Friedrichshain-Kreuzberg möchte sichere Schulwege für
        alle Schüler*innen schaffen. Als Grundlage für die nötigen Maßnahmen wurde diese Analyse zum Schulwegenetz erstellt."
      />
    </Helmet>
    <Wrapper
      hasToc
      tocTitle="Inhalt"
      enumerateToc={false}
      bannerTitle="Schulwegsicherheit in Xhain"
      logo={
        <Logo
          src={LogoFile2}
          srcSet={`${LogoFile} 1x, ${LogoFile2} 2x, ${LogoFile3} 3x`}
          alt=""
        />
      }
    >
      <ArticleHeader
        kicker="Schulwegsicherheit in Xhain"
        publishDate={new Date(2022, 1, 1, 10, 0)}
      >
        Sichere Schulwege für alle Schüler*innen im Bezirk
      </ArticleHeader>
      <Intro>
        Das Bezirksamt Friedrichshain-Kreuzberg möchte sichere Schulwege für
        alle Schüler*innen im Bezirk schaffen. Auf den Schulwegen im Bezirk
        sollen daher in den nächsten Jahren vielfältige Maßnahmen umgesetzt
        werden. Diese sollen es allen Kindern ermöglichen, sicher und
        selbständig zur Schule zu kommen. <br />
        Als Grundlage für diese Maßnahmen wurde eine Analyse zum Schulwegenetz
        in Fridrichshain-Kreuzberg erstellt. Die Ergebnisse dieser Analyse
        werden hier erläutert.
      </Intro>
      <Section01Network toc="Schulwegenetz" />
      <Section02Surroundings toc="Situation" />
      <Section03Crossing toc="Querungsmöglichkeiten" />
      <Section04Next toc="Maßnahmen" />

      {/* <ImageFull source={Image2} alt="" role="presentation" />
    <Logos /> */}
    </Wrapper>
  </>
);

export default XhainWayToSchool;
