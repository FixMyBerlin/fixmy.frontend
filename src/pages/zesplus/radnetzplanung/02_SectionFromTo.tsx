import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { MapFromTo } from './components/Maps';

export const SectionFromTo = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Quellen und Ziele
    </Heading>
    <Paragraph>
      Die “Themenkarte <strong>Analyse, Quellen und Ziele</strong>” stellt
      wichtige Ziel- und Quellorte sowie physische Barrieren dar, weil der
      Radverkehr dadurch maßgeblich beeinflusst wird: Die Ziel- und Quellorte
      (bspw. dicht besiedelte Wohnstandorte / Ortszentren, Schulen usw.) sollten
      gut erreichbar sein, weil sie Verkehr generieren. Physische Barrieren
      können oft nur an bestimmten Stellen gequert werden, weshalb sie
      Verkehrsströme lenken und bei der Netzplanung besonders berücksichtigt
      werden müssen.
    </Paragraph>
    <Paragraph>
      Diese Themenkarte dient bei der Entwicklung des Radverkehrsnetzes als
      Grundlage für das <strong>Luft- und Wunschliniennetz</strong>. Später kann
      mit ihr der Netzentwurf überprüft werden und Maßnahmen hinsichtlich ihrer
      Bedeutung im Gesamtnetz beurteilt werden.{' '}
    </Paragraph>

    <MapFromTo />
  </>
);
