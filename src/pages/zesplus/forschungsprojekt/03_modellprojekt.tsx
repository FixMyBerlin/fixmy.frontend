import React from 'react';
import { Heading, List, Paragraph, SectionProps } from '~/components2/Article';
import { Link } from '~/components2/Link';
import { radnetzplanungPath, simraUrl } from './links.const';

export const SectionModellprojekt = (props: SectionProps) => (
  <>
    <Heading as="h3" {...props}>
      Modellprojekte und Interventionen im NUDAFA-Reallabor
    </Heading>
    <Paragraph>
      Im Rahmen des Reallabors werden diverse Teilprojekte umgesetzt (je nach
      Innovations- und Forschungsanteilen eingeteilt in Intervention,
      Modellprojekte oder Realexperiment). Mit Hilfe der Projekte werden gezielt
      Lösungen für unterschiedliche Herausforderungen innerhalb der Kommunen
      entwickelt, welche für die effektive Förderung des Radverkehrs von
      Bedeutung sind.
    </Paragraph>
    <List>
      <List.Item>RVM_Erprobung interkommunales Radverkehrsmanagement</List.Item>
      <List.Item>
        DAP_Digitale Analyse- und Planungstools in Planungsprozessen (
        <Link href={simraUrl}>SimRa-Auswertung</Link> &{' '}
        <Link internal href={radnetzplanungPath}>
          Radverkehrsatlas
        </Link>
        )
      </List.Item>
      <List.Item>SMM_Schulisches Mobilitätsmanagement</List.Item>
      <List.Item>SDG_Street Design Game</List.Item>
      <List.Item>KSP_Komfortableres Kopfsteinpflaster</List.Item>
      <List.Item>FFB_Fahrradfreundliche Bahnhofstraße</List.Item>
      <List.Item>
        TRM_Verkehrszählung mit Open Source Lösungen (Telraam)
      </List.Item>
      <List.Item>
        AWB_Interkommunaler Radweg (Achse Westlich der Bahn)
      </List.Item>
      <List.Item>
        ABS_Abstellanlagen am S-Bahnhof (Modulbaukasten mit VBB)
      </List.Item>
      <List.Item>
        TDM_Öffentlichkeitsarbeit rund ums Rad (Tag der Mobilität)
      </List.Item>
      <List.Item>Weitere Informationen folgen demnächst!</List.Item>
    </List>
  </>
);
