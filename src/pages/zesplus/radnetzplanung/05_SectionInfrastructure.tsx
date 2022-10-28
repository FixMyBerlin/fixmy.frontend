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
      <strong>Funktion:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>
        Darstellung der vorhandenen Radinfrastruktur inkl. Typologisierung
      </List.Item>
      <List.Item>
        Straßenabschnitte ohne vernünftig zu befahrende Fahrbahnöberfläche als
        nicht geeignete Strecke bzw. Handlungsbedarf
      </List.Item>
    </StyledList>
    <Paragraph>
      <strong>Datenquellen:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>OSM-Daten</List.Item>
    </StyledList>
    <Paragraph>
      <strong>Beschreibung:</strong>
    </Paragraph>
    <Paragraph>
      Die <strong>“Themenkarte Radinfrastruktur”</strong> stellt die vorhandene
      Radinfrastruktur dar. Als Radverkehrsinfrastruktur gilt dabei:
    </Paragraph>
    <StyledList>
      <List.Item>
        “Separate Radinfrastruktur”, also ausschließlich durch Radfahrende zu
        nutzende Wege, z.B. getrennter Radweg im Seitenraum, Radfahrstreifen
        usw.
      </List.Item>
      <List.Item>
        “Gemeinsame Führung mit dem Fußverkehr”, also Gehwege, die für die
        Nutzung des Radverkehrs freigegeben sind
      </List.Item>
      <List.Item>
        “Verkehrsberuhigte Bereiche” wie Spielstraßen oder verkehrsberuhigte
        Geschäftsbereiche.
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
