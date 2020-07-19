import React from 'react';

import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Link from '~/components/Link';
import Link2 from '~/components2/Link';
import config from '~/apps/Gastro/config';
import Button from '~/components2/Button';
import { Insert as ImageInsert } from '~/components2/Image';
import Map from '~/components2/Map';
import BackgroundImageA1 from '~/images/gastro/landing-bg.jpg';
import BackgroundImageA2 from '~/images/gastro/landing-bg@2x.jpg';
import BackgroundImageA3 from '~/images/gastro/landing-bg@3x.jpg';
import Logo from '~/apps/Gastro/components/Logo';
import Notice from '~/apps/Gastro/components/Notice';
import { getPath } from '~/apps/Gastro/routes';
import { openSignup } from '~/apps/Gastro/utils';
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

const StyledMap = styled(Map)`
  height: 30em;
  margin: 2em 0;
`;

const CTA = styled(Button)`
  ${media.m`
    width: 20rem;
    margin: 2em auto;
  `}
`;

const CTAWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const XhainLanding = ({ district }) => (
  <>
    <h1>XHain is(s)t draußen – Terrassen für Vieles</h1>
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
    <h2>Sonderflächen für Schankbetrieb, Einzelhandel und soziale Projekte</h2>
    <p>
      Das Bezirksamt Friedrichshain-Kreuzberg bietet Gastronomiebetrieben,
      Einzelhandel und sozialen Projekte die Möglichkeit, zusätzliche Flächen im
      ruhenden Verkehr temporär (Freitags bis Sonntags von 11 bis 22 Uhr oder
      Montags bis Freitags von 10 bis 20 Uhr) zum Aufstellen von Tischen oder
      zum Ausstellen von Waren zu nutzen. So können diese die Vorgaben der
      Corona-Eindämmungsverordnung umsetzen und dennoch Ihren Betrieb wieder
      aufnehmen.
    </p>
    <p>
      In der Karte sehen Sie alle bis zum 3. Juli 2020 genehmigten Anträge. Die
      jeweiligen Betriebe können die Flächen nach Beauftragung der Schilder und
      Absperrungen nutzen.
    </p>

    <StyledMap
      style={config.gastro[district?.name]?.map.style}
      bounds={district?.bounds}
      onInit={(map) => {
        map.addControl(new MapboxGL.NavigationControl({ showCompass: false }));
      }}
    />

    {openSignup(district) && (
      <Link to={getPath(district, 'signup')}>
        <CTAWrapper>
          <CTA flat>Jetzt Antrag stellen</CTA>
        </CTAWrapper>
      </Link>
    )}

    <Notice />

    <h2>Zum Hintergrund</h2>
    <p>
      Im Zuge der Lockerungen der Covid-19 Eindämmungsverordnung können
      Restaurants seit dem 15. Mai 2020 wieder Tischbedienung durchführen,
      müssen dabei aber einen Mindestabstand von 1,50 m zwischen den Gästen
      gewährleisten.
    </p>
    <p>
      Das Bezirksamt Friedrichshain-Kreuzberg bietet in dieser Situation
      Gewerbetrieben, Einzelhandel und sozialen Projekten an, Tische, Stühle und
      Auslagen temporär auf das Straßenland zu verlagern. Nach Auswertung von
      über 300 Bedarfsmeldungen und 130 Anträgen, wurden bisher 100 Genehmigung
      zur Nutzung von Sonderflächen erteilt.
    </p>
    <h2>Welche Flächen können wann genutzt werden?</h2>
    <p>
      Nach Prüfung der Anträge hat das Bezirksamt entsprechende
      verkehrsrechtliche Anordnungen getroffen. Die Genehmigungen werden mit
      Blick auf die Eindämmungsmaßnahmen befristet und bis auf weiteres
      gebührenfrei ausgesprochen. Zeitlich werden dabei zunächst Freitag,
      Samstag, Sonntag, jeweils von 11:00 Uhr bis 22:00 Uhr für die Gastronomie
      und Mo-Fr jeweils von 10 bis 20 Uhr für den Einzelhandel oder soziale
      Projekte Flächen als zusätzliche Außenflächen temporär angeboten. Die
      Nutzung der Sonderflächen erfolgt zunächst kostenfrei bis zum 31.10.2020,
      über eine Verlängerung der Maßnahme entscheidet das Bezirksamt vor Ablauf
      dieser Frist.
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
        Verpflichtung zur Einführung eines Pfandsystems für Einweggebinde bei
        der Herausgabe von Speisen nach Maßgabe des Bezirksamtes
      </li>
      <li>Freihaltung von ausreichend breiten Gehwegen (Mindestens 2 Meter)</li>
    </ol>
    <h2>Grund für die Maßnahme</h2>
    <p>
      Grund für die Maßnahme ist die notwendige Aufrechterhaltung des
      1,50m-Abstandsgebotes. Dieses führt zu einem erhöhten Bedarf an Flächen im
      Innen- und Außenbereich gegenüber den Verhältnissen vor der Pandemie.
      Insbesondere für die unter den Beschränkungen der Pandemie existenziell
      bedrohten Betriebe, aber auch für andere Organisationen mit Laufkundschaft
      steigt der Druck, entsprechend große Außenflächen zur Sicherung der
      ökonomischen Existenz anzubieten. Im Gehwegbereich ist dies mit Blick auf
      die dort auch jetzt häufig schon sehr engen Platzverhältnisse für zu Fuß
      Gehende nicht möglich und wird seitens des Bezirksamtes strikt
      unterbunden. Für solche Fälle, in denen eine nutzbare Gehwegbreite nicht
      gewährleistet werden kann, sind alle bestehenden Schankvorgärten und
      Auslagen in ihrer Breite entsprechend zu reduzieren.
    </p>
    <p>
      Die Erfahrung bzw. Genehmigungspraxis für Wochenmärkte haben gezeigt, dass
      die Erweiterung von Gewerbeflächen auf das Straßenland im Grundsatz gut
      geeignet ist, Abstandsgebote besser einzuhalten; Anders als in anderen
      Bezirken konnte mit der Beauflagung von 10-Meter-Abstandsflächen zwischen
      den Marktständen und der Erweiterung des Marktgeschehens in den
      Straßenraum verhindert werden, dass Märkte aufgrund immanenter Verstöße
      gegen die Eindämmungsverordnung geschlossen werden mussten. Weiterhin
      wurde mit insgesamt 18{' '}
      <Link2
        internal
        href="https://fixmyberlin.de/friedrichshain-kreuzberg/spielstrassen/"
      >
        temporären Spielstraßen
      </Link2>{' '}
      das Element der zeitweiligen Ausdehnung von Bewegungsräumen auf das
      Straßenland auch und gerade für nicht kommerzielle Bedarfe der
      Daseinsvorsorge erfolgreich im Bezirk implementiert.
    </p>

    <Logo />
  </>
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(XhainLanding);
