import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { AnchorButton } from '~/components2/Button';
import Link from '~/components2/Link';
import ButtonWrapper from '../components/ButtonWrapper';
import MapNetworks from '../components/MapNetworks';

const SectionConceptMaps = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Das ZESplus-Konzept
    </Heading>
    <Paragraph>
      Wie beschrieben, bilden die fortlaufend angepasste Netzkonzept” und die
      “Maßnahmenübersicht” den Kern des interkommunalen Radverkehrskonzeptes{' '}
      <strong>ZESplus</strong>. Die darin vorgeschlagenen Maßnahmen der
      Radverkehrsförderung und die laufende Fortschreibung basiert auf den
      Themenkarten sowie auf der aktiven Einbeziehung der beteiligten Kommunen
      und Bürger:innen.
    </Paragraph>
    <Heading as="h3">Entwurf des Zielnetzes</Heading>
    <MapNetworks />
    <Paragraph>
      In dieser Karte sehen Sie verschiedene bereits bestehenden Netzkonzepte
      für die Gemeinden und die umliegenden Regionen. Außerdem finden Sie hier
      eine grobe Analyse von Start-Zielpunkten, die den Bedarf für wichtige
      Radverbindungen zeigen. Auf Basis ihrer lokalen Expertise erarbeiteten
      Mitglieder des{' '}
      <Link href="https://www.radnetz-lds.de/">
        Netzwerks fahrradfreundliches LDS (-Nord)
      </Link>{' '}
      den ersten Entwurf für ein gemeindeübergreifendes Hauptroutennetz, das in
      gelb dargestellt ist. Darauf aufbauend wird im Frühjahr 2021 in einem
      Workshop ein Routennetz für die ZES-Gemeinden konzipiert, das diese
      Bedarfe und Bedingungen aufnimmt.
    </Paragraph>
    <Heading as="h3">Maßnahmenübersicht (In Vorbereitung)</Heading>
    <Paragraph>
      Die tabellarische Übersicht der Maßnahmen sowie die Verortung der
      Maßnahmen in der Planungskarte befinden sich aktuell noch in der
      Entwicklung. Sobald diese abgeschlossen wurden, werden sie hier
      veröffentlicht. Demnächst finden Sie ein vorläufige Version der
      Maßnahmenübersicht hier:
    </Paragraph>
    <ButtonWrapper>
      <AnchorButton
        flat
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/spreadsheets/d/1lVlhXL2B81R8hGq9qnAbYKdQESBLhf1WerRrDmhcM58/edit?usp=sharing"
      >
        Zur Maßnahmenübersicht
      </AnchorButton>
    </ButtonWrapper>
  </>
);

export default SectionConceptMaps;
