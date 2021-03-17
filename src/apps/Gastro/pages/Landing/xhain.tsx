import MapboxGL from 'mapbox-gl';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Logo from '~/apps/Gastro/components/Logo';
import Notice from '~/apps/Gastro/components/Notice';
import config from '~/apps/Gastro/config';
import { getPath } from '~/apps/Gastro/routes';
import { openSignup } from '~/apps/Gastro/utils';
import Link from '~/components/Link';
import { BaseMap } from '~/components2/BaseMap';
import { Button } from '~/components2/Button';
import { Insert as ImageInsert } from '~/components2/Image';
import { Link as Link2 } from '~/components2/Link';
import BackgroundImageA1 from '~/images/gastro/landing-bg.jpg';
import BackgroundImageA2 from '~/images/gastro/landing-bg@2x.jpg';
import BackgroundImageA3 from '~/images/gastro/landing-bg@3x.jpg';
import { media } from '~/styles/utils';

import MayorImg from './assets/hermann.jpg';

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

const Section = styled.section`
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 1px dashed ${config.colors.inactivegrey};
`;

const QuoteSection = styled.div`
  line-height: 1.37;
  color: ${config.colors.darkgrey};
  max-width: 320px;
  padding: 8px;
  margin: 0 auto;
`;

const Img = styled.img`
  width: 144px;
  display: block;
  margin: 0 auto;
`;

const BlockQuote = styled.blockquote`
  text-align: center;
  font-style: italic;
  margin: 20px 0 28px 0;
`;

const SourcePerson = styled.p`
  text-align: center;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 16px;
`;

const SourceFunction = styled.p`
  margin-top: 0;
  font-size: 12px;
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
    <h1>Xhain geht raus – Terrassen für Vieles</h1>
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
      Xhain-Terrassen 2021. Jetzt die ganze Woche nutzen und neu Anträge für
      Veranstaltungen
    </h2>
    <Section>
      <p>
        Das Bezirksamt Friedrichshain-Kreuzberg bietet Gastronomen, dem
        Einzelhandel und sozialen Projekten die Möglichkeit, Flächen im ruhenden
        Verkehr bis Ende des Jahres 2021 ab sofort an allen Wochentagen zum
        Aufstellen von Tischen oder Ausstellen von Waren zu nutzen. Damit möchte
        das Bezirksamt die Betriebe und Projekte unterstützen ihren Betrieb
        unter den schwierigen Bedingungen der
        Corona-Infektionsschutzmaßnahmenverordnung wieder aufnehmen zu können.
        Den Bürger*innen des Bezirks soll ermöglicht werden am sozialen Leben
        teilzunehmen und sich dennoch angesichts des Infektionsgeschehens sicher
        im öffentlichen Raum aufzuhalten.
      </p>

      {openSignup(district) && (
        <Link to={getPath(district, 'signup')}>
          <CTAWrapper>
            <CTA flat>Antrag stellen für Außenfläche</CTA>
          </CTAWrapper>
        </Link>
      )}

      <Notice />

      <p>
        <a href="#bedingungen">Bedingungen für Außenflächen</a>
      </p>

      <p>
        Ab sofort gibt es außerdem die Möglichkeit für Vereine oder
        Privatpersonen kulturelle, sportliche, oder bildungsbezogene
        Veranstaltungen auf geeigneten Flächen in Grünanlagen oder im Bereich
        des ruhenden Verkehrs zu beantragen.
      </p>

      {openSignup(district) && (
        <Link to={getPath(district, 'signupEvent')}>
          <CTAWrapper>
            <CTA flat>Antrag stellen für Veranstaltung</CTA>
          </CTAWrapper>
        </Link>
      )}

      <p>
        <a href="#bedingungen-veranstaltungen">
          Bedingungen für Veranstaltungen
        </a>
      </p>
    </Section>

    <Section>
      <QuoteSection>
        <Img src={MayorImg} alt="Planner Icon" />
        <BlockQuote>
          „In den Zeiten der fortlaufenden Corona-Einschränkungen, wollen wir
          den Xhainer*innen wieder ein kleines Stück mehr Freiheit ermöglichen
          und Gastronomen helfen ihren Betrieb durch das Jahr 2021 zu bringen. “
        </BlockQuote>
        <SourcePerson>Monika Herrmann</SourcePerson>
        <SourceFunction>
          Bezirksbürgermeisterin von Friedrichshain-Kreuzberg
        </SourceFunction>
      </QuoteSection>
    </Section>

    <Section>
      <h2>Wo kann ich Angebote für Xhain-Terrassen besuchen?</h2>
      <p>Karte</p>
      <p>Legende</p>
    </Section>

    <Section>
      <h2>Nächste Veranstaltungen</h2>
      <p>[Cards mit genehmigten Veranstaltungen]</p>
    </Section>

    <Section>
      <h2>Zum Hintergrund</h2>
      <p>
        Im Zuge der Lockerungen der Covid-19 Eindämmungsverordnung können
        Restaurants seit dem XX.XX. 2021 wieder öffnen und Tischbedienung
        durchführen, müssen dabei aber einen Mindestabstand von 1,50 m zwischen
        den Gästen gewährleisten.
      </p>
      <p>
        Das Bezirksamt Friedrichshain-Kreuzberg bietet in dieser Situation
        Gewerbetrieben, Einzelhandel und sozialen Projekten wie bereits im
        letzten Jahr an, Tische, Stühle und Auslagen temporär auf das
        Straßenland zu verlagern. Neu ist dabei, dass die Sondergenehmigungen
        für die ganze Woche von Montag bis Sonntag in der Zeit von 6 bis 22 Uhr
        erteilt werden.
      </p>
      <p>
        Grund für die Maßnahme ist die notwendige Aufrechterhaltung des
        1,50m-Abstandsgebotes. Dieses führt zu einem erhöhten Bedarf an Flächen
        im Innen- und Außenbereich gegenüber den Verhältnissen vor der Pandemie.
        Insbesondere für die unter den Beschränkungen der Pandemie existenziell
        bedrohten Betriebe, aber auch für andere Organisationen mit
        Laufkundschaft steigt der Druck, entsprechend große Außenflächen zur
        Sicherung der ökonomischen Existenz anzubieten. Das Angebot kann von
        Gastronomen, vom Einzelhandel, sowie von Vereinen genutzt werden.
      </p>
      <p>
        Um Veranstaltungen aus Kultur, Sport und Bildung im Freien zu
        unterstützen und das soziale Leben im Bezirk unter sicheren Bedingungen
        weiterhin zu ermöglichen bietet der Bezirk außerdem ab sofort zusätzlich
        die Möglichkeit Anträge für maximal eintägige Veranstaltungen in
        Grünflächen oder im Bereich des ruhenden Verkehrs zu beantragen. Solche
        Veranstaltungen können von Vereinen, Trägern der Kultur und von
        Privatpersonen gestellt werden.{' '}
      </p>
    </Section>

    <Section>
      <h2 id="bedingungen">
        Was sind die Bedingungen um eine Sonderfläche für meinen Betrieb /
        Verein zu beantragen?
      </h2>
      <p>
        Die Bedingung für die Genehmigung von Schank- und Auslagenbereichen im
        Straßenland sind folgende:
      </p>
      <ul>
        <li>
          Lage des Ladenlokals in verkehrslichen Nebenstraßen mit
          Parkplatzflächen direkt vor der Ladenfront.
        </li>
        <li>
          Eigenverantwortliche Durchführung der verkehrsrechtlichen Anordnung,
          inkl. Stellung von Sperren, Schildern und ggf. Personal.
        </li>
        <li>
          Sicherstellen, dass die Fläche während des Genehmigungszeitraum durch
          den Antragstellenden betreut ist, so dass eine korrekte Nutzung
          überprüft werden kann und bei möglichen Konflikten mit anderen
          Nutzungsansprüchen im Straßenland (z.B. Konflikte mit Fußgehenden oder
          dem fließenden Kfz-Verkehr) eingeschritten werden kann.
        </li>
        <li>Tägliche Reinigung der Sondernutzungsfläche.</li>
        <li>
          Zusammenstellen der Tische und Stühle / Verschluss zwischen 22:00h und
          6:00h, Einwirken auf die Gäste zur Einhaltung des Berliner
          Imissionsschutzgesetzes hinsichtlich etwaiger Lärmbelästigungen.
        </li>
        <li>
          Verpflichtung zur Einführung eines Pfandsystems für Einweggebinde bei
          der Herausgabe von Speisen nach Maßgabe des Bezirksamtes.
        </li>
        <li>
          Freihaltung von ausreichend breiten Gehwegen (Mindestens 2 Meter).
        </li>
        <li>
          Weiter gelten die allgemeinen und besonderen Nebenbestimmungen für
          Sondernutzungen
        </li>
      </ul>
      <p>
        Nach Prüfung der Anträge trifft das Bezirksamt entsprechende
        verkehrsrechtliche Anordnungen und erteilt, sofern keine Einwände
        vorliegen eine Sondergenehmigung. Die Genehmigungen werden bis zum
        31.12.2021 befristet und bis auf weiteres gebührenfrei ausgesprochen.{' '}
      </p>

      {openSignup(district) && (
        <Link to={getPath(district, 'signup')}>
          <CTAWrapper>
            <CTA flat>Antrag stellen für Außenfläche</CTA>
          </CTAWrapper>
        </Link>
      )}

      <Notice />
    </Section>

    <Section>
      <h2 id="bedingungen-veranstaltungen">
        Was sind die Bedingungen um eine Veranstaltung zu beantragen?
      </h2>
      <ul>
        <li>
          Die Veranstaltung muss einen der folgenden Zwecke
          gemeinwohlorientierter bzw. nichtkommerzieller Art dienen:
          <ul>
            <li>Kulturelle Veranstaltung</li>
            <li>Sportveranstaltung</li>
            <li>Bildungsveranstaltung</li>
            <li>Veranstaltungen mit Kiezcharakter (z.B. Nachbarschaftsfest)</li>
          </ul>
        </li>
        <li>
          Nachweis einer Haftpflichtversicherung für Veranstaltung des
          Antragstellenden
        </li>
        <li>Eigenverantwortliche Durchführung der Veranstaltung,</li>
        <li>Reinigung der Flächen im Anschluss an die Veranstaltung</li>
        <li>
          Sicherstellen, dass die Veranstaltung während gesamten Zeitraums durch
          den Antragstellenden betreut ist, und bei möglichen Konflikten mit
          Dritten eingeschritten werden kann.
        </li>
        <li>
          Beachtung des Anwohnerschutzes (nur zumutbare Lärmimmissionen;
          Maßgeblichkeit der Häufigkeit von Veranstaltungen, die Lärmstörungen
          verursachen; ein angemessener zeitlicher Abstand zu anderen Festen –
          mindestens 3 Wochen Abstand zu vorangegangenen und zu künftigen
          Veranstaltungen in demselben Quartier).{' '}
        </li>
        <li>
          Freihaltung von ausreichend breiten Gehwegen (Mindestens 2 Meter).
        </li>
        <li>
          Weiter gelten die allgemeinen und besonderen Nebenbestimmungen für
          Sondernutzungen
        </li>
        <li>
          Einhalten der Auflagen der Berliner Feuerwehr (sofern dies die
          Veranstaltung betrifft)
        </li>
      </ul>
      <p>
        Nach Prüfung der Anträge erstellt das Bezirksamt eine Sondergenehmigung
        die für eine einmalige Veranstaltung im bezeichneten Zeitraum genutzt
        werden darf. Die Genehmigungen werden bei nachgewiesener
        Gemeinnützigkeit gebührenfrei ausgesprochen, in anderen Fällen fallen
        gegebenenfalls. Genehmigungskosten im Rahmen der üblichen
        Gebührenordnung an. Anträge sind in den Zeiten von 6 bis 22 Uhr, Montag
        bis Samstag (Sonntag und Feiertags nur in Ausnahmefällen) möglich.
        Genehmigungsfähig sind ausgewiesene Flächen in Grünanlagen und Flächen
        im Bereich des ruhenden Verkehrs (Im Antragsformular auf der Karte
        ausgewiesen).
      </p>

      {openSignup(district) && (
        <Link to={getPath(district, 'signupEvent')}>
          <CTAWrapper>
            <CTA flat>Antrag stellen für Veranstaltung</CTA>
          </CTAWrapper>
        </Link>
      )}

      <Notice />
    </Section>

    <Logo />
  </>
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(XhainLanding);
