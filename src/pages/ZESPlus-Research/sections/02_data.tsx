import React from 'react';
import styled from 'styled-components';
import { Paragraph, List, Heading, SectionProps } from '~/components2/Article';
import Link from '~/components2/Link';

const StyledList = styled(List)`
  list-style-type: lower-alpha;
`;

const SectionData = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Datengrundlagen
    </Heading>
    <Paragraph>
      Die Karten basieren im Wesentlichen auf zwei unterschiedliche Datentypen:
      Einerseits klassische Geodaten: (Räumliche) Informationen zum
      Untersuchungsgebiet, beispielsweise Informationen zum Straßennetz, zum
      Vorhandensein der Radinfrastruktur, zu möglichen Quell- und Zielpunkten
      oder auch bereits vorhandenen Netz-Entwürfe etc. Andererseits
      Informationen über das Verhalten der Radfahrenden (Nutzerdaten) welche mit
      Hilfe einer App erfasst und mit speziell dafür entwickelten
      Auswertungskomponenten analysiert werden. Nachfolgend wird beschrieben,
      woher diese Daten stammen und wie sie verarbeitet wurden.
    </Paragraph>
    <Heading as="h3">Auswertung der SimRa-Daten</Heading>
    <Paragraph>
      Die Erfassung der Daten zum Verkehrsverhalten der Radfahrenden erfolgte
      durch Crowdsensing-App
      “SimRa”[https://www.digital-future.berlin/forschung/projekte/simra/] des
      Fachgebiets Mobile Cloud Computing (TU Berlin)
      [https://www.mcc.tu-berlin.de/menue/mobile_cloud_computing/parameter/de/].
      Mit GPS- und Beschleunigungssensoren sammeln die Smartphones der
      Teilnehmer:innen auf datenschutzkompatible Art und Weise Daten zu
      Beinahunfällen, zu Hauptverkehrsflüssen, zur Oberflächenqualität der
      befahrenen Wege und zur Geschwindigkeit der Radfahrenden:
    </Paragraph>
    <StyledList ordered>
      <List.Item>
        Erfassung von sogenannten Beinahe-Unfällen: Auswertung abrupter
        Richtungsänderungen sowie manuell eingegebener Vorfälle /
        Beinahe-Unfälle
      </List.Item>
      <List.Item>
        Sensorbasierte Oberflächenbewertung: systematische Auswertung der am Rad
        aufgezeichneten Erschütterungen.
      </List.Item>
      <List.Item>
        Box-Abfrage: interaktiver Abfragedialog von Quell-Ziel-Beziehungen,
        zeigt bspw. Umwege, Vermeiden problematischer Streckenabschnitte,
        Einzugsradien der S-Bahn und Schulen etc.
      </List.Item>
      <List.Item>
        Wartezeiten an Knotenpunkten: Auswertung der Durchfahrten und der
        Standzeit an Knotenpunkten,
      </List.Item>
      <List.Item>
        Fahrt-Kontinuität: Auswertung der relativen Geschwindigkeit bzw. der
        Häufigkeiten von Beschleunigungs- und Bremsvorgängen
      </List.Item>
    </StyledList>
    <Paragraph>
      Die Analyse der Nutzer:innendaten und die Zustandserfassung ermöglicht für
      ausgewählte Faktoren eine objektive Bewertung der Bedarfe, der
      präferierten Wege und der vorhandenen Infrastruktur. Die Ergebnisse der
      Auswertung fließen in mehrere Themenkarten mit ein.
    </Paragraph>
    <Paragraph>
      <Link internal href="#mitmachen">
        SimRa installieren
      </Link>
    </Paragraph>
    <Heading as="h3">Auswertung der OSM-Daten</Heading>
    <Paragraph>
      Für die Erfassung des Ist-Zustandes vorhandener
      Straßen(-querschnitts-)typen wurde auch überprüft, inwieweit OSM-Daten
      nutzbar sind und welche Analyseschritte sich automatisieren lassen. So
      wurde eine Systematik entwickelt, mit der die in den Gemeinden
      vorhandenen, vordefinierten Straßen(-querschnitts-)typen anhand der
      OSM-Daten verortet werden können.
    </Paragraph>
  </>
);

export default SectionData;
