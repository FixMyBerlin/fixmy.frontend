import React from 'react';

import ImageSrc from '~/images/amsterdam-1203305_1280.jpg';

import * as Article from '.';

export default {
  title: 'Article',
};

const LOCALES = ['de', 'en'];

export const Example = () => (
  <Article.ArticleWrapper hasToc locales={LOCALES}>
    <div toc="Einleitung">
      <Article.ArticleHeader
        toc="Einleitung"
        kicker="Kicker"
        publishDate={new Date(2020, 7, 6, 14, 0)}
        author="FixMyCity"
        locales={LOCALES}
      >
        Überschrift
      </Article.ArticleHeader>
      <Article.Intro>
        Einleitung einleitung einleitung einleitung. Einleitung Einleitung?
        Einleitung!
      </Article.Intro>
    </div>
    <div toc="Hauptteil">
      <Article.Heading toc="Hauptteil" as="h2">
        Hauptteil
      </Article.Heading>
      <Article.Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Article.Paragraph>
      <Article.ImageFull source={ImageSrc} subtitle="Bild groß" />
      <Article.Quote sourceText="Was sie alle sagen">
        Ein Hammerding, dieser Artikel
      </Article.Quote>
      {/* <Article.Map /> */}
    </div>
    <Article.Heading as="h2">Abschnitt ohne TOC-Eintrag</Article.Heading>
    <Article.Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Article.Paragraph>
    <Article.ImageMulti>
      <Article.ImageMulti.Inner source={ImageSrc} />
      <Article.ImageMulti.Inner source={ImageSrc}>
        <Article.ImageMulti.Subtitle>
          Side-by-side 2
        </Article.ImageMulti.Subtitle>
      </Article.ImageMulti.Inner>
    </Article.ImageMulti>
    <Article.List>
      <li>Eins</li>
      <li>Zwei</li>
      <li>Polizei</li>
    </Article.List>
    <Article.Image source={ImageSrc} subtitle="Bild normal" />
    <Article.List as="ol">
      <li>Drei</li>
      <li>Vier</li>
      <li>Grenadier</li>
    </Article.List>
    <div toc="Schluss">
      <Article.Heading toc="Schluss" as="h2">
        Schluss
      </Article.Heading>
      <Article.Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Article.Paragraph>
      <Article.Quote>Es war großartig</Article.Quote>
      <Article.Quote long>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Article.Quote>
    </div>
  </Article.ArticleWrapper>
);

const MAPBOX_STYLE = 'mapbox://styles/hejco/ckguzkrtq06em19l9477wwzc2';

export const WithMap = () => (
  <Article.ArticleWrapper hasToc>
    <div toc="Einleitung">
      <Article.Heading toc="Einleitung" as="h1">
        Artikel mit Karte
      </Article.Heading>
      <Article.Map mapboxStyle={MAPBOX_STYLE} />
    </div>
  </Article.ArticleWrapper>
);
