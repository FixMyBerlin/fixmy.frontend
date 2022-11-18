import React from 'react';
import { Heading, List, Paragraph, SectionProps } from '~/components2/Article';
import { InnerImg } from '~/components2/Article/Image/InnerImage';
import { AnchorLink, Link } from '~/components2/Link';
import { Heading4 } from '../components/Heading4';
import CtaRadverkehrsatlas from './images/cta-radverkehrsatlas.jpg';
import CtaSimra from './images/cta-simra.jpg';
import { radnetzplanungPath, simraUrl } from './links.const';

export const SectionIntroduction = (props: SectionProps) => (
  <>
    <Heading as="h3" {...props}>
      Das NUDAFA-Projekt
    </Heading>
    <Paragraph>
      Hinter NUDAFA stecken viele unterschiedliche{' '}
      <AnchorLink internal href="#uber-uns">
        Köpfe
      </AnchorLink>
      , die ein gemeinsames Ziel vereint: die Förderung des Radverkehrs in
      kleinen und mittleren Kommunen durch innovative Ansätze.
    </Paragraph>
    <Heading4>Drei Themen stehen dabei im Fokus:</Heading4>
    <List>
      <List.Item>
        Die Entwicklung und Erprobung übertragbarer Planungsmethoden zur
        Erstellung eines datengestützten, interkommunalen Radverkehrskonzepts
        für die Region (
        <Link href={radnetzplanungPath} internal>
          siehe Radverkehrsatlas
        </Link>
        ).
      </List.Item>
      <List.Item>
        Die partizipative Einbindung der zivilgesellschaftlichen Akteure in die
        Konzeption des interkommunalen Radwegenetzes und die Entwicklung von
        Maßnahmen.
      </List.Item>
      <List.Item>
        Die Umsetzung von umsetzungsorientierten Modellprojekten und praktischen
        Interventionen zur Erarbeitung von übertragbaren Lösungsansätzen und
        Handlungsempfehlungen für andere Kommunen (s. “Modellprojekte und
        Interventionen”).
      </List.Item>
    </List>

    <Heading as="h3" {...props}>
      Wichtigste Projektergebnisse
    </Heading>
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div>
        <a href={radnetzplanungPath}>
          <InnerImg source={CtaRadverkehrsatlas} alt="" />
        </a>
        <Link internal href={radnetzplanungPath}>
          Zum Radverkehrsatlas
        </Link>
      </div>
      <div>
        <a target="_blank" rel="noopener noreferrer" href={simraUrl}>
          <InnerImg source={CtaSimra} alt="" />
        </a>
        <Link href={simraUrl}>Zur SimRa-Datenauswertung</Link>
      </div>
    </div>
  </>
);
