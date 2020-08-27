import React from 'react';
import {
  FormattedMessage,
  WrappedComponentProps,
  injectIntl
} from 'react-intl';

import { Paragraph, Heading, List, SectionProps } from '~/components2/Article';

const SectionSummary = ({
  toc,
  intl
}: SectionProps & WrappedComponentProps) => (
  <>
    <Heading as="h2" toc={toc}>
      <FormattedMessage
        id="research.06_summary.p01.heading"
        defaultMessage="Zusammenfassung"
      />
    </Heading>
    <Paragraph>
      <FormattedMessage
        id="research.06_summary.p02"
        defaultMessage="Im Rahmen eines Forschungsprojektes des Nationalen Radverkehrsplan wurde der Frage nachgegangen, wie eine Fahrradinfrastruktur aussehen sollte, auf der sich alle sicher fühlen. Dazu wurde eine Online-Umfrage entwickelt, bei der die Teilnehmenden fotorealistische Darstellungen von Straßensituationen aus der Fahrperspektive nach ihrem Sicherheitsempfinden bewerten. Dadurch konnten die Einflüsse der einzelnen Merkmale kontrolliert und untersucht werden, jedoch entfielen damit auch weitere Einflüsse die zum vollständigen Empfinden einer Situation notwendig sind. Durch die Kooperation mit einer Berliner Tageszeitung konnte eine hohe Teilnehmendenzahl erreicht werden. Entsprechend ist der Wohnort von ca. 90% der Teilnehmenden Berlin. In der Umfrage waren zudem Männer, die Altersgruppe 30 bis 64 Jahre und hauptsächlich Radfahrende überrepräsentiert. Durch die hohe Gesamtzahl an Teilnehmenden sind jedoch eine ausreichende Anzahl von Bewertungen für die unterrepräsentierten Gruppen vorhanden. In einer ersten Auswertung zeigt die Umfrage, dass die Einflüsse unterschiedlicher Faktoren in ihren Wechselbeziehungen keine linearen Aussagen über die subjektive Sicherheit von Radinfrastruktur zulassen. Dennoch können einige zentrale Aussagen und Empfehlungen abgeleitet werden, wie eine “Radinfrastruktur für Alle” aussehen könnte."
      />
      <List>
        <List.Item>
          <FormattedMessage
            id="research.06_summary.p03"
            defaultMessage="Die Hypothese, dass die Führung im Seitenraum sicherer als die Führung auf der Fahrbahn empfunden wird, konnte bestätigt werden."
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.06_summary.p04"
            defaultMessage="Bei breiten Gehwegen und keiner geschäftliche Nutzung ist die Führung im Seitenraum die am besten bewertete Alternative. Auch zu Fuß Gehende fühlen sich bei einer Führung des Radverkehrs im Seitenraum ausreichend sicher, wenn zusätzlich eine Trennung zum Radverkehr z.B. durch einen Grünstreifen klar erkennbar ist."
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.06_summary.p05"
            defaultMessage="Die Führung im Mischverkehr wird als sehr unsicher empfunden"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.06_summary.p06"
            defaultMessage="Bei der Führung auf der Fahrbahn werden breite Radverkehrsanlagen als deutlich sicherer empfunden. Grüneinfärbungen und bauliche Trennungen erhöhen zusätzlich das Sicherheitsempfinden."
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.06_summary.p07"
            defaultMessage="Auch schmalere Radverkehrsanlagen bieten eine akzeptable subjektive Sicherheit, wenn Sie z.B. durch niedrige Poller vom KFZ-Verkehr getrennt sind und an Straßen ohne ruhenden Verkehr geführt werden."
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.06_summary.p08"
            defaultMessage="Bei Führung des Radverkehrs an einer Hauptverkehrsstraße mit ruhendem Verkehr wird die Lage rechts vom ruhenden Verkehr als sicherer empfunden. Eine Führung links des ruhenden Verkehrs wird generell als deutlich weniger sicher empfunden. Bei einer Führung links des ruhenden Verkehrs wurden Szenen die z.B. eine breite Radverkehrsanlage mit Grüneinfärbung haben als akzeptable sicher bewertet. Dabei ist zu beachten, dass zusätzliche Konflikte, wie Falschparker oder kreuzender Parkverkehr in der Umfrage nicht dargestellt wurden. Ebenso wurden Situationen an Knotenpunkten in der Umfrage nicht untersucht, eine Aussage zum Zusammenhang zwischen RVA an der Strecke und den Auswirkungen auf Knotenpunkte kann daher nicht getroffen werden."
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.06_summary.p09"
            defaultMessage="Auch Autofahrende empfinden gut ausgebaute Radverkehrsanlagen inklusive Poller als sicherer. Die Bewertungen sind von den Tendenzen ähnlich, wie die der Radfahrenden, wenn auch einige Gefahren, bzw. durch Dooring weniger stark eingeschätzt werden."
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.06_summary.p10"
            defaultMessage="Szenen in Nebenstraßen erhielten generell schlechtere Bewertungen als solche an Hauptverkehrsstraßen. Dieser Vergleich ist allerdings nur bedingt aussagekräftig, da in den statischen Bildern der Umfrage die Verkehrsmenge nicht ausreichend deutlich dargestellt werden konnte. Szenen, bei denen kein Fließender Kfz-Verkehr dargestellt wurde und eine deutliche Straßenmarkierung als Fahrradstraße vorhanden war erhielten die besten Bewertungen."
          />
        </List.Item>
      </List>
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.06_summary.p11"
        defaultMessage="Die Daten sind weiter zu analysieren. Der Ergebnisdatensatz ist frei verfügbar und wird bereits jetzt für weitere Auswertungen genutzt. Wir freuen uns bei Interesse über eine Kontaktaufnahme und verlinken hier gerne auf die Ergebnisse! In den nächsten Schritten ist ein Abgleich der Ergebnisse zur subjektiven Sicherheit mit dem tatsächlichen Unfallgeschehen durchzuführen, um Empfehlungen abzuleiten."
      />
    </Paragraph>
  </>
);

export default injectIntl(SectionSummary);
