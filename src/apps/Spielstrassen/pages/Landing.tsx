import { Container } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import Link from '~/components/Link';
import { Button } from '~/components2/Button';
import { Header } from '~/components2/Header';
import { Insert as ImageInsert } from '~/components2/Image';
import { LogoFooter } from '~/components2/LogoFooter';
import config from '~/config';
import BackgroundImageB1 from '~/images/spielstrassen/landing-bg-2.jpg';
import BackgroundImageB2 from '~/images/spielstrassen/landing-bg-2@2x.jpg';
import BackgroundImageB3 from '~/images/spielstrassen/landing-bg-2@3x.jpg';
import BackgroundImageA1 from '~/images/spielstrassen/landing-bg.jpg';
import BackgroundImageA2 from '~/images/spielstrassen/landing-bg@2x.jpg';
import BackgroundImageA3 from '~/images/spielstrassen/landing-bg@3x.jpg';

import Notice from '../components/Notice';

const CTA = styled(Button)`
  margin: 2em auto;
`;

const Attribution = styled.div`
  font-size: 0.75em;
  margin-top: -2.5em;
  position: relative;
  float: right;
  right: 1em;
  z-index: 9999;

  && a {
    color: white;
    text-decoration: none;
  }
`;

const Intro = styled.div`
  margin-bottom: 3em;
`;

const Landing = () => {
  return (
    <>
      <Header to={config.routes.spielstrassen.landing}>
        Temporäre Spielstraßen für Friedrichshain-Kreuzberg
      </Header>
      <Container maxWidth="md">
        <h1>Unterstützen Sie temporäre Spielstraßen als Kiezlots:in</h1>
        <ImageInsert
          width="938"
          height="603"
          src={BackgroundImageA2}
          srcSet={`${BackgroundImageA1} 450w, ${BackgroundImageA2} 750w, ${BackgroundImageA3} 1125w`}
        />
        <Intro>
          <p>
            Kinder brauchen viel Raum zum Spielen im Freien, gerade jetzt
            während der Corona-Pandemie. Deshalb richtet das Bezirksamt
            Friedrichshain-Kreuzberg begleitend zur Spielplatzöffnung bis zu 30
            temporäre Spielstraßen ein. Damit das möglich wird, benötigt das
            Bezirksamt an Sonntagen jeweils von 13-19 Uhr Ihre Unterstützung.
          </p>
          <Link to={config.routes.spielstrassen.streets}>
            <CTA flat>Jetzt eine Spielstraße unterstützen</CTA>
          </Link>
          <Notice />
        </Intro>
        <h2>Wie funktioniert das genau?</h2>
        <ol>
          <li>
            Registrieren Sie sich hier für die Spielstraße, die Sie als
            Kiezlots:in unterstützen wollen.
          </li>
          <li>
            Das Bezirksamt kontaktiert Sie, und stellt den Kontakt zu den Teams
            der Spielstraßen her.
          </li>
          <li>
            Wenn Sie sich als Teamkapitän*in für eine neue Straße angemeldet
            haben schickt Ihnen das Bezirksamt einen Terminvorschlag. Dort
            unterschreiben Sie eine Kooperationsvereinbarung und erhalten eine
            Einweisung zum Verfahren.
          </li>
          <li>
            Bei neuen Spielstraßen: Sobald sich sieben Kiezlots:innen und ein/e
            Teamkapitän:in für eine Spielstraße gefunden haben, wird diese vom
            Bezirksamt angeordnet und eingerichtet. Bei der Umsetzung vor Ort
            ist das Bezirksamt jenseits der rechtlichen und materiellen
            Vorbereitung auf die selbständige Mitwirkung und Organisation unter
            den registrierten Anwohner*innen angewiesen.
          </li>
        </ol>
        <h2>Was müssen Sie vor Ort tun?</h2>
        <p>
          Notwendig für die Umsetzung ist die Bereitschaft der Bürger:innen,
          während der Spielzeiten eine Aufsichtsfunktion zu übernehmen. Als
          engagierte Bürger:innen sind Sie zuständig, dafür zu sorgen,
        </p>
        <ul>
          <li>dass die Absperrungen auf- und abgebaut werden,</li>
          <li>
            dass die Aufsicht in der Straße durch 2-6 Kiezlots:innen (je nach
            Größe der Spielstraße) gewährleistet ist,
          </li>
          <li>
            dass auch während der Spieltermine weiterhin dringende
            Anlieferungen, Rettungsfahrten sowie die Zufahrt für Menschen mit
            eingeschränkter Mobilität etc. sichergestellt sind,
          </li>
          <li>
            dass die Straße vor der Freigabe für den Autoverkehr frei von
            Gegenständen und von eventuell angefallenem Müll ist.
          </li>
          <li>
            Sie sollten Personen beim Betreten der Straßenabschnitte auch auf
            die Infektionsschutzregeln hinweisen. Durch das Aufrufen zur
            gegenseitigen Rücksichtnahme und durch freundliche Kommunikation
            wirken Sie darauf hin, dass die Abstände gemäß der
            Eindämmungsverordnung von 1,5 Metern beim Bewegen und von 5 Metern
            beim Rasten eingehalten werden.
          </li>
        </ul>
        <p>
          <a
            href="/uploads/spielstrassen/Hygienevorschriften_strassenlandinkinderhand.pdf"
            className="external"
          >
            Hygienevorschriften Spielstraßen
          </a>
        </p>
        <p>
          <a
            href="/uploads/spielstrassen/AnwohnerinnenInfo_Spielstrasse.pdf"
            className="external"
          >
            Informationen für die Anwohner:innen
          </a>
        </p>
        <ImageInsert
          src={BackgroundImageB2}
          srcSet={`${BackgroundImageB1} 450w, ${BackgroundImageB2} 750w, ${BackgroundImageB3} 1125w`}
        />
        <Attribution>
          <a href="https://panphotos.org/">
            Fotograf: Peter Steudtner / panphotos.org
          </a>
        </Attribution>
        <h2>Zum Hintergrund</h2>
        <p>
          Die Spielplätze im Bezirk Friedrichshain-Kreuzberg wurden nach einem
          Beschluss des Rates der Bürgermeister:innen zum 01.05.2020 wieder
          geöffnet. Die Abstandsgebote der Covid-19-Eindämmungsverordnung
          behalten aber unverändert ihre Gültigkeit. Der Bezirk ist eines der
          europaweit am stärksten besiedelten urbanen Gebiete. Mit nur 6,4 m2
          Grünraum pro Einwohner:in füllen sich die öffentlichen Räume – und
          hier besonders die Spielplätze und Parks – sehr schnell.
        </p>
        <p>
          An einigen der betreffenden Straßen wird das Straßen- und
          Grünflächenamt Wasserzapfstationen einrichten, damit auch dem
          leidenden Baumbestand durch gemeinsame nachbarschaftliche Gießaktionen
          geholfen werden kann.
        </p>
        <Link to={config.routes.spielstrassen.streets}>
          <CTA flat>Jetzt eine Spielstraße unterstützen</CTA>
        </Link>
        <LogoFooter>Bereitgestellt durch FixMyBerlin</LogoFooter>
      </Container>
    </>
  );
};

export default Landing;
