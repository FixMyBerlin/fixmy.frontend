import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { Link } from '~/components2/Link';

export const SectionIntroduction = (props: SectionProps) => (
  <>
    <Heading as="h3" {...props}>
      Innovative Instrumente der Radverkehrsförderung
    </Heading>
    <Paragraph>
      Seit März 2020 arbeiten die Gemeinden zusammen mit{' '}
      <Link href="https://fixmyberlin.de/">FixMyCity</Link> und der{' '}
      <Link href="https://www.mcc.tu-berlin.de/">TU Berlin</Link> an der
      Entwicklung eines interkommunalen Radverkehrskonzepts mit dem Namen{' '}
      <strong>ZESplus</strong>. Im Rahmen des NUDAFA-Projekts werden dabei auch
      digitale Analyse- Beteiligungs- und Planungstools entwickelt und erprobt.
      Der Name <strong>ZESplus</strong> verweist auf die Zusammenarbeit der
      benachbarten ZES-Gemeinden. Das “plus” steht für eine Aufwertung des
      bereits vorhandenen Radnetzes, aber auch für die Einbeziehung der
      Bürger:innen, der lokalen Initiative{' '}
      <Link href="https://www.radnetz-lds.de/">
        Netzwerk fahrradfreundliches LDS (-Nord)
      </Link>
      , sowie der umliegenden Nachbargemeinden und des Haupstadtflughafens BER.
    </Paragraph>
    <Paragraph>
      Die Grundidee des ZESplus-Konzepts ist simpel: In ihrem Alltag fahren die
      Bewohner:innen der ZES-Region oft von der einen Gemeinde in die andere und
      benötigen daher durchgehende, sichere und komfortable Wegeverbindungen. Um
      die Bedürfnisse und die Handlungsbedarfe im gemeinsamen Siedlungsraum
      besser zu verstehen, wurde mit speziell entwickelten Analysemethoden eine
      gemeinschaftliche Datengrundlage geschaffen. Diese bildet die Basis für
      die darauf aufbauende, partizipative Entwicklung des interkommunalen
      Radverkehrskonzepts.
    </Paragraph>
    <Paragraph>
      Die Ergebnisse der gemeindeübergreifenden Analyse werden in mehreren{' '}
      <strong>Themenkarten</strong> zusammengefasst. Sie verschaffen Einblick in
      die Situation vor Ort und machen wichtige Aspekte des Radverkehrs
      sichtbar. Dies unterstützen die beteiligten Verwaltungen, Bürger:innen,
      Planer:innen bei der Konzeption eines{' '}
      <strong>Radverkehrsnetzes für die drei Gemeinden</strong> und von darüber{' '}
      <strong>hinausgehenden Maßnahmen</strong> der Radverkehrsförderung.
    </Paragraph>
    <Paragraph>
      Ein Entwurf des Netzes wurde bereits von Bürger:innen erarbeitet, welches
      im Frühjahr 2021 in einem Workshop überarbeitet und anschließend als{' '}
      <strong>Zielnetz</strong> veröffentlicht werden soll. Anschließend ist die
      Erarbeitung von Maßnahmen geplant, welche mit der Zeit die{' '}
      <strong>Maßnahmenübersicht</strong> füllen. Beide Karten bilden den Kern
      des <strong>interkommunalen Radverkehrskonzepts</strong>: Sie verschaffen
      eine Übersicht über die vorgesehenen Maßnahmen der Radverkehrsförderung
      und deren Umsetzungsstand.
    </Paragraph>
    <Paragraph>
      Die Planung und Umsetzung besonders herausfordernder Maßnahmen erfolgt in
      einem{' '}
      <Link internal href="#reallabor">
        <strong>Reallabor</strong>
      </Link>
      . In diesem erarbeiten Vertreter:innen der Politik und der Verwaltung
      zusammen mit Wissenschaftler:innen, Bürger:innen und
      privatwirtschaftlichen Akteuren in so genannten{' '}
      <Link internal href="#realexperimente">
        <strong>Realexperimenten</strong>
      </Link>{' '}
      innovative Modellprojekte, welche sie anschließend testen und evaluieren.
      Einzelne Modellprojekte wurden bereits initiiert, im Jahr 2021 sollen
      weitere folgen. Für 2021 ist die Zusammenarbeit mit weiteren{' '}
      <strong>Kooperationspartnern</strong> geplant.
    </Paragraph>
  </>
);
