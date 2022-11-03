import React from 'react';
import { Heading, List, Paragraph, SectionProps } from '~/components2/Article';
import { StyledList } from '../components';
import { MapInfrastructure } from './components/Maps';

export const SectionInfrastructure = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Radinfrastruktur
    </Heading>
    <Paragraph>
      Die “Themenkarte <strong>Radinfrastruktur</strong>” stellt die vorhandene
      Radinfrastruktur dar. Unterschieden wird dabei zwischen:
    </Paragraph>
    <StyledList>
      <List.Item>
        <strong>“Separate Radinfrastruktur”</strong>: Ausschließlich durch
        Radfahrende zu nutzende Wege, z.B. getrennter Radweg im Seitenraum,
        Radfahrstreifen usw.
      </List.Item>
      <List.Item>
        <strong>“Gemeinsame Führung mit dem Fußverkehr”</strong>: Gehwege, die
        für die Nutzung des Radverkehrs freigegeben sind
      </List.Item>
      <List.Item>
        <strong>“Verkehrsberuhigte Bereiche”</strong>: Beispielsweise
        Spielstraßen oder verkehrsberuhigte Geschäftsbereiche.
      </List.Item>
    </StyledList>
    <Paragraph>
      Diese Themenkarte bildet eine wichtige Grundlage für die Netzplanung,
      welche von der bereits vorhandenen Infrastruktur ausgeht. Im Abgleich mit
      dem Zielnetz können dann Lücken und Ergänzende Haupt- und Nebenrouten
      definiert werden um das Netz sukzessive zu schließen. Abschnitte mit
      schlechter Oberfläche (in der Regel Kopfsteinpflaster) die für den
      Radverkehr nicht geeignet sind sind zusätzlich ausgewertet, da sie
      aufwendigere Maßnahmen erfordern und in der Netzplanung wenn möglich zu
      vermeiden sind.
    </Paragraph>

    <MapInfrastructure />
  </>
);
