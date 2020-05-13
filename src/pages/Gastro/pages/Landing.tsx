import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

import config from '~/pages/Gastro/config';
import Button from '~/components2/Button';
import Header from '../components/Header';
import Link from '~/components/Link';
import { Insert as ImageInsert } from '~/components2/Image';
import BackgroundImageA1 from '~/images/gastro/landing-bg.jpg';
import BackgroundImageA2 from '~/images/gastro/landing-bg@2x.jpg';
import BackgroundImageA3 from '~/images/gastro/landing-bg@3x.jpg';
import Logo from '../components/Logo';

const CTA = styled(Button)`
  margin: 2em auto;
`;

// const Attribution = styled.div`
//   font-size: 0.75em;
//   margin-top: -2.5em;
//   position: relative;
//   float: right;
//   right: 1em;
//   z-index: 9999;

//   && a {
//     color: white;
//     text-decoration: none;
//   }
// `;

const Highlight = styled.p`
  margin-top: -1em;
  color: #cf0a7d;
  margin-botom: 2em;
  font-weight: bold;
  span {
    white-space: nowrap;
  }
`;

const Landing = () => {
  return (
    <>
      <Header showInfoLink={false} />
      <Container maxWidth="md">
        <h1>
          X-Hain isst draußen – Schankstraßen für Friedrichshain-Kreuzberg
        </h1>
        <ImageInsert
          src={BackgroundImageA2}
          srcSet={`${BackgroundImageA1} 450w, ${BackgroundImageA2} 750w, ${BackgroundImageA3} 1125w`}
          alt="Bild von Menschen, die an Tischen auf der Straße essen"
        />
        {/* <Attribution>
          <a href="/">Fotograf / Quelle</a>
        </Attribution> */}
        <p>
          Das Bezirksamt Friedrichshain-Kreuzberg möchte Gastronomiebetrieben
          die Möglichkeit bieten, zusätzliche Flächen im Straßenraum zum
          Aufstellen von Tischen zu nutzen. So können diese die Vorgaben der
          Corona-Eindämmungsverordnung umsetzen und dennoch Ihren Betrieb wieder
          aufzunehmen. Um den genauen Bedarf zu erfassen, können Sie als
          Gastronomiebetreiber:in auf dieser Seite ihr Interesse an erweiterten
          Flächen im Straßenraum bekunden und den gewünschten Bedarf angeben.{' '}
        </p>
        <Link to={config.routes.gastro.signup}>
          <CTA>Jetzt Bedarf anmelden</CTA>
        </Link>
        <Highlight>
          Bitte füllen Sie das Formular bis zum Donnerstag, den 14.Mai 2020 um
          16 Uhr aus
        </Highlight>
        <h2>Zum Hintergrund</h2>
        <p>
          Text: Erklärung Eindämmungsverordnung, Varianten Gastro-Straßen und
          Parkplatznutzung… Weiterer Prozess, Zeitplan, Kostenfrei?
        </p>
        <Link to={config.routes.gastro.signup}>
          <CTA>Jetzt Bedarf anmelden</CTA>
        </Link>
        <Highlight>
          Bitte füllen Sie das Formular bis zum Donnerstag, den 14.Mai 2020 um
          16 Uhr aus
        </Highlight>
        <Logo />
      </Container>
    </>
  );
};

export default Landing;
