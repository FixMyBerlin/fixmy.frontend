import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { MapNetwork } from './components/Maps/MapNetwork';

export const SectionNetwork = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Zielnetz
    </Heading>
    <Paragraph>
      Die “Themenkarte <strong>Zielnetz”</strong> unterstützt die lokalen
      Akteure bei der Entwicklung des Radnetzes und von konkreten Maßnahmen.
    </Paragraph>
    <Paragraph>
      Mit den blauen Kreisen werden dabei die miteinander zu verbindenden Orte
      bzw. Quartiere definiert. Die dazwischen notwendigen Verbindungen werden
      mit blauen Strichen dargestellt. Diese markieren Wegebeziehungen, welche
      zur Überprüfung der Funktionsfähigkeit und Vollständigkeit des Zielnetzes
      benötigt werden.
    </Paragraph>
    <Paragraph>
      Mit roten Strichen wird das Zielnetz dargestellt. Während der Abstimmung
      mit den lokalen Akteuren bzw. bis zum Beschluss durch die jeweils
      zuständigen Gremien wird dieses oft noch als „Prüfnetz“ bzw.
      „Zielnetz-Entwurf“ bezeichnet. In die Erstellung des Zielnetz-Entwurfes
      fließt auch die Vorarbeit der lokalen Radverkehrs-Initiativen mit ein,
      welche mit umfassender Kenntnis der Begebenheiten einen wichtigen Beitrag
      zur Zielnetzentwicklung leisten. Als wichtige Grundlage wird dieses daher
      im Hintergrund gelb dargestellt. Auch die in den anderen Themenkarten
      dargestellten Informationen fließen in die Entwicklung des Zielnetzes mit
      ein.
    </Paragraph>
    <Paragraph>
      Das Zielnetz stellt dabei dar, welche Routen für den Radverkehr prioritär
      auszubauen sind. Gerade diese Karte bildet deshalb ein wichtiges
      Kommunikationsmittel für die Abstimmung der Kommunen untereinander, aber
      der zwischen der Verwaltung, der Politik und der Zivilgesellschaft.
      Aufbauend auf dem Zielnetz können konkrete Maßnahmen entwickelt werden,
      die zur Realisierung des Radnetzes beitragen. Zukünftig können auch diese
      in einer Karte dargestellt werden.
    </Paragraph>
    <Paragraph>
      Anders als bei den meisten anderen Themenkarten basiert diese Karte nicht
      auf Open-Street-Map-Daten, sondern auf Informationen und Karten, die von
      den Akteuren vor Ort erstellt und dann in den Radverkehrsatlas eingelesen
      werden.
    </Paragraph>

    <MapNetwork />
  </>
);
