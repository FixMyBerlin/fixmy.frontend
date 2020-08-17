import React from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import {
  ArticleWrapper,
  ArticleHeader,
  Intro
  // LocaleSwitcher
} from '~/components2/Article';

import SectionIntroduction from './sections/02_intro';
import SectionAbout from './sections/03_concept';
import SectionDataset from './sections/04_dataset';
import SectionResults from './sections/05_results';
import SectionTeam from './sections/06_team';

const messages = defineMessages({
  tocIntroduction: {
    id: 'research.toc.introduction',
    defaultMessage: 'Einleitung'
  },
  kicker: {
    id: 'research.kicker',
    defaultMessage: 'Forschungsergebnis - Strassencheck'
  },
  authors: {
    id: 'research.authors',
    defaultMessage: 'FixMyCity Team'
  }
});

const Research = ({ intl, dispatch }) => (
  <ArticleWrapper hasToc>
    <ArticleHeader
      toc={intl.formatMessage(messages.tocIntroduction)}
      kicker={intl.formatMessage(messages.kicker)}
      publishDate={new Date(2020, 6, 6, 7, 0)}
      author={intl.formatMessage(messages.authors)}
    >
      <FormattedMessage
        id="research.title"
        defaultMessage="Studie zur subjektiven Sicherheit im Radverkehr - Ergebnisse und Datensatz einer Umfrage mit über 21.000 Teilnehmenden"
      />
    </ArticleHeader>
    <Intro>
      Die Mobilitätswende in Berlin und anderen Städten hat begonnen. Der
      Radverkehr soll gute Infrastruktur bekommen, auf der sich alle Menschen
      sicher fühlen. Was aber heißt “sicher für alle” konkret für die Planung
      von Radinfrastruktur? Wir haben eine Umfrage zur Untersuchung des
      subjektiven Sicherheitsempfindens durchgeführt, deren Ergebnisse wir hier
      vorstellen.
    </Intro>
    {/* <LocaleSwitcher /> */}
    <SectionIntroduction toc="Über das Projekt" />
    <SectionAbout toc="Umfragekonzept" />
    <SectionDataset toc="Datensatz der Ergebnisse" />
    <SectionResults toc="Statistische Auswertung" />
    <SectionTeam toc="Wer steht hinter der Umfrage" />
  </ArticleWrapper>
);

export default connect()(injectIntl(Research));
