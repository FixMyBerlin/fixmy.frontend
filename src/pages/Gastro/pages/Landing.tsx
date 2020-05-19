import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import MapboxGL from 'mapbox-gl';

import config from '~/pages/Gastro/config';
import Map from '~/components2/Map';
import Header from '../components/Header';
import { Insert as ImageInsert } from '~/components2/Image';
import BackgroundImageA1 from '~/images/gastro/landing-bg.jpg';
import BackgroundImageA2 from '~/images/gastro/landing-bg@2x.jpg';
import BackgroundImageA3 from '~/images/gastro/landing-bg@3x.jpg';
import Logo from '../components/Logo';
import Notice from '../components/Notice';
import { media } from '~/styles/utils';

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

const StyledContainer = styled(Container)`
  h1 {
    ${media.m`
      font-size: 3em;
    `}
  }
`;

const StyledMap = styled(Map)`
  height: 30em;
  margin: 2em 0;
`;

const Landing = () => {
  return (
    <>
      <Header showInfoLink={false} />
      <StyledContainer maxWidth="md">
        <h1>XHain isst draußen – Terrassen für Vieles</h1>
        <ImageInsert
          src={BackgroundImageA2}
          srcSet={`${BackgroundImageA1} 450w, ${BackgroundImageA2} 750w, ${BackgroundImageA3} 1125w`}
          alt="Bild von Menschen, die an Tischen auf der Straße essen"
        />
        <Attribution>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://unsplash.com/@freddydo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Photo by Freddy Do on Unsplash
          </a>
        </Attribution>
        <h2>
          Bedarfsmeldung für Gastronomie, Einzelhandel und soziale Projekte
        </h2>
        <p>
          Das Bezirksamt Friedrichshain-Kreuzberg möchte Gastronomiebetrieben,
          Einzelhandel und sozialen Projekte die Möglichkeit bieten, zusätzliche
          Flächen im Straßenraum temporär Freitags, Samstags und Sonntags von 11
          bis 22 Uhr zum Aufstellen von Tischen zu nutzen. So können diese die
          Vorgaben der Corona-Eindämmungsverordnung umsetzen und dennoch Ihren
          Betrieb wieder aufnehmen.
        </p>
        <p>
          In der Karte sehen Sie alle bis zum 17. Mai 2020 eingegangenen
          Bedarfsmeldungen. Die über 300 eingegangenen Meldungen werden derzeit
          in Abgleich mit straßenrechtlichen Anforderungen geprüft. Alle
          Betriebe und Träger, die eine Interessensbekundung abgegeben haben,
          erhalten in den nächsten Tagen eine Nachricht vom Bezirksamt, mit
          Angaben, wie sie sich für eine der Straßen registrieren können.
        </p>

        <StyledMap
          style={config.gastro.map.style}
          bounds={config.gastro.map.bounds}
          onInit={(map) => {
            map.addControl(
              new MapboxGL.NavigationControl({ showCompass: false })
            );
          }}
        />
        <Notice />

        <h2>Zum Hintergrund</h2>
        <p>
          Im Zuge der Lockerungen der Covid-19 Eindämmungsverordnung können
          Restaurants zum 15. Mai 2020 wieder Tischbedienung durchführen, müssen
          dabei aber einen Mindestabstand von 1,50 m zwischen den Gästen
          gewährleisten.
        </p>
        <p>
          Das Bezirksamt Friedrichshain-Kreuzberg bietet in dieser Situation
          Gewerbetrieben, Einzelhandel und sozialen Projekten an, Tische, Stühle
          und Auslagen temporär auf das Straßenland zu verlagern. Melden Sie
          über dieses Formular bis zum Sonntag den 17.05.2020 Ihren Bedarf an.
          Das Bezirksamt wertet Ihre Bedarfsmeldungen aus und wird auf dieser
          Grundlage entsprechende Anordnungen vorbereiten.
        </p>
        <h2>Welche Flächen können wann genutzt werden?</h2>
        <p>
          Nach ca. einwöchiger Prüfung der Bedarfsanmeldungen wird das
          Bezirksamt entsprechende verkehrsrechtliche Anordnungen treffen. Die
          Genehmigungen werden mit Blick auf die Eindämmungsmaßnahmen befristet
          und bis auf weiteres gebührenfrei ausgesprochen. Je nach Aufkommen der
          Bedarfsmeldungen können Flächen im ruhenden Parkraum oder auf der
          Fahrbahn angeordnet werden. Zeitlich werden dabei zunächst Freitag,
          Samstag, Sonntag, jeweils von 11:00 Uhr bis 22:00 Uhr, Flächen als
          zusätzliche Außenflächen temporär angeboten. Das Stellen von Tischen,
          Stühlen und Auslagen auf der Fahrbahn wird nur möglich sein, wenn im
          entsprechenden Straßenabschnitt mehrere Gewerbetreibende und Projekte
          Bedarf angemeldet haben, sodass die Sperrung der Straße temporär von
          Freitag Vormittag bis Sonntag Abend für den motorisierten
          Individualverkehr gerechtfertigt werden kann. Alternativ ist in wenig
          befahrenen Straßen das Stellen auf dem Parkstreifen möglich.{' '}
        </p>
        <h2>Bedingungen für die Genehmigung</h2>
        <p>
          Die Bedingung für die Genehmigung von Schank- und Auslagenbereichen im
          Straßenland sind folgende:
        </p>
        <ol>
          <li>
            Eigenverantwortliche Durchführung der verkehrsrechtlichen Anordnung,
            inkl. Stellung von Sperren, Schildern und ggf. Personal
          </li>
          <li>
            Verpflichtung zur Einführung eines Pfandsystems für Einweggebinde
            bei der Herausgabe von Speisen nach Maßgabe des Bezirksamtes
          </li>
          <li>
            Freihaltung von ausreichend breiten Gehwegen (Mindestens 2 Meter)
          </li>
        </ol>
        <h2>Grund für die Maßnahme</h2>
        <p>
          Grund für die Maßnahme ist die notwendige Aufrechterhaltung des
          1,50m-Abstandsgebotes. Dieses führt zu einem erhöhten Bedarf an
          Flächen im Innen- und Aussenbereich gegenüber den Verhältnissen vor
          der Pandemie. Insbesondere für die unter den Beschränkungen der
          Pandemie existenziell bedrohten Betriebe, aber auch für andere
          Organisationen mit Laufkundschaft steigt der Druck, entsprechend große
          Außenflächen zur Sicherung der ökonomischen Existenz anzubieten. Im
          Gehwegbereich ist dies mit Blick auf die dort auch jetzt häufig schon
          sehr engen Platzverhältnisse für zu Fuß Gehende nicht möglich und wird
          seitens des Bezirksamtes strikt unterbunden. Für solche Fälle, in
          denen eine nutzbare Gehwegbreite nicht gewährleistet werden kann, sind
          alle bestehenden Schankvorgärten und Auslagen in ihrer Breite
          entsprechend zu reduzieren.
        </p>
        <p>
          Die Erfahrung bzw. Genehmigungspraxis für Wochenmärkte in den letzten
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

        <Logo />
      </StyledContainer>
    </>
  );
};

export default Landing;
