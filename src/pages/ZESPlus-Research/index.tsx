import React from 'react';
import styled from 'styled-components';

import {
  ArticleWrapper,
  ArticleHeader,
  Intro,
  Paragraph,
  Image,
  Quote,
  ImageFull,
  Heading
} from '~/components2/Article';
import { AnchorButton } from '~/components2/Button';
import Link from '~/components2/Link';
import NewsletterWidget from '~/components2/NewsletterWidget';

import Image1 from '~/images/eichwalde/research-1.jpg';
import Image2 from '~/images/eichwalde/research-2.jpg';
import LogoBMBF from '~/images/eichwalde/logo-bmbf.png';
import LogoFONA from '~/images/eichwalde/logo-fona.svg';
import LogoEichwalde from '~/images/eichwalde/logo-eichwalde.png';
import LogoZeuthen from '~/images/eichwalde/logo-zeuthen.png';
import LogoSchulzendorf from '~/images/eichwalde/logo-schulzendorf.png';
import LogoTU from '~/images/eichwalde/logo-tu.png';
import LogoFMB from '~/images/logofmb.png';
import LogoZES from '~/images/eichwalde/logo-zes.png';
import LogoZES2 from '~/images/eichwalde/logo-zes@2x.png';
import LogoZES3 from '~/images/eichwalde/logo-zes@3x.png';
import SimraSrc from '~/images/eichwalde/simra.jpg';
import { media } from '~/styles/utils';
import config from '~/config';

const LogoGrid1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 520px;
  margin: 1em auto;
`;

const LogoGrid2 = styled(LogoGrid1)`
  img {
    margin-right: 1em;
    height: 45px;
    width: auto;

    ${media.m`
      margin-right: 2em;
    `}
  }
`;

const DownloadWrapper = styled(Paragraph)`
  display: flex;
  flex-wrap: wrap;

  ${media.m`
    margin-top: -2em;
  `}

  a {
    flex-grow: 1;
    max-width: none;
    margin: 10px;
    text-align: center;
  }
`;

const LogoAnnotation = styled(Paragraph)`
  font-size: 0.8em;
  color: ${config.colors.darkgrey};
`;

const Wrapper = styled(ArticleWrapper)`
  h2 {
    text-transform: none;
  }
`;

const Logo = styled.img`
  width: 105px;
  height: 42px;
`;

const Research = () => (
  <Wrapper hasToc>
    <ArticleHeader
      toc="Einleitung"
      kicker="Forschungs&shy;projekt - ZES-Plus"
      logo={
        <Logo
          src={LogoZES2}
          srcSet={`${LogoZES} 1x, ${LogoZES2} 2x, ${LogoZES3} 3x`}
          alt="Logo ZES+"
        />
      }
      publishDate={new Date(2020, 3, 2, 15, 0)}
      author="Jörg Jennoch (Bürgermeister)"
    >
      Eich&shy;walde, Zeu&shy;then und Schulzen&shy;dorf entwickeln
      Radverkehrsnetz gemeinsam mit den Bürger:innen
    </ArticleHeader>
    <Intro>
      Die Mobilitätswende in Eichwalde, Zeuthen und Schulzendorf hat begonnen!
      Der Radverkehr soll eine bessere Infrastruktur erhalten, auf der alle
      Menschen komfortabel vorankommen und sich sicher fühlen – auf dem Weg zur
      Arbeit, zur Schule, zur S-Bahn, zu Freunden und Bekannten, zum Sport und
      zum Einkauf
    </Intro>
    <Paragraph>
      Um dies zu erreichen, entwickeln die Gemeinden gemeinsam mit FixMyCity und
      der TU Berlin ein interkommunales Radverkehrskonzept mit dem Namen{' '}
      <strong>ZESplus</strong>. Der Name <strong>ZESplus</strong> verweist dabei
      auf die Zusammenarbeit der Gemeinden Zeuthen, Eichwalde und Schulzendorf,
      welche auf Grunde der räumlichen Nähe bereits in vielen Punkten
      kooperieren. Das “plus” steht für eine Aufwertung des bereits vorhandenen
      Radnetzes, aber auch für die Einbeziehung der lokalen Initiativen sowie
      des direkten Umfelds, in Form der Nachbargemeinden und des BER.
    </Paragraph>
    <Image source={Image1} alt="" role="presentation" />
    <Paragraph>
      Finanziert wird diese Kooperation durch die „MobilitätsWerkStadt 2025“ des
      Bundesministeriums für Forschung und Entwicklung. Eine wichtige Grundlage
      für Projekt bildete auch die Vorarbeit der lokalen Initiative{' '}
      <Link href="https://www.radnetz-lds.de/">
        Netzwerk fahrradfreundliches LDS (-Nord)
      </Link>
      .
    </Paragraph>
    <Paragraph>
      Auch Sie als Bürger*innen können dabei helfen, indem Sie die SimRa-App
      nutzen und uns so dabei unterstützen den Radverkehr in der Region besser
      zu verstehen und mit konkreten Maßnahmen darauf zu reagieren. Außerdem
      können Sie sich auf dieser Seite über den Projektverlauf informieren und
      sich mit Anregungen und Fragen an uns wenden.
    </Paragraph>
    <Heading as="h2" toc="Radverkehr für die Gemeinden ZES">
      Warum ist der Radverkehr wichtig für die Gemeinden?
    </Heading>
    <Quote long sourceText="Jörg Jenoch, Bürgermeister Eichwalde">
      „Oft sind wir noch auf unsere Autos angewiesen. Doch für Wege innerhalb
      der Gemeinden sollte das Fahrrad das Verkehrsmittel der Wahl werden. Auch
      unsere Kinder sollen auf dem Rad eigenständig und sicher zu ihren
      Freunden, zur Schule, zum Sport oder an die Badewiese kommen. Dafür
      brauchen wir gute Angebote für den Radverkehr, von denen wir letztendlich
      alle profitieren.“
    </Quote>
    <Paragraph>
      Viele Wege innerhalb der drei eng verflochtenen Gemeinden sind kürzer als
      5 km und damit eigentlich leicht mit dem Fahrrad zurückzulegen. Doch auch
      wenn bereits viele Radwege vorhanden sind, gibt es in jeder der drei
      Gemeinden aktuell noch Missstände, die das Radfahren erschweren. Diese
      sollen durch das Konzept behoben werden, sodass das Rad für Alltagswege
      innerhalb der Gemeinden eine noch attraktivere Alternative zum Auto
      bildet. Dabei ist wichtig, Konflikte mit dem Fußverkehr und dem Auto zu
      vermeiden, um die Sicherheit für allen Verkehrsteilnehmer*innen zu
      erhöhen.
    </Paragraph>
    <Paragraph>
      Bereits jetzt haben Eichwalde, Zeuthen und Schulzendorf ein hohes
      Aufkommen von Pendler*innen zu den Nachbargemeinden, dem BER oder nach
      Berlin. Mit der Inbetriebnahme des Berliner Flughafens BER ist mit einer
      signifikanten Ansiedlung von Gewerbe im Umfeld des Flughafens sowie
      schätzungsweise bis zu 135.000 neuen Arbeitsplätzen im Flughafenumland
      auszugehen. Dies wird eine erheblich anwachsende Verkehrslast in der
      Region zur Folge haben. Durch die enge Verflechtung der ZES-Gemeinden mit
      ihrem direkten Umfeld (Wildau, Königs-Wusterhausen und BER) ergibt sich
      jedoch ein hohes Potenzial für eine Verlagerung hin zum Radverkehr. Dies
      wollen die beteiligten Gemeinden aufgreifen und die Entwicklung rund um
      den BER nutzen, um eine nachhaltige Mobilität in der Region
      sicherzustellen.
    </Paragraph>
    <Paragraph>
      <Link href="/">
        Stellungnahme der Bürgermeister der drei Gemeinden zum Ausbau des
        Radverkehrs
      </Link>
    </Paragraph>
    <Paragraph>
      Um im Alltagsverkehr auch auf mittlerer Distanz Alternativen zum MIV
      (Motorisierter Individualverkehr) zu schaffen, sind dabei besonders
      durchgehende, überörtliche Verbindungen erforderlich, welche eine
      störungsfreie Fahrt auf dem Fahrrad oder dem Pedelec zu den
      Nachbargemeinden oder dem BER ermöglichen. Ebenso ist eine funktionale,
      leistungsfähige Verknüpfung zwischen dem Radverkehr und dem ÖPNV
      essentiell. Neben der Förderung des Alltagsradverkehrs innerhalb der
      ZES-Gemeinden stehen dies beiden Punkte dabei ebenso im Fokus der
      Konzepterstellung.
    </Paragraph>
    <Heading as="h2" toc="Mitmachen">
      Mitmachen - jetzt SimRa-App nutzen!
    </Heading>
    <Paragraph>
      Laden Sie die SimRa-App der TU Berlin auf Ihr Handy und zeichnen Sie Ihre
      Strecken beim Radfahren auf. Damit sammeln Sie wertvolle Daten, die die
      Netzplanung in der Verwaltung unterstützen. Die Aufzeichnung erfolgt unter
      strengen Datenschutzbestimmungen und Sie können die Daten selber nach
      Ihren Wünschen anonymisieren.
    </Paragraph>
    <Paragraph>
      <Link href="https://www.digital-future.berlin/forschung/projekte/simra/">
        Mehr Informationen zum SimRa-Projekt
      </Link>
    </Paragraph>
    <Image source={SimraSrc} alt="Screenshots der SimRa-App" />
    <DownloadWrapper>
      <AnchorButton
        flat
        href="https://play.google.com/store/apps/details?id=de.tuberlin.mcc.simra.app&hl=de"
      >
        App für Android laden
      </AnchorButton>
      <AnchorButton
        flat
        href="https://apps.apple.com/de/app/simra/id1459516968"
      >
        App für iOS laden
      </AnchorButton>
      <AnchorButton
        flat
        ghost
        href="http://www.redaktion.tu-berlin.de/fileadmin/fg344/simra/SimRa.apk"
      >
        App für Android/LineageOS ohne Playstore laden
      </AnchorButton>
    </DownloadWrapper>
    <Heading as="h2" toc="Über das Projekt">
      Über das Projekt NUDAFA
    </Heading>
    <Paragraph>
      Um den Radverkehr in den Gemeinden Eichwalde, Zeuthen und Schulzendorf zu
      stärken, soll ein integriertes Radverkehrsnetz entwickelt werden. Ziel des
      BMBF-geförderten Forschungsprojektes zur “Nutzerdaten-gestützten Planung
      eines integrierten Fahrradverkehrsnetzes” (NUDAFA) ist es, gemeinsam mit
      den lokalen Akteuren die Eignung des Straßennetzes im Siedlungsraum der
      Gemeinden Eichwalde, Zeuthen und Schulzendorf zu klassifizieren. Außerdem
      werden Grundlagendaten zur Entwicklung der Netzplanung aufbereitet.
      Dadurch wird die Konzepterstellung maßgeblich unterstützt und die
      Netzplanung kann besser an den tatsächlichen Bedarfen der Bürger*innen
      angepasst werden. Neben der Bewertung von räumlichen Parametern, der
      Verkehrsbedingungen sowie der vorhandenen Radverkehrsanlagen werden dabei
      (mit SimRa) auch Aspekte der subjektiven Sicherheit und des Fahrkomforts
      integriert. Das Ergebnis der Klassifizierung wird in Form einer
      interaktiven Karte dargestellt und auf dieser Seite veröffentlicht.
    </Paragraph>
    <Heading as="h2" toc="Newsletter und Feedback">
      Newsletter und Feedback?
    </Heading>
    <Paragraph>
      Abonnieren Sie unseren Newsletter um aktuelle Informationen zum Projekt zu
      erhalten.
    </Paragraph>
    <Paragraph>
      <NewsletterWidget height={203} />
    </Paragraph>
    <Paragraph>
      Wenn Sie Fragen zum Projekt oder Feedback haben senden Sie eine E-Mail an
      den Projektleiter Christoph Kollert.
    </Paragraph>
    <Paragraph>
      <AnchorButton flat href="mailto:Christoph.Kollert@eichwalde.de">
        Feedback an das Projektteam
      </AnchorButton>
    </Paragraph>
    <ImageFull source={Image2} alt="" role="presentation" />
    <LogoGrid1>
      <img
        src={LogoBMBF}
        alt="Logo Bundesministerium für Bildung und Forschung"
      />
      <LogoFONA />
    </LogoGrid1>
    <LogoAnnotation>Projektpartner:</LogoAnnotation>
    <LogoGrid2>
      <img alt="Wappen Eichwalde" src={LogoEichwalde} />
      <img alt="Wappen Zeuthen" src={LogoZeuthen} />
      <img alt="Wappen Schulzendorf" src={LogoSchulzendorf} />
      <img alt="Logo FixMyBerlin" src={LogoFMB} />
      <img alt="Logo TU" src={LogoTU} />
    </LogoGrid2>
  </Wrapper>
);

export default Research;
