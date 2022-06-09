import MapboxGL from 'mapbox-gl';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@material-ui/core';

import {
  IconWrapper,
  Legend,
  LegendCol,
  LegendHeader,
  LegendItem,
  LegendItems,
  LegendSources,
} from '~/apps/Gastro/components/Legend';
import Logo from '~/apps/Gastro/components/Logo';
import Notice from '~/apps/Gastro/components/Notice';
import config from '~/apps/Gastro/config';
import { getPath } from '~/apps/Gastro/routes';
import { openSignup, setLayerVisibility } from '~/apps/Gastro/utils';
import Link from '~/components/Link';
import { BaseMap } from '~/components2/BaseMap';
import { Button } from '~/components2/Button';
import { InsertImage } from '~/components2/Image';
import BackgroundImageA1 from '~/images/gastro/landing-bg.jpg';
import BackgroundImageA2 from '~/images/gastro/landing-bg@2x.jpg';
import BackgroundImageA3 from '~/images/gastro/landing-bg@3x.jpg';
import { media } from '~/styles/utils';

import IconRepair from './assets/basics-icon-map-repair.svg?component';
import IconRestaurant from './assets/basics-icon-map-restaurant.svg?component';
import IconRetail from './assets/basics-icon-map-retail.svg?component';
import IconSocial from './assets/basics-icon-map-social.svg?component';
import MayorImg from './assets/gerold.jpg';
import MayorImg2 from './assets/gerold@2x.jpg';
import MayorImg3 from './assets/gerold@3x.jpg';

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
  border-radius: 100%;
  border: 2px solid #989898;
`;

const ImgAttribution = styled.div`
  color: ${config.colors.darkgrey};
  font-size: 12px;
  margin: 0.5em;
  text-align: center;
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
    margin: 0 auto;
  `}
`;

const CTAWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.m`
    margin: 2em 0;
  `}
`;

const MapWrapper = styled.div`
  margin: 0 -16px -16px;
  height: 30em;
`;

const LandingMap = ({ district }) => (
  <>
    <MapWrapper>
      <BaseMap
        mapboxStyle={config.gastro[district?.name]?.map.style}
        bounds={district?.bounds}
        onInit={(map) => {
          map.addControl(
            new MapboxGL.NavigationControl({ showCompass: false })
          );
          setLayerVisibility(
            map,
            district.apps.gastro.layerSets,
            district.apps.gastro.maps.landing.layerSets
          );
        }}
      />
    </MapWrapper>

    <Legend>
      <LegendHeader>Legende</LegendHeader>
      <LegendCol>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <IconRestaurant />
            </IconWrapper>{' '}
            Gastronomische Angebote
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconSocial />
            </IconWrapper>{' '}
            Soziale Angebote
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendCol>
        <LegendItems>
          <LegendItem>
            <IconWrapper>
              <IconRetail />
            </IconWrapper>{' '}
            Einzelhandel
          </LegendItem>
          <LegendItem>
            <IconWrapper>
              <IconRepair />
            </IconWrapper>{' '}
            Werkstatt
          </LegendItem>
        </LegendItems>
      </LegendCol>
      <LegendSources>
        Die Karte zeigt genehmigte Anträge auf Sondernutzung im Rahmen der Xhain
        Terrassen, die Angaben basieren auf den Angaben der Antragsstellenden.
      </LegendSources>
    </Legend>
  </>
);

const XhainLanding = ({ district }) => {
  const signupCloseDate =
    config.districts.xhain.apps.gastro.timeline.closeSignup.toLocaleDateString(
      'DE-DE'
    );
  const signupOpenDate =
    config.districts.xhain.apps.gastro.timeline.openSignup.toLocaleDateString(
      'DE-DE'
    );
  const permitEnd =
    config.districts.xhain.apps.gastro.timeline.permitEnd.toLocaleDateString(
      'DE-DE'
    );
  return (
    <>
      <h1>Xhain geht raus – Terrassen für Vieles</h1>
      <InsertImage
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
      <h2>Xhain-Terrassen 2022</h2>
      <Section>
        <p>
          Das Bezirksamt Friedrichshain-Kreuzberg bietet Gastronomen, dem
          Einzelhandel und sozialen Projekten die Möglichkeit, Flächen im
          ruhenden Verkehr bis Ende Oktober 2022 ab {signupOpenDate} an allen
          Wochentagen zum Aufstellen von Tischen oder Ausstellen von Waren zu
          nutzen. Damit möchte das Bezirksamt die Betriebe und Projekte
          unterstützen ihren Betrieb unter den schwierigen Bedingungen der
          Corona-Infektionsschutzmaßnahmenverordnung wieder aufnehmen zu können.
          Den Bürger*innen des Bezirks soll ermöglicht werden am sozialen Leben
          teilzunehmen und sich dennoch angesichts des Infektionsgeschehens
          sicher im öffentlichen Raum aufzuhalten.
        </p>
        <p>
          Eine Antragsstellung ist vom {signupOpenDate} bis zum{' '}
          {signupCloseDate} möglich.
        </p>
        <Card>
          <CardContent>
            <Typography>
              Bitte beachten Sie, dass dieses Jahr Verwaltungsgebühren in Höhe
              von <strong>51,20 EUR</strong> hierfür fällig werden.
            </Typography>
          </CardContent>
        </Card>

        {openSignup(district) && (
          <CTAWrapper>
            <Link to={getPath(district, 'signup')}>
              <CTA flat>Antrag stellen für Außenfläche</CTA>
            </Link>
            <p>
              <a href="#bedingungen" className="internal">
                Bedingungen für Außenflächen
              </a>
            </p>
          </CTAWrapper>
        )}

        <Notice />
      </Section>

      <Section>
        <QuoteSection>
          <Img
            alt="Portrait Annika Gerold"
            src={MayorImg}
            srcSet={`${MayorImg2} 2x, ${MayorImg3} 3x`}
          />
          <ImgAttribution>Foto © Kilian Vitt</ImgAttribution>
          <BlockQuote>
            „In der anhaltenden Corona-Zeit, die mit vielen Einschränkungen
            einher geht, wollen wir den Xhainer*innen weiterhin durch die
            Angebote der Xhain-Terrassen mehr Freiheit ermöglichen und damit
            gleichzeitig Gastronom*innen helfen, ihren Betrieb auch in 2022
            erfolgreich zu betreiben.“
          </BlockQuote>
          <SourcePerson>Annika Gerold</SourcePerson>
          <SourceFunction>
            Bezirksstadträtin von Friedrichshain-Kreuzberg
          </SourceFunction>
        </QuoteSection>
      </Section>

      <Section>
        <h2>Wo kann ich Angebote für Xhain-Terrassen besuchen?</h2>
        <LandingMap district={district} />
      </Section>

      <Section>
        <h2>Zum Hintergrund</h2>
        <p>
          Das Bezirksamt Friedrichshain-Kreuzberg ermöglichte in den Jahren 2020
          und 2021 im Rahmen des Projekts „Xhain-Terrassen“ insbesondere den
          Gastronomiebetrieben Parkplatzflächen im Bereich des ruhenden Verkehrs
          als zusätzliche Schankvorgartenflächen durch Herausstellen
          entsprechenden Mobiliars vorschriftsmäßig abgesichert nutzen zu
          können. Damit folgte das Bezirksamt einer dringenden Empfehlung von
          Expert*innen. Eine verstärkte Nutzung von Außenflächen aufgrund des
          geringeren Ansteckungsrisikos mit Covid-19 im Freien wurde angeraten.
        </p>
        <p>
          Aufgrund der anhaltenden Corona-Pandemie mit den aktuell extrem hohen
          Fallzahlen und der schnellen Ausbreitung der Omikron-Variante ist eine
          Fortsetzung dieses bewährten Konzepts, das zudem die Betriebe in Ihrer
          schwierigen wirtschaftlichen Situation wirksam unterstützt, auch im
          aktuellen Jahr dringend notwendig, zumal das Berliner Abgeordnetenhaus
          am 27.1.22 die Verlängerung der epidemischen Lage zunächst bis
          31.3.2022 beschlossen hat.
        </p>
        <p>
          Das Bezirksamt Friedrichshain-Kreuzberg bietet in dieser Situation
          Gewerbebetrieben, Einzelhandel und sozialen Projekten wie bereits im
          letzten Jahr an, Tische, Stühle und Auslagen temporär auf das
          Straßenland zu verlagern. Es bleibt dabei, dass die
          Sondergenehmigungen für die ganze Woche von Montag bis Sonntag in der
          Zeit von 6 bis 22 Uhr erteilt werden.
        </p>
        <p>
          Grund für die Maßnahme ist die notwendige Aufrechterhaltung des
          1,50m-Abstandsgebotes. Dieses führt zu einem erhöhten Bedarf an
          Flächen im Innen- und Außenbereich gegenüber den Verhältnissen vor der
          Pandemie. Insbesondere für die unter den Beschränkungen der Pandemie
          existenziell bedrohten Betriebe, aber auch für andere Organisationen
          mit Laufkundschaft steigt der Druck, entsprechend große Außenflächen
          zur Sicherung der ökonomischen Existenz anzubieten. Das Angebot kann
          von Gastronomiebetrieben, vom Einzelhandel, sowie von Vereinen genutzt
          werden.
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
            Lage des Ladenlokals in verkehrlichen Nebenstraßen mit
            Parkplatzflächen direkt vor der Ladenfront.
          </li>
          <li>
            Eigenverantwortliche Durchführung der verkehrsrechtlichen Anordnung,
            inkl. Stellung von Sperren, Schildern und ggf. Personal.
          </li>
          <li>
            Es ist sicherzustellen, dass die Fläche während des
            Genehmigungszeitraum durch den Antragstellenden betreut ist, so dass
            eine korrekte Nutzung überprüft werden kann und bei möglichen
            Konflikten mit anderen Nutzungsansprüchen im Straßenland (z.B.
            Konflikte mit Fußgehenden oder dem fließenden Kfz-Verkehr)
            eingeschritten werden kann.
          </li>
          <li>Tägliche Reinigung der Sondernutzungsfläche.</li>
          <li>
            Zusammenstellen der Tische und Stühle / Verschluss zwischen 22:00
            Uhr und 6:00 Uhr, Einwirken auf die Gäste zur Einhaltung des
            Berliner Imissionsschutzgesetzes hinsichtlich etwaiger
            Lärmbelästigungen.
          </li>
          <li>
            Im Sinne der Abfallvermeidung und der Zero Waste Strategie des
            Bezirkes ist bei einem Außer-Haus Verkauf von Speisen und Getränken
            die Herausgabe in gastronomischen Einwegverpackungen untersagt. Die
            Ausgabe von Speisen und Getränken zum Mitnehmen hat ausschließlich
            in Mehrwegbehältnissen zu erfolgen.
          </li>
          <li>
            Freihaltung von ausreichend breiten Gehwegen (Mindestens 2 Meter).
          </li>
          <li>
            Weiter gelten die allgemeinen und besonderen Nebenbestimmungen für
            Sondernutzungen.
          </li>
        </ul>
        <p>
          Nach Prüfung der Anträge trifft das Bezirksamt entsprechende
          verkehrsrechtliche Anordnungen und erteilt, sofern keine Einwände
          vorliegen, eine Sondergenehmigung. Die Genehmigungen werden bis zum{' '}
          {permitEnd} befristet.
        </p>

        <Card>
          <CardContent>
            <Typography>
              Bitte beachten Sie, dass dieses Jahr Verwaltungsgebühren in Höhe
              von <strong>51,20 EUR</strong> hierfür fällig werden.
            </Typography>
          </CardContent>
        </Card>

        {openSignup(district) && (
          <Link to={getPath(district, 'signup')}>
            <CTAWrapper>
              <CTA flat>Antrag stellen für Außenfläche</CTA>
            </CTAWrapper>
          </Link>
        )}

        <Notice />
      </Section>

      <Logo />
    </>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(XhainLanding);
