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
    <Paragraph>
      <strong>Das Reallabor für interkommunale Radverkehrsförderung</strong>{' '}
      bietet die Möglichkeit, verschiedene Kooperationspartner und lokale
      Akteure aus der Zivilgesellschaft, Politik und Verwaltung zusammen zu
      bringen. Gemeinsam wollen wir mit konkreten Projekten den Radverkehr in
      der Region stärken und dabei herausarbeiten, welche Ansätze und Strategien
      sich für andere Kommunen besonders eignen könnten. Das{' '}
      <Link href="https://ivp.tu-berlin.de/">
        Fachgebiet Integrierte Verkehrsplanung - TU Berlin
      </Link>{' '}
      übernimmt dabei die politik- und sozialwissenschaftliche Begleitforschung
      und identifiziert Hemmnisse und Potenziale in der Radverkehrsplanung –
      insbesondere in der (inter-)kommunalen Zusammenarbeit. Ein weiterer
      wichtiger Partner ist die <strong>TH Wildau</strong> mit der dort
      angesiedelten
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
      <Link href="https://www.mcc.tu-berlin.de/">
        Fachgebiet Mobile Cloud Computing
      </Link>{' '}
      der TU Berlin. Unsere Partnerkommunen sind die Gemeinden Zeuthen,
      Eichwalde, Schulzendorf und Schönefeld sowie die beiden Städte Wildau und
      Königs Wusterhausen. Hinzu kommen Akteure wie die lokalen Initiativen
      Netzwerk fahrradfreundliches LDS (-Nord), Bike2BER und weitere
      Projektpartner wie der örtliche Kinder- und Jugendverein (KJV e.V.),
      Schulen uvm.
    </Paragraph>
    <Paragraph>
      Gefördert wird das Forschungsprojekt NUDAFA(“Nutzerdaten-gestützten
      Planung eines integrierten Fahrradverkehrsnetzes”) über die FONA-Strategie
      des Bundesministeriums, im Rahmen der Förderrichtlinie{' '}
      <Link href="https://www.zukunft-nachhaltige-mobilitaet.de/mobilitaetswerkstadt-mws-2025/">
        MobilitätsWerkStadt 2025
      </Link>
      .
    </Paragraph>
  </>
);
