import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { MapSafety } from './components/Maps';

export const SectionSafety = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Sicherheit
    </Heading>
    <Paragraph>
      Die “Themenkarte <strong>Sicherheit</strong>” fasst verschiedene Aspekte
      der objektiven, wie auch der subjektiven Sicherheit im Radverkehr
      zusammen. In der interaktiven Karte sind tatsächliche Unfälle verortet,
      sowie Beinahe-Unfälle, die mit der SimRa-App identifiziert wurden. Ergänzt
      werden diese Daten durch Informationen, die in unterschiedlichen
      Beteiligungsformaten erhoben wurden: Die dünnen blauen Linien zeigen
      Strecken, die von Schüler:innen des Humboldt-Gymnasiums Eichwalde mit dem
      Fahrrad als Schulweg genutzt werden. Auf den orange hinterlegten
      Abschnitte fühlen sich Schüler:innen nach eigenen Angaben unsicher.
    </Paragraph>
    <Paragraph>
      Diese Karte hilft bei der Identifizierung von Handlungsbedarfen und
      Handlungsschwerpunkten, die bei der Netz- und Routenplanung berücksichtigt
      werden müssen. Auch bei der Priorisierung von Maßnahmen sollten die
      objektive und subjektive Sicherheit berücksichtigt werden. Bei
      Streckenabschnitten und Knotenpunkten mit konkretem Unfallaufkommen
      besteht ein hoher Handlungsdruck. Aber auch Strecken ohne Unfallaufkommen
      können als unsicher wahrgenommen werden und ungeübte Radfahrende von der
      Fahrradnutzung abhalten.
    </Paragraph>

    <MapSafety />
  </>
);
