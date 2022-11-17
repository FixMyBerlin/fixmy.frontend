import React from 'react';
import { Heading, List, SectionProps } from '~/components2/Article';
import { Link } from '~/components2/Link';

export const SectionPartner = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Projekt- und Kooperationspartner
    </Heading>
    <List>
      <List.Item>
        <Link href="https://github.com/FixMyBerlin/fixmy.frontend/blob/c4ee427ffee029a6307a0e56a4a6220930e6ef26/src/pages/zesplus/forschungsprojekt/06_partner.tsx#L15-L16">
          Stiftungsprofessur Radverkehr in intermodalen Verkehrsnetzen (TH
          Wildau)
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://www.mcc.tu-berlin.de/">
          FG Mobile Cloud Computing (TU Berlin)
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://ivp.tu-berlin.de/">
          FG Integrierte Verkehrsplanung (TU Berlin)
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://fixmyberlin.de/">FixMyCity</Link>
      </List.Item>
      <List.Item>
        <Link href="https://www.radnetz-lds.de/">
          Das Netzwerk fahrradfreundliches LDS (-Nord)
        </Link>
      </List.Item>
      <List.Item>
        <Link href="http://bike2ber.de/">Bike2BER</Link>
      </List.Item>
      <List.Item>
        <Link href="https://www.kjv.de/">
          Der Kinder- und Jugendverein e.V.
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://isicargo.de/">isicargo</Link>
      </List.Item>
    </List>
  </>
);
