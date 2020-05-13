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
import DeadlineWarning from '../components/DeadlineWarning';

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
          Das Bezirksamt Friedrichshain-Kreuzberg möchte Gastronomiebetrieben,
          Einzelhandel und sozialen Projekte die Möglichkeit bieten, zusätzliche
          Flächen im Straßenraum zum Aufstellen von Tischen zu nutzen. So können
          diese die Vorgaben der Corona-Eindämmungsverordnung umsetzen und
          dennoch Ihren Betrieb wieder aufzunehmen.
        </p>
        <p>
          Um den genauen Bedarf zu erfassen, können Sie als Gewerbetreibende
          oder Soziales Projekt auf dieser Seite ihr Interesse und den Bedarf an
          Flächen im Straßenraum bekunden, wenn Sie auf Grund der Abstandsgebote
          zusätzliche Flächen benötigen.
        </p>
        <Link to={config.routes.gastro.signup}>
          <CTA flat>Jetzt Bedarf anmelden</CTA>
        </Link>
        <DeadlineWarning />
        <h2>Zum Hintergrund</h2>
        <p>
          Im Zuge der Lockerungen der Covid-19 Eindämmungsverordnung können
          Restaurants zum 15. Mai 2020 wieder Tischbedienung durchführen, müssen
          dabei aber einen Mindestabstand von 1,50 m zwischen den Gästen
          gewährleisten.
        </p>
        <p>
          Das Bezirksamt Friedrichshain-Kreuzberg bietet in dieser Situation
          Gewerbetrieben, Einzelhandel und sozialen Projekte an, Tische, Stühle
          und Auslagen temporär auf das Straßenland zu verlagern. Melden Sie
          über dieses Formular bis zum Sonntag Ihren Bedarf an. Das Bezirksamt
          wertet Ihre Bedarfsmeldungen innerhalb einer Woche aus und wird auf
          dieser Grundlage entsprechende Anordnungen vorbereiten.
        </p>
        <h2>Welche Flächen können genutzt werden?</h2>
        <p>
          Je nach Dichte der Bedarfsmeldungen können Flächen im ruhenden
          Parkraum oder auf der Fahrbahn angeordnet werden. Das Stellen von
          Tischen, Stühlen und Auslagen auf der Fahrbahn wird nur möglich sein,
          wenn im entsprechenden Straßenabschnitt mehrere Gewerbetreibende und
          Projekte Bedarf angemeldet haben, sodass die Sperrung der Straße
          temporär von Freitag vormittag bis Sonntag Abend für den motorisierten
          Individualverkehr gerechtfertigt werden kann. Alternativ ist in wenig
          befahrenen Straßen das Stellen auf dem Parkstreifen, analog zum Wiener
          Modell mögich.{' '}
        </p>
        <h2>Bedingungen für die Genehmigung</h2>
        <p>
          Die Bedingung für die Genehmigung von Schank- und Auslagenbereichen im
          Straßenland sind folgende:
        </p>
        <ol>
          <li>
            Eigenverantwortliche Durchführung der verkehrsrechtlichen Anordnung,
            incl. Stellung von Sperren, Schildern und ggf. Ordner-Personal
          </li>
          <li>
            Verpflichtung zur Einführung eines Pfandsystems für Einweggebinde
            bei der Herausgabe von Speisen nach Maßgabe des Bezirksamtes
          </li>
          <li>
            Freihalten von ausreichend breiten Gehwegen (Mindestens 2 Meter)
          </li>
        </ol>
        <h2>Grund für die Maßnahme</h2>
        <p>
          Grund für die Maßnahme ist die notwenige Aufrechterhaltung des
          1,50m-Abstandsgebotes. Dieses führt zu einem erhöhten Bedarf an
          Flächen im Innen- und Aussenbereich gegenüber den Verhältnissen vor
          der Pandemie. Insbesondere für die unter den Beschränkungen der
          Pandemie existenziell bedrohten Betriebe, aber auch für andere
          Organisationen mit Laufkundschaft steigt der Druck, entsprechend große
          Aussenflächen zur Sicherung der ökonomischen Existenz anzubieten. Im
          Gehwegbereich ist dies mit Blick auf die dort auch jetzt häufig schon
          sehr engen Platzverhältnisse für zu Fuß Gehende nicht möglich und wird
          seitens des Bezirksamtes strikt unterbunden. Für solche Fälle, in
          denen eine nutzbare Gehwegbreite Breite nicht gewährleistet werden
          kann, sind alle bestehenden Schankvorgärten und Auslagen in ihrer
          Breite entsprechend zu reduzieren.
        </p>
        <p>
          Die Erfahrung, bzw. Genehmigungspraxis für Wochenmärkte in den letzten
          Wochen haben gezeigt, dass die Erweiterung von Gewerbeflächen auf das
          Straßenland im Grundsatz gut geeignet ist, Abstandsgebote besser
          einzuhalten; Anders als in anderen Bezirken konnte mit der Beauflagung
          von 10-Meter-Abstandsflächen zwischen den Marktständen und der
          Erweiterung des Marktgeschehens in den Straßenraum verhindert werden,
          dass Märkte aufgrund immanenter Verstöße gegen die
          Eindämmungsverordnung geschlossen werden mussten. Weiterhin wurde mit
          insgesamt 19 temporären Spielstraßen das Element der zeitweiligen
          Ausdehnung von Bewegungsräumen auf das Straßenland auch und gerade für
          nicht kommerzielle Bedarfe der Daseinsvorsorge erfolgreich im Bezirk
          implementiert.
        </p>
        <Link to={config.routes.gastro.signup}>
          <CTA flat>Jetzt Bedarf anmelden</CTA>
        </Link>
        <DeadlineWarning />
        <Logo />
      </Container>
    </>
  );
};

export default Landing;
