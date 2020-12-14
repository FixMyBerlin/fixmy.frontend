import React from 'react';
import styled from 'styled-components';

import {
  ArticleWrapper,
  ArticleHeader,
  Intro,
  Paragraph,
  Image,
} from '~/components2/Article';
import Link from '~/components2/Link';

import Image1 from '~/images/eichwalde/research-1.jpg';
import LogoZES from '~/images/eichwalde/logo-zes.png';
import LogoZES2 from '~/images/eichwalde/logo-zes@2x.png';
import LogoZES3 from '~/images/eichwalde/logo-zes@3x.png';

import Logos from './components/Logos';
import SectionCycling from './sections/02_cycling';
import SectionSafety from './sections/03_safety';
import SectionContribute from './sections/04_contribute';
import SectionAbout from './sections/05_about';
import SectionNewsletter from './sections/06_newsletter';
import SectionQuality from './sections/03_quality';
import SectionNetwork from './sections/03_network';

const Wrapper = styled(ArticleWrapper)`
  background: none;
  h2 {
    text-transform: none;
  }

  .contentWrapper {
    box-shadow: none;
  }

  .fmc-article-tocentry {
    margin-bottom: 0.75em;
  }
`;

const Logo = styled.img`
  width: 105px;
  height: 42px;
`;

const Research = () => (
  <Wrapper
    hasToc
    tocTitle="Inhalt"
    enumerateToc={false}
    bannerTitle="Forschungs&shy;projekt - ZES-Plus"
    logo={
      <Logo
        src={LogoZES2}
        srcSet={`${LogoZES} 1x, ${LogoZES2} 2x, ${LogoZES3} 3x`}
        alt="Logo ZES+"
      />
    }
  >
    <ArticleHeader
      toc="Einleitung"
      kicker="Forschungs&shy;projekt - ZES-Plus"
      publishDate={new Date(2020, 6, 29, 10, 0)}
      author="Jörg Jenoch, Bürgermeister Eichwalde"
    >
      Eich&shy;walde, Zeu&shy;then und Schulzen&shy;dorf entwickeln
      Radverkehrsnetz gemeinsam mit den Bürger*innen
    </ArticleHeader>
    <Intro>
      Die Mobilitätswende in Eichwalde, Zeuthen und Schulzendorf hat begonnen!
      Der Radverkehr soll eine bessere Infrastruktur erhalten, auf der alle
      Menschen komfortabel vorankommen und sich sicher fühlen – auf dem Weg zur
      Arbeit, zur Schule, zur S-Bahn, zu Freunden und Bekannten, zum Sport und
      zum Einkauf.
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
      Finanziert wird diese Kooperation durch die{' '}
      <Link href="https://www.fona.de/de/massnahmen/foerdermassnahmen/mobilitaet-in-der-stadt.php">
        „MobilitätsWerkStadt 2025“
      </Link>{' '}
      des Bundesministeriums für Forschung und Entwicklung. Eine wichtige
      Grundlage für Projekt bildete auch die Vorarbeit der lokalen Initiative{' '}
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
    <SectionCycling toc="Radverkehr für die Gemeinden ZES" />
    <SectionQuality toc="Auswertung der Oberflächen und Radinfrastruktur" />
    <SectionSafety toc="Auswertung der Sicherheit" />
    <SectionNetwork toc="Vorbereitung der Netzplanung" />
    <SectionContribute toc="Mitmachen" />
    <SectionAbout toc="Über das Projekt" />
    <SectionNewsletter toc="Newsletter und Feedback" />
    <Logos />
  </Wrapper>
);

export default Research;
