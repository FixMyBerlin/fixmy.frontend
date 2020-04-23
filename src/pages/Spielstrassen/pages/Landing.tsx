import React from 'react';
import styled from 'styled-components';
import { Box, Container } from '@material-ui/core';

import config from '~/pages/Spielstrassen/config';
import Button from '~/components2/Button';
import Link from '~/components/Link';
import { Insert as ImageInsert } from '~/components2/Image';
import BackgroundImage3 from '~/images/spielstrassen/landing-bg@3x.jpg';
import Header from '../components/Header';

const Title = styled.h1`
  font-family: ${config.titleFont};
  line-height: 1.25em;
`;

const Wrapper = styled(Box)`
  font-size: 16px;
  line-height: 1.5em;

  h1 {
    font-family: ${config.titleFont};
    line-height: 1.25em;
  }

  h2 {
    font-size: 24px;
  }

  ol {
    padding-left: 1em;
  }

  a,
  a:link,
  a:visited,
  a:active {
    color: ${config.colors.darkbg};
    text-decoration: none;
    border-bottom: 1px solid ${config.colors.interaction};
  }
`;

const CTA = styled(Button)`
  margin: 2em auto;
`;

const Landing = () => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Title>Temporäre Spielstraßen für Friedrichshain-Kreuzberg</Title>
        <p>
          Kinder brauchen Raum zum Spielen im Freien. Besonders während der
          Corona-Pandemie ist dieser Raum oft zu eng oder gar nicht vorhanden,
          deshalb möchte das Bezirksamt Friedrichshain-Kreuzberg Kiezen
          ermöglichen temporäre Spielstraßen einzurichten. Die Spielstraße kann
          aber nur eingerichtet werden wenn Anwohner:innen das Bezirksamt
          unterstützen.
        </p>
        <ImageInsert src={BackgroundImage3} />
        <h2>Helfen Sie dabei, eine Spielstraße einzurichten</h2>
        <p>
          <strong>
            Wenn sich eine Gruppe von mindestens 7 Anwohner:innen findet, kann
            die Spielstraße eingerichtet werden.
          </strong>{' '}
          Als engagierte Bürger:innen sind Sie zuständig, dafür zu sorgen, dass
          auch während der Spieltermine weiterhin Möglichkeiten für
          Anlieferungen sowie die Zufahrt für Menschen mit eingeschränkter
          Mobilität etc. sichergestellt sind.
        </p>
        <h2>Wie funktioniert das genau?</h2>
        <ol>
          <li>
            Registrieren Sie sich für den Kiez, in dem Sie die Spielstraße
            unterstützen wollen
          </li>
          <li>
            Das Bezirksamt kontaktiert Sie, sobald sich mindestens 7 Personen
            gefunden haben.
          </li>
          <li>
            Sie erhälten einen Termin zur Registrierung beim Bezirksamt, eine
            hauptverantwortliche Person der Gruppe muss dort einen
            Kooperationsvertrag unterschreiben.
          </li>
          <li>
            Die Spielstraße wird vom Bezirksamt angeordnet und eingerichtet. Die
            Organisation der Vor Ort können Sie selbständig organisieren.
          </li>
        </ol>
        <p>
          Die genauen Anforderungen für die Betreuung der Spielstraße finden Sie
          in diesem <a href="/">PDF</a>.
        </p>
        <CTA>
          <Link to={config.routes.spielstrassen.kieze}>
            Jetzt eine Spielstraße in Ihrem Kiez unterstützen
          </Link>
        </CTA>
        <h2>Was müssen Sie vor Ort tun?</h2>
        <p>
          Notwendig für die Umsetzung ist die Bereitschaft der Initiative,
          jeweils am Samstag von 12 bis 18 Uhr eine Aufsichtsfunktion zu
          übernehmen (u.a. Aufstellen der Absperrungen, Teilnahme einer
          ausreichenden Anzahl von Ordner*innen (ca. 2-4 Ordner:innen je nach
          Größe der Spielstraße), Abbau und Entsorgung von eventuell
          angefallenem Müll). Wenn sich mindestens 7 Personen finden, die eine
          Straße betreuen, kann diese vom Bezirksamt eingerichtet werden.
        </p>
      </Container>
    </Wrapper>
  );
};

export default Landing;
