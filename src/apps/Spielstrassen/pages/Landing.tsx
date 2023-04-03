import { Container } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import Link from '~/components/Link';
import { Button } from '~/components2/Button';
import { Header } from '~/components2/Header';
import { InsertImage } from '~/components2/Image';
import { LogoFooter } from '~/components2/LogoFooter';
import config from '~/config';
import BackgroundImageB1 from '~/images/spielstrassen/landing-bg-2.jpg';
import BackgroundImageB2 from '~/images/spielstrassen/landing-bg-2@2x.jpg';
import BackgroundImageB3 from '~/images/spielstrassen/landing-bg-2@3x.jpg';
import BackgroundImageA1 from '~/images/spielstrassen/landing-bg.jpg';
import BackgroundImageA2 from '~/images/spielstrassen/landing-bg@2x.jpg';
import BackgroundImageA3 from '~/images/spielstrassen/landing-bg@3x.jpg';

// import Notice from '../components/Notice';

const CTA = styled(Button)`
  margin: 2em auto;
`;

const Intro = styled.div`
  margin-bottom: 3em;
`;

const Landing = () => {
  return (
    <>
      <Header to={config.routes.spielstrassen.landing}>
        Unterstützen Sie die temporären Spiel- und Nachbarschaftsstraßen in
        Friedrichshain-Kreuzberg!
      </Header>
      <Container maxWidth="md">
        <InsertImage
          width="938"
          height="603"
          src={BackgroundImageA2}
          srcSet={`${BackgroundImageA1} 450w, ${BackgroundImageA2} 750w, ${BackgroundImageA3} 1125w`}
        />
        <Intro>
          <p>
            Bei einer temporäre Spiel- und Nachbarschaftsstraße wird ein
            geeignetes Stück Nebenstraße regelmäßig für ein paar Stunden pro
            Woche für den PKW- und Radverkehr gesperrt und stattdessen der
            Nachbarschaft als zusätzliches Freiraumangebot zur Verfügung
            gestellt. Mehr Platz für Spiel, Sport, Bewegung und
            nachbarschaftliches Miteinander für alle!
          </p>
          <p>
            Temporäre Spiel- und Nachbarschaftsstraßen werden ehrenamtlich von
            Nachbarschaftsinitiativen betreut und bestehen so lange wie das
            nötige Engagement vorhanden ist. Je mehr Menschen als sogenannte
            Kiezlots*innen mitmachen, umso weniger Aufwand für einzelne. Es ist
            nicht schwierig und macht vor allem Spaß. Man kann dabei mit der
            Nachbarschaft plaudern oder es sich mit einem Buch gemütlich machen.
            Den zeitlichen Aufwand bestimmt man selbst, jede Stunde ist
            willkommen.
          </p>
          <p>
            Besuchen Sie eine Spielstraße in Ihrer Nähe und lassen sich
            inspirieren. Die Öffnungszeiten finden Sie in der Übersicht.
          </p>
          <Link to={config.routes.spielstrassen.streets}>
            <CTA flat>Zur Spielstraßen-Übersicht</CTA>
          </Link>
          {/* <Notice /> */}
        </Intro>
        <h2>Wie melde ich mich als Kiezlots*in?</h2>
        <ol>
          <li>
            Wählen Sie in der Übersicht eine Spielstraße, die Sie als
            Kiezlots*in unterstützen wollen.
          </li>
          <li>Geben Sie Ihren Namen und eine E-Mail-Aadresse an.</li>
          <li>
            Das Bezirksamt Friedrichshain-Kreuzberg kontaktiert Sie, und stellt
            den Kontakt zu den Teams der Spielstraßen her.
          </li>
        </ol>

        <h2>Was müssen Sie vor Ort tun?</h2>
        <ul>
          <li>dass die Absperrungen auf- und abgebaut werden,</li>
          <li>
            dass die Aufsicht in der Straße durch 3-4 Kiezlots:innen (je nach
            Größe der Spielstraße) gewährleistet ist,
          </li>
          <li>
            dass auch während der Spieltermine weiterhin Rettungsfahrten und die
            Zufahrt für Menschen mit eingeschränkter Mobilität etc.
            sichergestellt sind,
          </li>
        </ul>

        <InsertImage
          src={BackgroundImageB2}
          srcSet={`${BackgroundImageB1} 450w, ${BackgroundImageB2} 750w, ${BackgroundImageB3} 1125w`}
          attributionLink="https://panphotos.org/"
          attributionText="Fotograf: Peter Steudtner / panphotos.org"
        />
        <Link to={config.routes.spielstrassen.streets}>
          <CTA flat>Zur Spielstraßen-Übersicht</CTA>
        </Link>
        <LogoFooter>Bereitgestellt durch FixMyBerlin</LogoFooter>
      </Container>
    </>
  );
};

export default Landing;
