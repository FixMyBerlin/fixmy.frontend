import React from 'react';
import {
  Heading,
  ImageFull,
  Paragraph,
  SectionProps,
} from '~/components2/Article';
import { Link } from '~/components2/Link';
import Image from './images/marktplatz.jpg';

export const SectionReallabor = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Reallabor als Methode
    </Heading>
    <ImageFull
      source={Image}
      alt="Blick auf den Marktplatz in Eichwalde, bei dem im Rahmen des sogenannten “Tags der Mobilität 2022” zwei Kunstradfahrerinnen des lokalen Sportvereins auf einer Bühne Kunsstücke aufführen."
      role="presentation"
    />
    <Heading as="h3" {...props}>
      Reallabor für interkommunale Radverkehrsförderung
    </Heading>
    <Paragraph>
      Das Reallabor für interkommunale Radverkehrsförderung bietet die
      Möglichkeit, verschiedene Kooperationspartner und lokale Akteure aus der
      Zivilgesellschaft, Politik und Verwaltung zusammen zu bringen. Gemeinsam
      wollen wir mit konkreten Projekten den Radverkehr in der Region stärken
      und dabei herausarbeiten, welche Ansätze und Strategien sich für andere
      Kommunen besonders eignen könnten. Das{' '}
      <Link href="https://ivp.tu-berlin.de/">
        Fachgebiet Integrierte Verkehrsplanung
      </Link>{' '}
      der <strong>TU Berlin</strong> übernimmt dabei die politik- und
      sozialwissenschaftliche Begleitforschung und identifiziert Hemmnisse und
      Potenziale in der Radverkehrsplanung – insbesondere in der
      (inter-)kommunalen Zusammenarbeit. Ein weiterer wichtiger Partner ist die{' '}
      <strong>TH Wildau</strong> mit der dort angesiedelten
      <strong>
        <Link href="https://www.th-wildau.de/studieren-weiterbilden/studiengaenge/radverkehr-m-eng/projekt-stiftungsprofessur-radverkehr/">
          Stiftungsprofessur für Radverkehrsplanung
        </Link>
      </strong>
      , die sich mit ihrer Fachkompetenz an den Modellprojekten und
      Interventionen beteiligt. Fortgeführt wird die intensive Zusammenarbeit
      mit <Link href="https://fixmyberlin.de/">FixMyCity</Link> als
      Projektpartner für Kommunikationstools und Datenverarbeitung sowie die
      bestehende Kooperation mit der SimRa-App bzw. dem{' '}
      <Link href="https://www.tu.berlin/mcc">
        <strong>Fachgebiet Mobile Cloud Computing</strong>
      </Link>{' '}
      der <strong>TU Berlin</strong>. Unsere Partnerkommunen sind die Gemeinden
      Zeuthen, Eichwalde, Schulzendorf und Schönefeld sowie die beiden Städte
      Wildau und Königs Wusterhausen. Hinzu kommen Akteure wie die lokalen
      Initiativen{' '}
      <Link href="https://www.radnetz-lds.de/">
        Netzwerk fahrradfreundliches LDS (-Nord)
      </Link>
      , <Link href="https://bike2ber.de/">Bike2BER</Link> und weitere
      Projektpartner wie der örtliche{' '}
      <Link href="https://www.kjv.de/">
        Kinder- und Jugendverein (KJV e.V.)
      </Link>
      , Schulen uvm.
    </Paragraph>
    <Paragraph>
      Gefördert wird das Forschungsprojekt NUDAFA (“Nutzerdaten-gestützten
      Planung eines integrierten Fahrradverkehrsnetzes”) über die FONA-Strategie
      des Bundesministeriums, im Rahmen der Förderrichtlinie{' '}
      <Link href="https://www.zukunft-nachhaltige-mobilitaet.de/mobilitaetswerkstadt-mws-2025/">
        MobilitätsWerkStadt 2025
      </Link>
      .
    </Paragraph>
  </>
);
