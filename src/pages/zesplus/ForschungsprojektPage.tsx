import React from 'react';
import { ArticleHeader, ImageFull, Intro, Quote } from '~/components2/Article';
import { Logos } from './components/Logos/Logos';
import SvgLogoNudafa from './components/nudafa-logo.svg';
import {
  SectionIntroduction,
  SectionModellprojekt,
  SectionPartner,
  SectionRadverkehrskonzept,
  SectionReallabor,
  SectionResults,
  SectionTeam,
} from './forschungsprojekt';
import IntroImage from './forschungsprojekt/images/intro-stadtradeln.jpg';
import { Wrapper } from './styles';

export const ForschungsprojektPage = () => (
  <Wrapper
    tocTitle="Inhalt"
    enumerateToc={false}
    bannerTitle="Forschungs&shy;projekt"
    logo={<SvgLogoNudafa style={{ height: '45px' }} />}
  >
    <ArticleHeader
      kicker="Ein BMBF-gefördertes Modellprojekt der #MobilitätsWerkStadt 2025"
      publishDate={new Date('2022/11/22 10:00')}
      author="Christoph Kollert"
    >
      Das NUDAFA-Reallabor für interkommunale Radverkehrsförderung
    </ArticleHeader>
    <ImageFull
      source={IntroImage}
      alt="Die Bürgermeisterinnen und Bürgermeister der sechs Partnergemeinden und Städte bei einer Rundfahrt durch die Region, hier vor dem Rathaus in Eichwalde"
      role="presentation"
    />
    <Intro>
      <Quote long sourceText="Jörg Jenoch, Bürgermeister Gemeinde Eichwalde">
        „Anfangs stand NUDAFA nur für ‚Nutzer-Datengestütztes
        Fahrradverkehrsnetz‘ – heute stehen NUDAFA für die Erprobung praxisnaher
        Ansätze zur Radverkehrsförderung in kleinen und mittleren Kommunen.“
      </Quote>
    </Intro>

    <SectionIntroduction toc="Einleitung" />
    <SectionResults toc="Projekt&shy;ergebnisse" />
    <SectionReallabor toc="Reallabor" />
    <SectionModellprojekt toc={null} />
    <SectionRadverkehrskonzept toc={null} />
    <SectionTeam toc="Über uns" />
    <SectionPartner toc="Kooperationspartner" />

    <Logos />
  </Wrapper>
);
