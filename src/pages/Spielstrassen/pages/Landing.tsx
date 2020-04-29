import React from 'react';
import styled from 'styled-components';
import { Container, Paper } from '@material-ui/core';

import config from '~/pages/Spielstrassen/config';
import Button from '~/components2/Button';
import Link from '~/components/Link';
import { Insert as ImageInsert } from '~/components2/Image';
import BackgroundImageA1 from '~/images/spielstrassen/landing-bg.jpg';
import BackgroundImageA2 from '~/images/spielstrassen/landing-bg@2x.jpg';
import BackgroundImageA3 from '~/images/spielstrassen/landing-bg@3x.jpg';
import BackgroundImageB1 from '~/images/spielstrassen/landing-bg-2.jpg';
import BackgroundImageB2 from '~/images/spielstrassen/landing-bg-2@2x.jpg';
import BackgroundImageB3 from '~/images/spielstrassen/landing-bg-2@3x.jpg';
import DoneBadgeImg1 from '~/images/spielstrassen/done-badge.png';
import DoneBadgeImg2 from '~/images/spielstrassen/done-badge@2x.png';
import DoneBadgeImg3 from '~/images/spielstrassen/done-badge@3x.png';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Notice from '../components/Notice';
import { media } from '~/styles/utils';

const CTA = styled(Button)`
  margin: 2em auto;
`;

const Highlight = styled.p`
  margin-top: -1em;
  color: #cf0a7d;
  margin-botom: 2em;
  font-weight: bold;

  span {
    white-space: nowrap;
  }
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

const DoneBadge = styled.img`
  position: absolute;
  bottom: 5%;
  width: 50%;
  max-width: 20em;

  ${media.m`
    left: 5%;
  `}
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Landing = () => {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <h1>Helfen Sie eine temporäre Spielstraße einzurichten!</h1>
        <ImageContainer>
          <DoneBadge
            src={DoneBadgeImg2}
            srcSet={`${DoneBadgeImg1} 450w, ${DoneBadgeImg2} 750w, ${DoneBadgeImg3} 1125w`}
            alt="Vielen Dank! Die Registrierung ist jetzt geschlossen."
          />
          <ImageInsert
            src={BackgroundImageA2}
            srcSet={`${BackgroundImageA1} 450w, ${BackgroundImageA2} 750w, ${BackgroundImageA3} 1125w`}
          />
        </ImageContainer>
        <p>
          Kinder brauchen viel Raum zum Spielen im Freien, gerade jetzt während
          der Corona-Pandemie. Deshalb richtet das Bezirksamt
          Friedrichshain-Kreuzberg begleitend zur Spielplatzöffnung bis zu 30
          temporäre Spielstraßen ein. Damit das möglich wird, benötigt das
          Bezirksamt an Sonn- und Feiertagen jeweils von 12-18 Uhr Ihre
          Unterstützung.
        </p>
        <Notice />
        <h2>Wie funktioniert das genau?</h2>
        <ol>
          <li>
            Registrieren Sie sich hier für die Spielstraße, die Sie als
            Kiezlots:in unterstützen wollen.
          </li>
          <li>
            Das Bezirksamt kontaktiert Sie, sobald sich mindestens 7 Personen
            für eine Straße gefunden haben.
          </li>
          <li>
            Wenn Sie sich als Teamkapitän:in angemeldet haben schickt Ihnen das
            Bezirksamt einen Terminvorschlag. Dort unterschreiben Sie eine
            Kooperationsvereinbarung und erhalten eine Einweisung zum Verfahren.
          </li>
          <li>
            Die Spielstraße wird vom Bezirksamt angeordnet und eingerichtet. Bei
            der Umsetzung vor Ort ist das Bezirksamt jenseits der rechtlichen
            und materiellen Vorbereitung auf Ihre selbständige Mitwirkung und
            Organisation unter den registrierten Anwohner:innen angewiesen.
          </li>
        </ol>
        <Link to={config.routes.spielstrassen.streets}>
          <CTA>Jetzt eine Spielstraße unterstützen</CTA>
        </Link>
        <Highlight>
          Für alle Spielstraßen haben sich ausreichend Unterstützer:innen
          gemeldet.
        </Highlight>
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
          Die Spielplätze im Bezirk Friedrichshain-Kreuzberg werden nach einem
          Beschluss des Rates der Bürgermeister:innen zum 01.05.2020 wieder
          geöffnet. Die Abstandsgebote der Covid-19-Eindämmungsverordnung
          behalten aber unverändert ihre Gültigkeit. Der Bezirk ist eines der
          europaweit am stärksten besiedelten urbanen Gebiete. Mit nur 6,4 m2
          Grünraum pro Einwohner:in füllen sich die öffentlichen Räume – und
          hier besonders die Spielplätze und Parks – sehr schnell.
        </p>
        <p>
          An einigen der betreffenden Straßen wird das Straßen- und
          Grünflächenamt Tankwagen oder Wasserzapfstationen einrichten, damit
          auch dem leidenden Baumbestand durch gemeinsame nachbarschaftliche
          Gießaktionen geholfen werden kann.
        </p>
        <Link to={config.routes.spielstrassen.streets}>
          <CTA>Jetzt eine Spielstraße unterstützen</CTA>
        </Link>
        <Highlight>
          Für alle Spielstraßen haben sich ausreichend Unterstützer:innen
          gemeldet.
        </Highlight>
        <Logo />
      </Container>
    </>
  );
};

export default Landing;
