import React from 'react';

import { ArticleWrapper, ArticleHeader, Intro } from '~/components2/Article';

import SectionIntroduction from './sections/02_intro';
import SectionAbout from './sections/03_concept';
import SectionDataset from './sections/04_dataset';
import SectionResults from './sections/05_results';
import SectionTeam from './sections/06_team';

const Research = () => (
  <ArticleWrapper hasToc>
    <ArticleHeader
      toc="Einleitung"
      kicker="Forschungsergebnis - Strassencheck"
      publishDate={new Date(2020, 7, 6, 7, 0)}
      author="FixMyCity Team"
    >
      Studie zur subjektiven Sicherheit im Radverkehr. - Ergebnisse und
      Datensatz einer Umfrage mit 21.000 Teilnehmenden
    </ArticleHeader>
    <Intro>
      Die Mobilitätswende in Berlin und vielen anderen Städten hat begonnen. Der
      Radverkehr soll gute Infrastruktur erhalten, auf der sich alle Menschen
      sicher fühlen. Was aber heißt “sicher für alle” konkret für die Planung
      von Radinfrastruktur? Wir haben eine Umfrage zur Untersuchung des
      subjektiven Sicherheitsempfindens durchgeführt, deren Ergebnisse wir hier
      vorstellen.
    </Intro>
    <SectionIntroduction toc="Über das Projekt" />
    <SectionAbout toc="Umfragekonzept" />
    <SectionDataset toc="Datensatz der Ergebnisse" />
    <SectionResults toc="Statistische Auswertung" />
    <SectionTeam toc="Wer steht hinter der Umfrage" />
  </ArticleWrapper>
);

export default Research;
