import React from 'react';
import styled from 'styled-components';

import config from '~/config';

const Article = styled.div`
  font-size: 1em;
  color: ${config.colors.darkbg};
`;

const ArticleHeader = styled.div`
  margin-bottom: 1em;
`;

const Kicker = styled.div`
  text-transform: uppercase;
  font-size: 0.88em;
  letter-spacing: 0.25em;
  font-weight: 300;
`;

const Title = styled.h1`
  font-size: 2em;
  font-family: ${config.titleFont};
  font-weight: 700;
  margin: 0.5em 0;
  line-height: 1.25;
`;

const MetaWrap = styled.div`
  display: flex;
  font-size: 1em;
  align-items: center;
`;

const AuthorIcon = styled.div`
  width: 2.375em;
  height: 2.375em;
  flex: 0 0 2.375em;
  border-radius: 50%;
  margin-right: 0.5em;
  background-color: ${config.colors.interaction};
`;

const PublishDate = styled.div``;

const Divider = styled.div`
  height: 1.1em;
  flex: 0 0 1px;
  background: currentColor;
  margin: 0 0.5em;
`;

const Author = styled.div``;

const ArticleBody = styled.div``;

const Text = styled.p`
  font-weight: 400;
  font-family: ${config.baseFont};
  margin: 1em 0;
  line-height: 1.5;
`;

const Intro = styled(Text)`
  font-weight: 700;
`;

const SectionTitle = styled.h3`
  font-size: 1.5em;
  margin: 0.67em 0;
`;

interface QuoteProps {
  readonly sourceText: string;
}

const Quote = styled.div<QuoteProps>`
  background: white;
  box-shadow: 2px 6px 60px 0 rgba(0, 0, 0, 0.09);
  padding: 1.5em;
  font-size: 1.5em;
  font-style: italic;
  font-weight: 600;
  line-height: 1.35;
  border-radius: 6px;
  position: relative;
  margin-bottom: 1.8em;

  &:after {
    content: "${(p) => p.sourceText}";
    display: block;
    position: absolute;
    background: ${config.colors.interaction};
    font-weight: 700;
    font-size: 0.58em;
    font-style: normal;
    padding: .7em 1em;
    border-radius: 3px;
    bottom: 0;
    top: auto;
    left: 50%;
    transform: translate(-50%, 50%);
  }
`;

const ArticleMeta = ({ publishDate, author }) => {
  const publishDateFormatted = new Date(publishDate).toLocaleString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  return (
    <MetaWrap>
      <AuthorIcon />
      <PublishDate>{publishDateFormatted} Uhr</PublishDate>
      <Divider />
      <Author>
        von <strong>{author}</strong>
      </Author>
    </MetaWrap>
  );
};

export default () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 15 }}>
      <Article>
        <ArticleHeader>
          <Kicker>Forschungsergebnis - Strassencheck</Kicker>
          <Title>
            Studie zur subjektiven Sicherheit im Radverkehr. - Ergebnisse und
            Datensatz einer Umfrage mit 20.000 Teilnehmer:innen
          </Title>
          <ArticleMeta publishDate="05-28-2020" author="Heiko Rintelen" />
        </ArticleHeader>
        <ArticleBody>
          <Intro>
            Die Mobilitätswende in Berlin und vielen anderen Städten hat
            begonnen. Der Radverkehr soll gute Infrastruktur erhalten auf der
            sich alle Menschen sicher fühlen. Was aber heißt “sicher für alle”
            konkret für die Planung von Radinfrastruktur? Wir haben eine Umfrage
            zur Untersuchung des subjektiven Sicherheitsempfindens durchgeführt,
            deren Ergebnisse wir hier vorstellen.
          </Intro>
          <Text>
            Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Wegen und
            Kreuzungen die Verkehrsteilnehmer:innen subjektiv als sicher
            empfinden. Insbesondere zur differenzierten Betrachtung verknüpfter
            Merkmale, wie Führungsform der Radinfrastruktur (RVA), Ausführung,
            Breite sowie der Situation links und rechts der RVA gibt es bisher
            kaum Untersuchungen. Sind Radfahrstreifen mit Pollern die beste
            Lösung, um Konflikte zwischen Auto und Fahrrad zu vermeiden oder
            sind ausreichend breite Radstreifen entscheidend? Welchen Effekt hat
            die Einfärbung von Radstreifen? Unter welchen Bedingungen wird die
            Führung im Seitenraum oder auf der Fahrbahn als sicherer empfunden?
          </Text>
          <SectionTitle>Die Umfrage und ihr Ausgangspunkt</SectionTitle>
          <Text>
            Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Wegen und
            Kreuzungen die Verkehrsteilnehmer:innen subjektiv als sicher
            empfinden. Insbesondere zur differenzierten Betrachtung verknüpfter
            Merkmale, wie Führungsform der Radinfrastruktur (RVA), Ausführung,
            Breite sowie der Situation links und rechts der RVA gibt es bisher
            kaum Untersuchungen. Sind Radfahrstreifen mit Pollern die beste
            Lösung, um Konflikte zwischen Auto und Fahrrad zu vermeiden oder
            sind ausreichend breite Radstreifen entscheidend? Welchen Effekt hat
            die Einfärbung von Radstreifen? Unter welchen Bedingungen wird die
            Führung im Seitenraum oder auf der Fahrbahn als sicherer empfunden?
          </Text>
          <Quote sourceText="Überwältigende Zahl an Teilnehmer:innen">
            1.900 unterschiedliche Straßensituationen wurden anhand von
            3D-Bildern durch über 20.000 Teilnehmer:innen insgesamt 300.000 mal
            bewertet.
          </Quote>
          <Text>
            Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Wegen und
            Kreuzungen die Verkehrsteilnehmer:innen subjektiv als sicher
            empfinden. Insbesondere zur differenzierten Betrachtung verknüpfter
            Merkmale, wie Führungsform der Radinfrastruktur (RVA), Ausführung,
            Breite sowie der Situation links und rechts der RVA gibt es bisher
            kaum Untersuchungen. Sind Radfahrstreifen mit Pollern die beste
            Lösung, um Konflikte zwischen Auto und Fahrrad zu vermeiden oder
            sind ausreichend breite Radstreifen entscheidend? Welchen Effekt hat
            die Einfärbung von Radstreifen? Unter welchen Bedingungen wird die
            Führung im Seitenraum oder auf der Fahrbahn als sicherer empfunden?
          </Text>
        </ArticleBody>
      </Article>
    </div>
  );
};
