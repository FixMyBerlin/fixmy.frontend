import React from 'react';

import { Paragraph, Heading } from '~/components2/Article';

const SectionTeam = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Wer steht hinter der Umfrage
    </Heading>
    <Paragraph>
      FixMyCity unterstützt Städte bei der Umsetzung der Verkehrswende. Das Team
      setzt sich aus Entwickler:innen, Designer:innen, Verkehrsplaner:innen
      sowie Datenspezialist:innen zusammen und entwickelt digitale Tools, die
      eine offene und agile Verwaltungsarbeit ermöglichen. Um Städte und
      Kommunen auf diesem Weg zu begleiten, entwickeln wir Open Government
      Werkzeuge, die es Verwaltungen ermöglichen, die Verkehrswende gemeinsam
      mit den Bürger:innen umzusetzen. Unsere digitalen Tools zur einfachen
      Bedarfsermittlung, effizienten Projektsteuerung, aktiven
      Bürgerkommunikation, und intelligenten Datenanalyse beschleunigen die
      Radverkehrsplanung und erhöhen ihre Akzeptanz.
    </Paragraph>
    <Paragraph>
      Das Team von FixMyCity arbeitet im CityLAB Berlin, wo auch die auf dieser
      Seite beschriebene Umfrage entstanden ist. Wenn Sie mehr über uns erfahren
      wollen, besuchen Sie uns unter{' '}
      <a href="https://fixmycity.de">fixmycity.de</a> oder nehmen Sie direkt
      Kontakt mit uns auf.
    </Paragraph>
    <Paragraph>
      Kontakt:
      <br />
      Tel: 030 - 54 90 86 65
      <br />
      hello@fixmycity.de
      <br />
      Büroadresse:
      <br />
      FixMyCity GmbH c|o CityLAB Berlin
      <br />
      Platz der Luftbrücke 4<br />
      12101 Berlin
      <br />
      <br />
      FixMyCity wird gefördert durch das BMVI und die Senatskanzlei Berlin.
    </Paragraph>

  </>
);

export default SectionTeam;
