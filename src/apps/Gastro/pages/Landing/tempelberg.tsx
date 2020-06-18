import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';

import config from '~/apps/Gastro/config';
import Link from '~/components/Link';
import Button from '~/components2/Button';
import { Insert as ImageInsert } from '~/components2/Image';
import BackgroundImageA1 from '~/images/gastro/landing-bg.jpg';
import BackgroundImageA2 from '~/images/gastro/landing-bg@2x.jpg';
import BackgroundImageA3 from '~/images/gastro/landing-bg@3x.jpg';
import Logo from '~/apps/Gastro/components/Logo';
import Notice from '~/apps/Gastro/components/Notice';
import { getPath } from '~/apps/Gastro/routes';
import { openSignup } from '~/apps/Gastro/utils';

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

const CTA = styled(Button)`
  margin: 2em auto;
`;

const XhainLanding = ({ district }) => (
  <>
    <h1>Terrassen für Tempelhof-Schöneberg</h1>
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
    <h2>Tempelhof-Schöneberg is(s)t draußen - Terrassen für die Gastronomie</h2>
    <p>
      Das Bezirksamt Tempelhof-Schöneberg möchte Gastronomiebetrieben die
      Möglichkeit bieten, zusätzliche Flächen im Straßenraum temporär am
      Wochenende und/oder Werktags von 10 bis 22 Uhr zum Aufstellen von Tischen
      zu nutzen. So können diese die Vorgaben der Corona-Eindämmungsverordnung
      umsetzen und dennoch Ihren Betrieb wieder aufnehmen.
    </p>
    <p>
      Um den genauen Bedarf zu erfassen, können Sie als Gastronomiebetreiber:in
      auf dieser Seite ihr Interesse und den Bedarf an Flächen im Straßenraum
      bekunden, wenn Sie auf Grund der Abstandsgebote zusätzliche Flächen
      benötigen. Nach Sichtung der Bedarfsmeldungen entscheidet das Bezirksamt
      über das weitere Vorgehen.
    </p>

    {openSignup(district) && (
      <Link to={getPath(district, 'signup')}>
        <CTA flat>Jetzt Interesse anmelden</CTA>
      </Link>
    )}

    <Notice />

    <h2>Zum Hintergrund</h2>
    <p>
      Im Zuge der Lockerungen der Covid-19 Eindämmungsverordnung können
      Restaurants zum 15. Mai 2020 wieder Tischbedienung durchführen, müssen
      dabei aber einen Mindestabstand von 1,50 m zwischen den Gästen
      gewährleisten.
    </p>
    <p>
      Das Bezirksamt Tempelhof-Schöneberg möchte zunächst die Bedarfe an
      zusätzlichen Flächen im Bereich des Gehwegs und des ruhenden Verkehrs für
      das Aufstellen von Tischen und Stühlen durch die Gastronomie prüfen.
      Deshalb können Sie über dieses Formular bis zum 22. Juni um 10 Uhr Ihren
      Bedarf melden. Das Bezirksamt wertet Ihre Bedarfsmeldungen aus und wird
      auf dieser Grundlage weitere Entscheidungen treffen.
    </p>
    <h2>Bedingungen für die Genehmigung</h2>
    <p>
      Die Bedingung für die Genehmigung von Schank- und Auslagenbereichen im
      Straßenland sind folgende:
    </p>
    <ol>
      <li>
        Eigenverantwortliche Durchführung der verkehrsrechtlichen Anordnung,
        inklusive Stellung von Sperren, Schildern und ggf. Ordner-Personal.
        Regelmäßige Überprüfung des Absperrmaterials.
      </li>
      <li>
        Verpflichtung zur Einführung eines Pfandsystems für Einweggebinde bei
        der Herausgabe von Speisen nach Maßgabe des Bezirksamtes.
      </li>
      <li>Freihalten von ausreichend breiten Gehwegen (mindestens 2 Meter).</li>
    </ol>
    <h2>Grund für die Maßnahme</h2>
    <p>
      Grund für die Maßnahme ist die notwendige Aufrechterhaltung des
      1,50m-Abstandsgebotes. Dieses führt zu einem erhöhten Bedarf an Flächen im
      Innen- und Außenbereich gegenüber den Verhältnissen vor der Pandemie.
      Insbesondere für die unter den Beschränkungen der Pandemie existenziell
      bedrohten Gatronomiebetriebe steigt der Druck, entsprechend große
      Außenflächen zur Sicherung der ökonomischen Existenz anzubieten. Im
      Gehwegbereich ist dies mit Blick auf die dort auch jetzt häufig schon sehr
      engen Platzverhältnisse für zu Fuß Gehende nicht möglich und wird seitens
      des Bezirksamtes strikt unterbunden. Für solche Fälle, in denen eine
      nutzbare Gehwegbreite nicht gewährleistet werden kann, sind alle
      bestehenden Schankvorgärten und Auslagen in ihrer Breite entsprechend zu
      reduzieren.
    </p>

    {openSignup(district) && (
      <Link to={getPath(district, 'signup')}>
        <CTA flat>Jetzt Interesse anmelden</CTA>
      </Link>
    )}

    <Notice />

    <Logo />
  </>
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(XhainLanding);
