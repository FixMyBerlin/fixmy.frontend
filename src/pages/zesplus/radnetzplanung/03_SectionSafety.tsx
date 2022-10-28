import React from 'react';
import { Heading, List, Paragraph, SectionProps } from '~/components2/Article';
import { StyledList } from '../components';
import { MapSafety } from './components/Maps';

export const SectionSafety = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Sicherheit
    </Heading>
    <Paragraph>
      <strong>Funktion:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>Identifizierung von Handlungsbedarfen (Analyse)</List.Item>
      <List.Item>
        Sichere bzw. Unsichere Abschnitte sollten bei der Netz- und
        Routenplanung berücksichtigt werden
      </List.Item>
      <List.Item>
        Berücksichtigung bei der Priorisierung von Maßnahmen (Netz & Maßnahme)
      </List.Item>
    </StyledList>
    <Paragraph>
      <strong>Datenquellen:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>Unfalldaten von Unfallatlas</List.Item>
      <List.Item>Unfalldaten von Polizeidirektion</List.Item>
      <List.Item>Beihnah-Unfälle von SimRa</List.Item>
      <List.Item>
        Partizipative Schulwegkartierung: Schulwege und unsichere Abschnitte
      </List.Item>
    </StyledList>
    <Paragraph>
      <strong>Beschreibung:</strong>
    </Paragraph>
    <Paragraph>
      Die <strong>“Themenkarte Sicherheit”</strong> fasst mehrere Aspekte der
      objektiven wie auch der subjektiven Sicherheit im Radverkehr zusammen. In
      der interaktiven Karte sind tatsächliche Unfälle verortet sowie
      Beinahe-Unfälle, die mit der SimRa-App identifiziert wurden. Ergänzt
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
      Streckenabschnitte und Knotenpunkte mit konkretem Unfallaufkommen besteh
      ein hoher Handlungsdruck und als unsicher wahrgenommene Strecken können
      ungeübte Radfahrende von der Fahrradnutzung abhalten.{' '}
    </Paragraph>

    <MapSafety />
  </>
);
