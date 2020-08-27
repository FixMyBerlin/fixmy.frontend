import React from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { ArticleWrapper, ArticleHeader, Intro } from '~/components2/Article';
import { LocaleCode } from '~/types';

import SectionIntroduction from './sections/02_intro';
import SectionAbout from './sections/03_concept';
import SectionDataset from './sections/04_dataset';
import SectionResults from './sections/05_results';
import SectionSummary from './sections/06_summary';
import SectionTeam from './sections/07_team';

const messages = defineMessages({
  tocHeader: {
    id: 'research.toc.Header',
    defaultMessage: 'Einleitung'
  },
  tocIntroduction: {
    id: 'research.toc.introduction',
    defaultMessage: 'Über das Projekt'
  },
  tocAbout: {
    id: 'research.toc.About',
    defaultMessage: 'Umfragekonzept'
  },
  tocDataset: {
    id: 'research.toc.Dataset',
    defaultMessage: 'Datensatz der Ergebnisse'
  },
  tocResults: {
    id: 'research.toc.Results',
    defaultMessage: 'Statistische Auswertung'
  },
  tocSummary: {
    id: 'research.toc.Summary',
    defaultMessage: 'Zusammenfassung'
  },
  tocTeam: {
    id: 'research.toc.Team',
    defaultMessage: 'Wer steht hinter der Umfrage'
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

const LOCALES: LocaleCode[] = ['de', 'en', 'es'];

const Research = ({ intl }) => (
  <ArticleWrapper
    hasToc
    bannerTitle={intl.formatMessage(messages.kicker)}
    locales={LOCALES}
  >
    <ArticleHeader
      kicker={intl.formatMessage(messages.kicker)}
      publishDate={new Date(2020, 6, 6, 7, 0)}
      author={intl.formatMessage(messages.authors)}
      locales={LOCALES}
    >
      <FormattedMessage
        id="research.title"
        defaultMessage="Studie zur subjektiven Sicherheit im Radverkehr - Ergebnisse und Datensatz einer Umfrage mit über 21.000 Teilnehmenden"
      />
    </ArticleHeader>
    <Intro>
      <FormattedMessage
        id="research.introduction"
        defaultMessage="Die Mobilitätswende in Berlin und anderen Städten hat begonnen. Der Radverkehr soll gute Infrastruktur bekommen, auf der sich alle Menschen sicher fühlen. Was aber heißt “sicher für alle” konkret für die Planung von Radinfrastruktur? Wir haben eine Umfrage zur Untersuchung des subjektiven Sicherheitsempfindens durchgeführt, deren Ergebnisse wir hier vorstellen."
      />
    </Intro>
    <SectionIntroduction toc={intl.formatMessage(messages.tocIntroduction)} />
    <SectionAbout toc={intl.formatMessage(messages.tocAbout)} />
    <SectionDataset toc={intl.formatMessage(messages.tocDataset)} />
    <SectionResults toc={intl.formatMessage(messages.tocResults)} />
    <SectionSummary toc={intl.formatMessage(messages.tocSummary)} />
    <SectionTeam toc={intl.formatMessage(messages.tocTeam)} />
  </ArticleWrapper>
);

export default injectIntl(Research);
