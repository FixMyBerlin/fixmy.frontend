import React from 'react';
import {
  FormattedMessage,
  WrappedComponentProps,
  injectIntl,
} from 'react-intl';

import {
  Paragraph,
  Heading,
  ImageMulti,
  List,
  SectionProps,
} from '~/components2/Article';
import { AnchorLink } from '~/components2/Link';

import BarChart from '../components/BarChart';
import FeelSafe from '../components/FeelSafe';
/* eslint-disable @typescript-eslint/no-unused-vars */
import CP_C_1093 from '../images/01_CP_C_1093_@x2.jpg';
import CP_C_1100 from '../images/01_CP_C_1100_@x2.jpg';
import CP_C_194 from '../images/01_CP_C_194_@x2.jpg';
import CP_C_463 from '../images/01_CP_C_463_@x2.jpg';
import CP_C_49 from '../images/01_CP_C_49_@x2.jpg';
import CP_C_509 from '../images/01_CP_C_509_@x2.jpg';
import CP_C_516 from '../images/01_CP_C_516_@x2.jpg';
import CP_C_553 from '../images/01_CP_C_553_@x2.jpg';
import CP_C_58 from '../images/01_CP_C_58_@x2.jpg';
// import CP_C_688 from '../images/01_CP_C_688.jpg';
import CP_C_725 from '../images/01_CP_C_725_@x2.jpg';
import CP_C_823 from '../images/01_CP_C_823_@x2.jpg';
import CP_P_149 from '../images/01_CP_P_149_@x2.jpg';
// import CP_P_185 from '../images/01_CP_P_185_@x2.jpg';
import CP_P_194 from '../images/01_CP_P_194_@x2.jpg';
// import CP_P_203 from '../images/01_CP_P_203_@x2.jpg';
import CP_P_778 from '../images/01_CP_P_778_@x2.jpg';
import MS_A_1285 from '../images/01_MS_A_1285_@x2.jpg';
import MS_A_343 from '../images/01_MS_A_343_@x2.jpg';
// import MS_A_570 from '../images/01_MS_A_570_@x2.jpg';
import MS_A_586 from '../images/01_MS_A_586_@x2.jpg';
import MS_A_67 from '../images/01_MS_A_67_@x2.jpg';
import MS_C_1220 from '../images/01_MS_C_1220_@x2.jpg';
import MS_C_17 from '../images/01_MS_C_17_@x2.jpg';
import MS_C_2 from '../images/01_MS_C_2.jpg';
import MS_C_21 from '../images/01_MS_C_21_@x2.jpg';
import MS_C_305 from '../images/01_MS_C_305_@x2.jpg';
import MS_C_325 from '../images/01_MS_C_325_@x2.jpg';
import MS_C_377 from '../images/01_MS_C_377_@x2.jpg';
// import MS_C_51 from '../images/01_MS_C_51_@x2.jpg';
import MS_C_587 from '../images/01_MS_C_587_@x2.jpg';
import MS_C_596 from '../images/01_MS_C_596_@x2.jpg';
import MS_C_597 from '../images/01_MS_C_597_@x2.jpg';
// import MS_C_606 from '../images/01_MS_C_606_@x2.jpg';
import MS_C_611 from '../images/01_MS_C_611_@x2.jpg';
import MS_C_619 from '../images/01_MS_C_619_@x2.jpg';
import MS_C_620 from '../images/01_MS_C_620_@x2.jpg';
import MS_C_75 from '../images/01_MS_C_75_@x2.jpg';
import MS_C_860 from '../images/01_MS_C_860_@x2.jpg';
import MS_C_980 from '../images/01_MS_C_980_@x2.jpg';
import SE_C_10 from '../images/01_SE_C_10_@x2.jpg';
import SE_C_11 from '../images/01_SE_C_11_@x2.jpg';
import SE_C_12 from '../images/01_SE_C_12_@x2.jpg';
import SE_C_2 from '../images/01_SE_C_2_@x2.jpg';
import SE_C_42 from '../images/01_SE_C_42_@x2.jpg';
import SE_C_44 from '../images/01_SE_C_44_@x2.jpg';
import SE_C_47 from '../images/01_SE_C_47_@x2.jpg';
import SE_C_49 from '../images/01_SE_C_49_@x2.jpg';
import SE_C_50 from '../images/01_SE_C_50_@x2.jpg';
import SE_C_71 from '../images/01_SE_C_71_@x2.jpg';
// import image1 from '../images/image1_@x2.jpg';
/* eslint-enable @typescript-eslint/no-unused-vars */

const SectionResults = ({
  toc,
  tocAnchor,
  intl,
}: SectionProps & WrappedComponentProps) => (
  <>
    <Heading as="h2" toc={toc} tocAnchor={tocAnchor}>
      <FormattedMessage
        id="research.05_results.heading"
        defaultMessage="Statistische Auswertung"
      />
    </Heading>

    <Paragraph>
      {' '}
      <FormattedMessage
        id="research.05_results.p1"
        defaultMessage="Mit den generierten Daten ist die Überprüfung von verschiedensten Hypothesen möglich. Ein besonderes Interesse der Forschung liegt beispielsweise auf der Nutzergruppe der potentiell Radfahrenden. Ab welcher Verkehrsinfrastruktur fühlt sich diese Nutzergruppe im Straßenraum sicher? Ist die Verkehrsstärke auch bei einer Trennung zwischen Rad- und Kfz-Verkehr eine ausschlaggebende Einflussgröße? Welche Verkehrsinfrastruktur empfinden die meisten Befragten als sicher? Ist die Breite oder die physische Trennung der RVA ausschlaggebend? Welche Führungsformen sind jeweils im Seitenraum, auf der Fahrbahn oder in Nebenverkehrsstraßen am geeignetsten? Einige dieser Hypothesen werden in der folgenden Auswertung überprüft."
      />
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p2"
        defaultMessage="Mittels den zur Verfügung gestellten Daten können interessierte Personendie Auswertung nachvollziehen und weitere Hypothesen überprüfen. Zunächstein Überblick zu den Teilnehmenden."
      />
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p3"
        defaultMessage="Für unsere eigene Auswertung nutzen wir Python, welche in {link} betrachtet werden kann. Dort sind Visualisierungen der Likert Skala Daten als auch Hypothesentests mit Bootstrap Konfidenzintervallen und Likelihood Ratio Tests mit Proportional Odds Regressions Modellen zu finden."
        values={{
          link: (
            <AnchorLink href="https://github.com/FixMyBerlin/fixmy.survey-results">
              Jupyter Notebooks
            </AnchorLink>
          ),
        }}
      />
    </Paragraph>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p4.heading"
        defaultMessage="Auswertung der Teilnehmenden"
      />
    </Heading>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p4"
        defaultMessage="Zur Einordnung der Bewertungen ein kleiner Überblick, wer alles mitgemacht hat. Insgesamt hatte die Umfrage 21.401 Teilnehmende, davon 19.109 aus Berlin"
      />
      <List>
        <List.Item>Friedrichshain-Kreuzberg 14 %</List.Item>
        <List.Item>Mitte 12 %</List.Item>
        <List.Item>Pankow 12 %</List.Item>
        <List.Item>Tempelhof-Schöneberg 10 %</List.Item>
        <List.Item>Charlottenburg-Wilmersdorf 9 %</List.Item>
        <List.Item>Steglitz-Zehlendorf 7 %</List.Item>
        <List.Item>Neukölln 7%</List.Item>
        <List.Item>Treptow-Köpenick 4 %</List.Item>
        <List.Item>Lichtenberg 4 %</List.Item>
        <List.Item>Reinickendorf 4 %</List.Item>
        <List.Item>Spandau 3 %</List.Item>
        <List.Item>Marzahn-Hellersdorf 1 %</List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p4.listOther"
            defaultMessage="andere Orte"
          />{' '}
          11 %
        </List.Item>
      </List>
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p5"
        defaultMessage="Es haben nahezu doppelt so viele männliche Teilnehmer die Umfrage beantwortet wie weibliche."
      />
      <List>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p5.list1"
            defaultMessage="männlich 64 %"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p5.list2"
            defaultMessage="weiblich 34 %"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p5.list3"
            defaultMessage="divers 2 %"
          />
        </List.Item>
      </List>
      <FormattedMessage
        id="research.05_results.p6"
        defaultMessage="Zum Vergleich: laut Amt für Statistik Berlin Brandenburg leben in Berlin 49 % Männer und 51 % Frauen (Stand 2018)"
      />
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p7"
        defaultMessage="Die Altersverteilung sieht wie folgt aus:"
      />
      <List>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p7.list1"
            defaultMessage="AG0 - unter 18 Jahre 1%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p7.list2"
            defaultMessage="AG1 - 18 bis 24 Jahre 5%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p7.list3"
            defaultMessage="AG2 - 25 bis 29 Jahre 8%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p7.list4"
            defaultMessage="AG3 - 30 bis 39 Jahre 27%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p7.list5"
            defaultMessage="AG4 - 40 bis 49 Jahre 22%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p7.list6"
            defaultMessage="AG5 - 50 bis 64 Jahre 28%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p7.list7"
            defaultMessage="AG6/7 - über 65 Jahre 10%"
          />
        </List.Item>
      </List>
      <FormattedMessage
        id="research.05_results.p8"
        defaultMessage="Im Vergleich: laut Amt für Statistik Berlin Brandenburg sieht die Altersverteilung in Berlin (Stand 2018) so aus:"
      />
      <List>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p8.list1"
            defaultMessage="unter 18 Jahre 16%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p8.list2"
            defaultMessage="18 bis 24 Jahre 7%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p8.list3"
            defaultMessage="25 bis 29 Jahre 8%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p8.list4"
            defaultMessage="30 bis 39 Jahre 17%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p8.list5"
            defaultMessage="40 bis 49 Jahre 13%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p8.list6"
            defaultMessage="50 bis 64 Jahre 20%"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p8.list7"
            defaultMessage="über 65 Jahre 19%"
          />
        </List.Item>
      </List>
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p9"
        defaultMessage="Zusätzlich wurden die Teilnehmenden gefragt wie oft sie zu Fuß, mit Bus und Bahn, dem Auto, dem Fahrrad und dem Motorrad unterwegs sind. Im Vergleich mit den Werten für Berlin aus der SrV 2018 gibt es einige Abweichungen. Die Werte für die Nutzung des öffentlichen Verkehrs (Bus und Bahn) mindestens 1x in der Woche in der Umfrage (64%) stimmen annähernd mit den Werten der SrV 2018 (62%) überein. Hingegen sind in dieser Umfrage die Nutzung des Pkws (35%) im Vergleich zur SrV 2018 (56%) unterrepräsentiert und die Nutzung des Fahrrads (64%) in der Umfrage (47% SrV) überrepräsentiert. ({link}. S.127ff)"
        values={{
          link: (
            <AnchorLink href="https://tu-dresden.de/bu/verkehr/ivs/srv/ressourcen/dateien/SrV2018_Staedtevergleich.pdf?lang=de">
              <FormattedMessage
                id="research.05_results.p9.link"
                defaultMessage="Gerike et. al, Sonderauswertung zum Forschungsprojekt „Mobilität in Städten – SrV 2018“ Städtevergleich, Dresden 2020"
              />
            </AnchorLink>
          ),
        }}
      />
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p10"
        defaultMessage="Weiter wurden in der Umfrage die Verfügbarkeit von Verkehrsmitteln,Motivationsfaktoren zum Radfahren bzw. Gründe nicht Rad zu fahren abgefragt. Die Daten sind im Datensatz enthalten."
      />
    </Paragraph>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p11"
        defaultMessage="In der Zusammenfassung bildet die Umfrage keine repräsentative Gesamtheit der Berliner Bevölkerung ab. Radfahrende, Männer und die Altergruppe zwischen 30 und 64 Jahren ist deutlich überrepräsentiert. Aufgrund der hohen Anzahl an Teilnehmenden können jedoch auch Auswertungen für spezifische Untergruppen gemacht werden (z.B. Frauen über 74 Jahre: 143 Teilnehmerinnen). Bei der durchschnittlichen Bewertung der unterschiedlichen Szenen zeichnet sich für die Nutzermerkmale Geschlecht, Alter und Nutzungshäufigkeit folgendes Bild: Geschlecht"
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart1.title',
        defaultMessage: 'Bewertungen nach Geschlecht',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart1.label',
        defaultMessage:
          'Anm: Durchschnitt aller Bewertungen nach Angaben zum Geschlecht der Teilnehmenden',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart1.1',
          defaultMessage: 'männlich',
        })}
        data={[8.18525, 21.410971, 34.95565, 35.448129]}
        feelsafe={70.4}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart1.2',
          defaultMessage: 'weiblich',
        })}
        data={[7.824049, 20.332307, 34.931507, 36.912137]}
        feelsafe={71.84}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart1.3',
          defaultMessage: 'divers',
        })}
        data={[9.831594, 21.240512, 33.906546, 35.021347]}
        feelsafe={68.93}
      />
    </BarChart.Wrapper>
    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart2.title',
        defaultMessage: 'Bewertungen nach Alter',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart2.label',
        defaultMessage:
          'Anm: Durchschnitt aller Bewertungen nach Angaben zum Alter der Teilnehmenden',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart2.1',
          defaultMessage: 'AG0 - unter 18 Jahre',
        })}
        data={[8.922697, 19.490132, 29.481908, 42.105263]}
        feelsafe={71}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart2.2',
          defaultMessage: 'AG1 - 18 bis 24 Jahre',
        })}
        data={[9.36742, 20.752886, 31.124479, 38.755215]}
        feelsafe={70}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart2.3',
          defaultMessage: 'AG2 - 25 bis 29 Jahre',
        })}
        data={[9.452893, 20.825782, 32.878943, 36.842382]}
        feelsafe={70}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart2.4',
          defaultMessage: 'AG3 - 30 bis 39 Jahre',
        })}
        data={[9.149358, 21.724335, 34.507092, 34.619215]}
        feelsafe={69}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart2.5',
          defaultMessage: 'AG4 - 40 bis 49 Jahre',
        })}
        data={[8.353393, 21.826761, 35.510278, 34.309567]}
        feelsafe={70}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart2.6',
          defaultMessage: 'AG5 - 50 bis 64 Jahre',
        })}
        data={[6.902527, 20.468174, 36.023561, 36.605738]}
        feelsafe={73}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart2.7',
          defaultMessage: 'AG6 -  65 bis 74 Jahre',
        })}
        data={[6.061991, 19.217255, 35.969147, 38.751607]}
        feelsafe={75}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart2.8',
          defaultMessage: 'AG7 - über 74 Jahre',
        })}
        data={[6.204244, 19.344832, 32.696364, 41.75456]}
        feelsafe={75}
      />
    </BarChart.Wrapper>
    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart3.title',
        defaultMessage: 'Bewertungen nach Nutzungshäufigkeit Fahrrad',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart3.label',
        defaultMessage:
          'Anm: Durchschnitt aller Bewertungen nach Angaben zur Nutzungshäufigkeit des Fahrrad unter den Teilnehmenden',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart3.1',
          defaultMessage: '(fast) täglich',
        })}
        data={[8.219178, 21.413216, 34.713547, 35.654059]}
        feelsafe={71}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart3.2',
          defaultMessage: '4-5 mal pro Woche',
        })}
        data={[7.542612, 21.50418, 35.653024, 35.300185]}
        feelsafe={71}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart3.3',
          defaultMessage: '1-3 mal pro Woche',
        })}
        data={[7.195407, 21.030776, 35.828827, 35.94499]}
        feelsafe={72}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart3.4',
          defaultMessage: '1-3 mal pro Monat',
        })}
        data={[7.983095, 19.878098, 34.502092, 37.636715]}
        feelsafe={72}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart3.5',
          defaultMessage: 'seltener als monatlich',
        })}
        data={[8.619391, 20.588077, 34.345744, 36.446788]}
        feelsafe={70}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart3.6',
          defaultMessage: 'nie',
        })}
        data={[9.122029, 20.652014, 34.344607, 35.88135]}
        feelsafe={70}
      />
    </BarChart.Wrapper>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p12"
        defaultMessage="Bei der Auswertung nach den unterschiedlichen Merkmalen unterscheiden sich die Ergebnisse zwischen den den einzelnen Nutzergruppen nur gering. Entsprechend wurde für die weitere Auswertung auf eine weitere Differenzierung verzichtet."
      />
    </Paragraph>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p13.heading"
        defaultMessage="Führung auf der Fahrbahn"
      />
    </Heading>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p13"
        defaultMessage="Wir betrachten zunächst die Führung an Hauptverkehrsstraßen. Nebenverkehrsstraßen werden in einem späteren Kapitel betrachtet."
      />
    </Paragraph>
    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p14.heading"
        defaultMessage="Führung im Mischverkehr ist unsicher"
      />
    </Heading>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p14"
        defaultMessage="Eine Führung des Radverkehrs im Mischverkehr wird als deutlich unsicherer empfunden als eine Führung auf jeder Art von RVA. Werden die Faktoren Tempolimit, Verkehrsstärke und rechtsseitiges Parken variiert ändert sich das Sicherheitsempfinden. Aber auch in der bestbewerteten Situation ist kein ausreichendes Sicherheitsempfinden (Wir gehen hier davon aus, dass eine Bewertung “eher sicher” oder “sicher” von über 80% der Teilnehmenden ein anzustrebender Wert für eine subjektiv sichere Infrastruktur ist) zu erzielen. Im Vergleich der Nutzermerkmale gibt es den größten Unterschied zwischen Männern und Frauen, aber insgesamt große Übereinstimmungen. Alle Typen von Radfahrenden (Viel-, oder Wenig-Radfahrende, weibliche oder männliche, ältere und jüngere, etc.) fühlen sich im Mischverkehr unsicher."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_2}>
        <FeelSafe.Image value={28} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p14.image1"
            defaultMessage="*27,62 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_587}>
        <FeelSafe.Image value={11} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p14.image2"
            defaultMessage="*11,05 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart4.title',
        defaultMessage:
          'Führung auf der Fahrbahn (HVS-F) mit und ohne Radverkehrsanlage (RVA)',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart4.label',
        defaultMessage:
          "Anm: Durchschnitt der Bewertungen aller Situationen auf HVS-F aus Fahrradperspektive. Busspuren wurden hier in der Gruppe 'mit RVA' aufgenommen.",
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart4.1',
          defaultMessage: 'mit RVA',
        })}
        data={[3, 18, 49, 30]}
        feelsafe={75.52}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart4.2',
          defaultMessage: 'ohne RVA',
        })}
        data={[52, 33, 12, 3]}
        feelsafe={14}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart4.3',
          defaultMessage: 'ohne RVA (Vielfahrer)',
        })}
        data={[51, 35, 12, 2]}
        feelsafe={15}
      />
    </BarChart.Wrapper>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p15.heading"
        defaultMessage="Ruhender Verkehr erzeugt zusätzliche Konflikte"
      />
    </Heading>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p15"
        defaultMessage="Wird die RVA linksseitig von ruhendem Verkehr geführt, so sinkt das Sicherheitsempfinden. Die Anforderungen und Gestaltungsmöglichkeiten an die RVA sind grundlegend zu unterscheiden. Bei Führung mit ruhendem Verkehr rechts der RVA (Parken-rechts) beeinträchtigt die potentielle Gefahr durch Türöffnung der parkenden Autos das Sicherheitsempfinden negativ. Weiter zu beachten ist, dass bauliche Trennungen zum fließenden KFZ-Verkehr in diesen Situationen nicht möglich sind, was den Gestaltungsspielraum bei der Planung verringert. In der Umfrage nicht bildlich dargestellt wurde die Gefahr durch ein- sowie ausparkende Autos. Das tatsächliche Sicherheitsempfinden in diesen Situationen könnte also noch geringer ausfallen."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_17}>
        <FeelSafe.Image value={69} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p15.image1"
            defaultMessage="*69,09% der Nutzer:innen bewerteten diese Situation ohne Parkstreifen als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_619}>
        <FeelSafe.Image value={33} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p15.image2"
            defaultMessage="*32,76 % der Nutzer:innen bewerteten diese Situation mit Parkstreifen als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart5.title',
        defaultMessage: 'HVS-F: RVA mit und ohne rechtsseitiges Parken',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart5.label',
        defaultMessage:
          'Anm.: Durchschnitt der Bewertungen aller Situationen mit RVA - ohne Tram, Busspur, oder RVA rechts des Parkens',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart5.1',
          defaultMessage: 'mit Parken rechts',
        })}
        data={[8, 29, 43, 19]}
        feelsafe={59.62}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart5.2',
          defaultMessage: 'ohne Parken (inkl. bauliche Trennung)',
        })}
        data={[2, 11, 40, 47]}
        feelsafe={85.47}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart5.3',
          defaultMessage: 'ohne Parken (exkl. bauliche Trennung)',
        })}
        data={[4, 18, 46, 32]}
        feelsafe={76.9}
      />
    </BarChart.Wrapper>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p16"
        defaultMessage="Drei zentrale Einflussfaktoren"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p17"
        defaultMessage="Für das subjektive Sicherheitsempfinden sind neben der Lage der RVA vornehmlich drei Faktoren relevant:"
      />
      <List>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p17.list1"
            defaultMessage="Die Breite der RVA"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p17.list2"
            defaultMessage="Ihre farbliche Unterscheidung"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.05_results.p17.list3"
            defaultMessage="Vorhandensein einer baulichen Trennung zum fließenden KFZ-Verkehr"
          />
        </List.Item>
      </List>
    </Paragraph>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p18"
        defaultMessage="Die Breite der Trennung Links spielt vornehmlich bei Situationen mit Parken rechts eine Rolle. Die weiteren in der Umfrage abgefragten Faktoren, Tempolimit und Verkehrsstärke, spielen eine vergleichsweise unbedeutende Rolle. Hier ist zu berücksichtigen, das die Empfindungen der Faktoren Tempolimit und Verkehrsstärke über die Visualisierungen nur abstrahiert vermittelt werden kann."
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart6.title',
        defaultMessage: 'RVA an HVS-F: Gewicht der Einflussfaktoren im Mittel',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart6.label',
        defaultMessage:
          'Anm.: Unterschied der Mittelwerte der Bewertungen aller für das Merkmal relevanter Situationen. Bei Baulicher Trennung, Markierung links, Tempolimit und Verkehrsaufkommen, werden nur solche Situationen ohne Tram, Bus und RVA rechts des Parkens einbezogen. Bei der Baulichen Trennung nur solche ohne Parken rechts.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart6.1',
          defaultMessage: 'Gesamtbreite RVA (Breit - schmal)',
        })}
        data={[21.51]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart6.2',
          defaultMessage:
            'Bauliche Trennung zu fließendem KFZ-Verkehr (ja - nein)',
        })}
        data={[22.17]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart6.3',
          defaultMessage: 'Oberflächenfarbe (grün - asphalt)',
        })}
        data={[10.57]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart6.4',
          defaultMessage: 'Markierung Links (gestrichelt - Sperrfläche)',
        })}
        data={[8.12]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart6.5',
          defaultMessage: 'Tempolimit (30 - 50)',
        })}
        data={[3.11]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart6.6',
          defaultMessage: 'Verkehrsstärke (normal - hoch)',
        })}
        data={[2.6]}
      />
    </BarChart.Wrapper>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p19.heading"
        defaultMessage="Breite der RVA zentral, besonders bei rechtsseitigem Parken"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p19"
        defaultMessage="In der Umfrage wurde unterschieden zwischen 3,5 Metern (breit) und 2,0 Metern (schmal) Breite für die RVA inkl. aller links und rechtsseitigen Markierungen (s.a. Umfragedesign). Im Ergebnis aller Situationen zeigt sich, dass breite RVA in den allermeisten Situationen als sicher empfunden werden. Im Durchschnitt bewerten 82.99 % der Teilnehmer:innen “diese als sicher” oder “eher sicher”."
      />
    </Paragraph>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p20"
        defaultMessage="Vergleichen wir beispielhaft einen Radstreifen an einer HVS ohne ruhenden Verkehr zeigt sich folgender Unterschied:"
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_305}>
        <FeelSafe.Image value={74} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p20.image1"
            defaultMessage="*73,68 % der Nutzer:innen bewerteten diese Situation mit einer breiten RVA als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_17}>
        <FeelSafe.Image value={69} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p20.image2"
            defaultMessage="*69,09 % der Nutzer:innen bewerteten diese Situation mit einer schmalen RVA als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p21"
        defaultMessage="Bei einem Radstreifen mit rechtsseitigem Parken ist der Unterschied zwischen schmaler und breiter Ausführung deutlich größer größer."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_980}>
        <FeelSafe.Image value={71} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p21.image1"
            defaultMessage="*70,71 % der Nutzer:innen bewerteten diese Situation mit breiter RVA neben einem Parkstreifen als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_620}>
        <FeelSafe.Image value={32} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p21.image2"
            defaultMessage="*32,23 % der Nutzer:innen bewerteten diese Situation mit schmaler RVA neben einem Parkstreifen als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart7.title',
        defaultMessage: 'HVS-F: RVA Gesamtbreite schmal und breit',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart7.label',
        defaultMessage:
          'Anm: Durchschnitt der Bewertungen aller Situationen mit RVA - ohne Tram, Busspur, oder RVA rechts des Parkens sowie Situationen mit baulicher Trennung. ',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart7.1',
          defaultMessage: 'RVA ohne Parken schmal',
        })}
        data={[5.98653, 23.522075, 47.318533, 23.172861]}
        feelsafe={70.49}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart7.2',
          defaultMessage: 'RVA ohne Parken breit',
        })}
        data={[3.001464, 12.591508, 44.558321, 39.848707]}
        feelsafe={84.41}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart7.3',
          defaultMessage: 'RVA mit Parken schmal',
        })}
        data={[19.22069, 39.432608, 31.377464, 9.969238]}
        feelsafe={41.35}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart7.4',
          defaultMessage: 'RVA mit Parken breit',
        })}
        data={[4.514474, 20.134713, 48.199824, 27.15099]}
        feelsafe={75.35}
      />
    </BarChart.Wrapper>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p22.heading"
        defaultMessage="Grüne Oberfläche hilft"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p22"
        defaultMessage="Wird die RVA durch eine grüne Oberfläche von der Kfz-Fahrbahn unterschieden, hat dies einen positiven Effekt auf das subjektive Sicherheitsempfinden. Je nach Situation ist dieser Effekt unterschiedlich stark. Umso schlechter die RVA ausgebaut ist, desto stärker ist der Effekt der Grüneinfärbung."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_21}>
        <FeelSafe.Image value={80} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p22.image1"
            defaultMessage="*80,37 % der Nutzer:innen bewerteten diese schmale RVA mit Grüneinfärbung als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_17}>
        <FeelSafe.Image value={69} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p22.image2"
            defaultMessage="*69,09 % der Nutzer:innen bewerteten diese schmale RVA ohne Grüneinfärbung als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_1220}>
        <FeelSafe.Image value={78} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p22.image3"
            defaultMessage="*77,87 % der Nutzer:innen bewerteten diese breite RVA mit Grüneinfärbung als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_980}>
        <FeelSafe.Image value={71} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p22.image4"
            defaultMessage="*70,71 % der Nutzer:innen bewerteten diese breite RVA ohne Grüneinfärbung als „sicher“ oder „eher sicher“"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart8.title',
        defaultMessage: 'HVS-F: RVA mit oder ohne Grüneinfärbung',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart8.label',
        defaultMessage:
          'Durchschnitt der Bewertungen aller Situationen mit RVA - ohne Tram, Busspur, oder RVA rechts des Parkens, sowie Situationen mit baulicher Trennung.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart8.1',
          defaultMessage: 'ohne Parken, breit asphalt',
        })}
        data={[2, 10, 37, 51]}
        feelsafe={87.55}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart8.2',
          defaultMessage: 'ohne Parken, breit grün',
        })}
        data={[2, 5, 31, 62]}
        feelsafe={93.5}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart8.3',
          defaultMessage: 'ohne Parken, schmal asphalt',
        })}
        data={[4, 19, 41, 36]}
        feelsafe={76.2}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart8.4',
          defaultMessage: 'ohne Parken, schmal grün',
        })}
        data={[2, 14, 43, 41]}
        feelsafe={83.07}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart8.5',
          defaultMessage: 'mit Parken, breit asphalt',
        })}
        data={[5, 23, 49, 22]}
        feelsafe={70.17}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart8.6',
          defaultMessage: 'mit Parken, breit grün',
        })}
        data={[3, 16, 47, 34]}
        feelsafe={80.42}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart8.7',
          defaultMessage: 'mit Parken, schmal asphalt',
        })}
        data={[23, 42, 28, 7]}
        feelsafe={34.19}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart8.8',
          defaultMessage: 'mit Parken, schmal grün',
        })}
        data={[13, 36, 37, 13]}
        feelsafe={49.82}
      />
    </BarChart.Wrapper>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p23"
        defaultMessage="In der Umfrage wurde eine weitere Variante – ein lediglich schraffierter grüner Strich linksseitig – getestet. Diese Variante brachte keine Verbesserung gegenüber einer normalen Asphaltoberfläche."
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart9.title',
        defaultMessage: 'HVS-F: RVA mit verschiedenen Arten der Grüneinfärbung',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart9.label',
        defaultMessage:
          'Anm: Durchschnitt der Bewertungen aller Situationen mit RVA - ohne Tram, Busspur, oder RVA rechts des Parkens.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart9.1',
          defaultMessage: 'RVA asphalt',
        })}
        data={[8.542686, 22.612828, 38.589373, 30.255113]}
        feelsafe={68.84}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart9.2',
          defaultMessage: 'RVA farbig',
        })}
        data={[4.890647, 17.087043, 39.353226, 38.669085]}
        feelsafe={78.02}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart9.3',
          defaultMessage: 'RVA farbig schraffur',
        })}
        data={[8.903186, 23.970115, 39.140811, 27.985888]}
        feelsafe={67.13}
      />
    </BarChart.Wrapper>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p24.heading"
        defaultMessage="Poller (Sperrpfosten) stärken Sicherheitsempfinden, Blumenkästen auch"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p24"
        defaultMessage="Eine bauliche Trennung zwischen RVA und fließendem Kfz-Verkehr stärkt das Sicherheitsempfinden. Dabei ist die Art der Trennung nicht entscheidend. Schaut man ins Detail, findet man, dass bei schmalen RVA kleine Poller (sog. Leitboys) am beliebtesten sind, bei breiten RVA erhalten Blumenkästen die meisten sicheren Bewertungen. Auffällig ist, dass eine grüne Oberfläche nur noch minimale Verbesserung erzielt, wenn es bereits eine breite RVA mit baulicher Trennung gibt."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_75}>
        <FeelSafe.Image value={90.65} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p24.image1"
            defaultMessage="Mit 90,65 % am sichersten bewertete bauliche Trennung bei schmaler RVA ohne Grüneinfärbung. Die Variante mit Grüneinfärbung kommt auf 97,52%"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_377}>
        <FeelSafe.Image value={97.52} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p24.image2"
            defaultMessage="Mit 98,38 % am sichersten bewertete bauliche Trennung bei breiter RVA ohne Grüneinfärbung. Die Variante mit Grüneinfärbung kommt auf 99,11 %"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart10.title',
        defaultMessage: 'HVS-F: RVA mit und ohne bauliche Trennung',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart10.label',
        defaultMessage:
          'Anm: Durchschnitt der Bewertungen aller Situationen mit RVA, - ohne rechtsseitiges Parken, Tram, Busspur, oder RVA rechts des Parkens.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart10.1',
          defaultMessage: 'ohne baul. Trennung, Markierung links schmal',
        })}
        data={[4.376283, 19.109343, 45.995893, 30.51848]}
        feelsafe={75.64}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart10.2',
          defaultMessage: 'ohne baul. Trennung, Markierung links breit',
        })}
        data={[3.933106, 16.64602, 46.097863, 33.32301]}
        feelsafe={78.91}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart10.3',
          defaultMessage: 'mit baul. Trennung Sperrpfosten-hoch',
        })}
        data={[1.895462, 7.352096, 25.272832, 65.479609]}
        feelsafe={90.75}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart10.4',
          defaultMessage: 'mit baul. Trennung Sperrpfosten-niedrig',
        })}
        data={[1.396078, 7.32549, 33.662745, 57.615686]}
        feelsafe={91.28}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart10.5',
          defaultMessage: 'mit baul. Trennung Blumenkasten',
        })}
        data={[1.466594, 7.224335, 25.31233, 65.996741]}
        feelsafe={91.31}
      />
    </BarChart.Wrapper>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p25.heading"
        defaultMessage="Lieber rechts als links vom ruhenden Verkehr"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p25"
        defaultMessage="Wird der Radverkehr gemeinsam mit ruhendem Kfz-Verkehr geführt, so wird die Führung rechts des ruhenden Verkehrs als deutlich sicherer empfunden. Hierbei ist zu beachten, dass die Umfrage die subjektive Sicherheit von Führungsformen entlang der Strecke untersucht hat, eine Aussage über die Auswirkung auf Knotenpunkte kann nicht getroffen werden."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_597}>
        <FeelSafe.Image value={91.3} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_980}>
        <FeelSafe.Image value={70.71} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p26"
        defaultMessage="Diese Führungsform kann durch bauliche Trennung oder Grüneinfärbung zusätzlich subjektiv sicherer gemacht werden, der Effekt ist aber relativ gering."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_611}>
        <FeelSafe.Image value={94.32} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_C_596}>
        <FeelSafe.Image value={95.45} />
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart11.title',
        defaultMessage: 'HVS-F: RVA Führung rechts und links vom Parken',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart11.label',
        defaultMessage:
          'Anm.: Durchschnitt der Bewertungen aller Situationen mit RVA breit, – ohne Tram, Busspur. Es werden nur Varianten mit breiter RVA verglichen, schmale RVA rechts des Parkens wurden in der Umfrage nicht dargestellt.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart11.1',
          defaultMessage: 'RVA breit, links des Parken',
        })}
        data={[3.812933, 19.951131, 48.818048, 27.417888]}
        feelsafe={74.54}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart11.2',
          defaultMessage:
            'RVA breit, rechts des Parken (exkl. baul. Trennungen)',
        })}
        data={[1.431025, 3.978248, 21.665713, 72.925014]}
        feelsafe={91.69}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart11.3',
          defaultMessage:
            'RVA breit, rechts des Parken (inkl. baul. Trennungen)',
        })}
        data={[1.060071, 7.022968, 34.584806, 57.332155]}
        feelsafe={94.22}
      />
    </BarChart.Wrapper>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p27.heading"
        defaultMessage="Wie sehen das Autofahrende?"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p27"
        defaultMessage="In der Umfrage wurde auch die Perspektive der Autofahrenden abgefragt,wobei die Frage hier nicht ausschließlich auf das eigeneSicherheitsempfinden abzielte sondern auf das allerVerkehrsteilnehmer:innen: “Wie empfinden Sie diese Situation beimAutofahren?” Von der Tendenz werden Situationen von Autofahrenden ähnlichwie von den Radfahrenden beurteilt. Im Durchschnitt werden dabei dieSituationen als weniger unsicher eingeschätzt, das KonfliktpotentialRadfahrender mit dem ruhenden Verkehr wird deutlich weniger starkwahrgenommen, bzw. als unsicher beurteilt."
      />
    </Paragraph>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p28.heading"
        defaultMessage="Auch Autofahrer wollen separate RVA"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p28"
        defaultMessage="Mischverkehr an Hauptstraßen wird im Vergleich zu vorhandener RVA ebenfalls als deutlich unsicherer bewertet, wenn auch nicht ganz so extrem, wie durch die Radfahrenden."
      />
    </Paragraph>

    {/* Fehlende Daten */}
    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart12.title',
        defaultMessage: 'HVS-F: mit und ohne RVA',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart12.label',
        defaultMessage:
          'Anm: Durchschnitt der Bewertungen aller Situationen aus Perspektive der Autofahrenden oder der Radfahrenden',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12.1',
          defaultMessage: 'Radperspektive: ohne RVA',
        })}
        data={[52, 33, 12, 3]}
        feelsafe={14.24}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12.2',
          defaultMessage: 'Radperspektive: mit RVA',
        })}
        data={[3, 18, 49, 30]}
        feelsafe={75.52}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12.3',
          defaultMessage: 'Autoperspektive: ohne RVA',
        })}
        data={[31.877551, 42.095238, 16.938776, 9.088435]}
        feelsafe={25.41}
        feelsafeIcon="car"
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12.4',
          defaultMessage: 'Autoperspektive: mit RVA',
        })}
        data={[1.773559, 12.917629, 47.055517, 38.253294]}
        feelsafe={82.99}
        feelsafeIcon="car"
      />
    </BarChart.Wrapper>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p29"
        defaultMessage="Autofahrer empfinden die Situation als deutlich sicherer, wenn eine klar getrennte RVA vorhanden ist. am besten mit Sperrfläche oder Doppellinie und Grüneinfärbung. Interessant ist, das der Faktor Parken hier keine große Rolle spielt, diese Gefahr für Radfahrende wird von den Autofahrer:innen scheinbar kaum wahrgenommen."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_A_1285}>
        <FeelSafe.Image value={94.68} icon="car" />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_A_586}>
        <FeelSafe.Image value={28.21} icon="car" />
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p30.heading"
        defaultMessage="Poller auch aus Autoperspektive sicherer"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p30"
        defaultMessage="Die bauliche Trennung der RVA durch Poller oder ähnliches erhöht auch aus Sicht der Autofahrenden die Sicherheit, wenn der Effekt hier auch deutlich weniger stark ist. Dabei favorisieren Autofahrer:innen Blumenkästen oder niedrige Poller. Wie man an dem Beispiel oben sehen kann werden aber auch breite RVA mit klarer Trennung und Grünmarkierung ähnlich sicher empfunden."
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart12b.title',
        defaultMessage: 'HVS-F: RVA mit und ohne bauliche Trennung',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart12b.label',
        defaultMessage:
          'Durchschnitt der Bewertungen aller Situationen mit RVA, - ohne rechtsseitiges Parken, Tram, Busspur, oder RVA rechts des Parkens.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12b.1',
          defaultMessage: 'Radperspektive: RVA ohne baul. Trennung',
        })}
        data={[4.05788, 17.882982, 46.429695, 31.629443]}
        feelsafe={76.9}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12b.2',
          defaultMessage: 'Radperspektive: RVA mit baul. Trennung',
        })}
        data={[1.366559, 6.879689, 30.90836, 60.845391]}
        feelsafe={91.2}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12b.3',
          defaultMessage: 'Autoperspektive: RVA ohne baul. Trennung',
        })}
        data={[2.398382, 13.937584, 44.731266, 38.932768]}
        feelsafe={82.76}
        feelsafeIcon="car"
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12b.4',
          defaultMessage: 'Autoperspektive: RVA mit baul. Trennung',
        })}
        data={[2.326551, 10.173449, 34.247832, 53.252168]}
        feelsafe={86.76}
        feelsafeIcon="car"
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12b.5',
          defaultMessage: 'Autoperspektive: Trennung Sperrpfosten-hoch',
        })}
        data={[3.789474, 11.508772, 30.105263, 54.596491]}
        feelsafe={84.7}
        feelsafeIcon="car"
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12b.6',
          defaultMessage: 'Autoperspektive: Trennung Sperrpfosten-niedrig',
        })}
        data={[2.107482, 10.410959, 35.911486, 51.570074]}
        feelsafe={87.48}
        feelsafeIcon="car"
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart12b.7',
          defaultMessage: 'Autoperspektive: Trennung Blumenkasten',
        })}
        data={[2.715547, 9.164969, 29.192125, 58.927359]}
        feelsafe={88.12}
        feelsafeIcon="car"
      />
    </BarChart.Wrapper>
    <Paragraph>
      <FormattedMessage
        id="research.05_results.p31"
        defaultMessage="Bei hohem Verkehrsaufkommen und Tempolimit 50 km/h empfinden Autofahrereine bauliche Trennung zum Radverkehr als sicherer. Dies gilt auch für diemeisten Situationen mit T30 und normalem Verkehrsaufkommen. Autofahrendehaben also ein klare Wahrnehmung für die Gefahr von Unfällen mitRadfahrenden und empfinden die Situation als angenehmer, wenn dieserKonflikt baulich entschärft ist."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_A_67}>
        <FeelSafe.Image value={87.77} icon="car" />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p31.image1"
            defaultMessage="Bestbewertete Situation aus Autoperspektive bei schmaler RVA, T50 und hohem Verkehrsaufkommen"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={MS_A_343}>
        <FeelSafe.Image value={88.66} icon="car" />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p31.image2"
            defaultMessage="Bestbewertete Situation aus Autoperspektive bei breiter RVA, T50 und hohem Verkehrsaufkommen"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p32.heading"
        defaultMessage="Führung im Seitenraum"
      />
    </Heading>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p33.heading"
        defaultMessage="RVA auf der Fahrbahn oder im Seitenraum?"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p33"
        defaultMessage="Eine Führung im Seitenraum wird im Durchschnitt als sicherer empfunden alseine auf der Fahrbahn. Abhängig von der Ausgestaltung der RVA,insbesondere in Bezug auf die jeweiligen Konfliktzonen (fließenderKfz-Verkehr, ruhender Verkehr, Fußverkehr) variieren die Bewertungenallerdings. Führungen im Seitenraum stellen insgesamt weniger hoheAnforderungen an die Gestaltung der RVA um ein hohes Sicherheitsempfindenbei Radfahrenden zu schaffen. Auf Straßen mit ruhendem Verkehr hat dieFührung im Seitenraum oder auf der Fahrbahn rechtsseitig des ruhendenVerkehrs eine deutliche höhere Bewertung als eine solche links desruhenden Verkehrs."
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart13.title',
        defaultMessage:
          'HVS mit RVA: Führungen im Seitenraum (HVS-S) und auf der Fahrbahn (HVS-F)',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart13.1',
          defaultMessage: 'Fahrbahn, RVA ohne Parken schmal',
        })}
        data={[5.98653, 23.522075, 47.318533, 23.172861]}
        feelsafe={70.49}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart13.2',
          defaultMessage: 'Fahrbahn, RVA ohne Parken breit',
        })}
        data={[3.001464, 12.591508, 44.558321, 39.848707]}
        feelsafe={84.41}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart13.3',
          defaultMessage: 'Fahrbahn, RVA mit Parken schmal',
        })}
        data={[19.22069, 39.432608, 31.377464, 9.969238]}
        feelsafe={41.35}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart13.4',
          defaultMessage: 'Fahrbahn, RVA mit Parken breit',
        })}
        data={[4.514474, 20.134713, 48.199824, 27.15099]}
        feelsafe={75.35}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart13.5',
          defaultMessage: 'Seitenraum, RVA breit',
        })}
        data={[0.677428, 3.889918, 29.751257, 65.681397]}
        feelsafe={94.61}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart13.6',
          defaultMessage: 'Seitenraum, RVA schmal',
        })}
        data={[3.729178, 23.567974, 43.98173, 28.721118]}
        feelsafe={69.1}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart13.7',
          defaultMessage: 'Fahrbahn, RVA rechts des Parken breit',
        })}
        data={[1.055662, 5.143954, 26.81382, 66.986564]}
        feelsafe={92.4}
      />
    </BarChart.Wrapper>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p34"
        defaultMessage="Ohne Parkspur sind sicher gestaltete RVA sowohl im Seitenraum als auch auf der Fahrbahn möglich."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_325}>
        <FeelSafe.Image value={87.93} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p34.image1"
            defaultMessage="Eine auf der Fahrbahn geführte, klar gestaltete, breite RVA ohne rechtsseitiges Parken, wie hier im Bild wird als sehr sicher empfunden"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_1100}>
        <FeelSafe.Image value={97.62} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p34.image2"
            defaultMessage="Eine gleich breite RVA im Seitenraum wird sogar noch etwas sicherer bewertet."
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <Paragraph>
      {' '}
      <FormattedMessage
        id="research.05_results.p35"
        defaultMessage="Eine schmale RVA im Seitenraum mit linksseitigem Parken wird als wesentlich sicherer empfunden als eine schmale auf der Fahrbahn geführte mit rechtsseitigem Parken, selbst bei “optimaler” Gestaltung dieser. Hier bietet die Führung im Seitenraum also klare Vorteile."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={MS_C_860}>
        <FeelSafe.Image value={47.55} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p35.image1"
            defaultMessage="Die bestbewertete RVA in schmaler Ausführung mit rechtsseitigem Parken"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_463}>
        <FeelSafe.Image value={78.95} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p35.image2"
            defaultMessage="Eine RVA im Seitenraum (mit linksseitigem Parken) in schmaler Ausführung mit Trennungen links und rechts durch Grünstreifen."
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p36"
        defaultMessage="Breite der RVA auch im Seitenraum ausschlaggebend"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p37"
        defaultMessage="Innerhalb der Varianten im Seitenraum spielt die RVA-Breite aus Sicht der Radfahrenden die eindeutig größte Rolle. Der Faktor Fußgängeraufkommen (mit / ohne Auslage) spielt eine Rolle bei schmalen Gehwegen. Einen kleineren Einfluss haben die Gehweggesamtbreite und die Art der Trennung. Der Faktor Verkehrsart links der RVA (Ruhender / Fließender Verkehr) hat nur einen sehr geringen Einfluss."
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart14.title',
        defaultMessage:
          'RVA im Seitenraum: Gewicht der Einflussfaktoren im Mittel',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart14.label',
        defaultMessage:
          'Anm: Unterschied der Mittelwerte der Bewertungen im Vergleich zweier Merkmalsausprägungen Es werden nur die für das Merkmal relevanten Situationen verglichen.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart14.1',
          defaultMessage: 'Gesamtbreite RVA (breit - schmal)',
        })}
        data={[24.09]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart14.2',
          defaultMessage: 'Gesamtbreite Gehweg (breit - schmal)',
        })}
        data={[1.33]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart14.3',
          defaultMessage: 'Auslage (vorhanden - keine)',
        })}
        data={[4.1]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart14.4',
          defaultMessage: 'Auslage (vorhanden - keine) nur schmaler Gehweg',
        })}
        data={[11.41]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart14.5',
          defaultMessage: 'Trennung rechts (Grünstreifen - keine Trennung)',
        })}
        data={[6.23]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart14.6',
          defaultMessage:
            'Faktor Verkehrsart links (Links RVA Fahrstreifen vs. Parken)',
        })}
        data={[1.1]}
      />
    </BarChart.Wrapper>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p38.heading"
        defaultMessage="Schmale RVA sind sicher – breite sehr sicher"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p38"
        defaultMessage="Breite RVA im Seitenraum erfahren eine sehr große Akzeptanz was das Sicherheitsgefühl betrifft. Aber auch schmale RVA erhalten noch relativ hohe Bewertungen. Es wurde in der Umfrage nicht nach geeigneten Ausbaustandards gefragt und kein hohes Radverkehrsaufkommen dargestellt. Es ist im Seitenraum aber – im Gegensatz z.B. zu schmalen RVA auf der Fahrbahn – einer sehr großen Gruppe von Menschen grundsätzlich ein entspanntes Radfahren möglich."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={CP_C_553}>
        <FeelSafe.Image value={76.52} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_1093}>
        <FeelSafe.Image value={97.47} />
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart15.title',
        defaultMessage: 'HVS-S: RVA breit und schmal',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart15.label',
        defaultMessage:
          'Anm.: Durchschnitt der Bewertungen aller Situationen im Seitenraum',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart15.1',
          defaultMessage: 'RVA breit',
        })}
        data={[0.677428, 3.889918, 29.751257, 65.681397]}
        feelsafe={94.61}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart15.2',
          defaultMessage: 'RVA schmal',
        })}
        data={[3.729178, 23.567974, 43.98173, 28.721118]}
        feelsafe={69.1}
      />
    </BarChart.Wrapper>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p39"
        defaultMessage="Auch wenn die Situation linksseitig der RVA im Durchschnitt keinen großen Einfluss hat sind dennoch in bestimmten Situationen starke Einschränkungen der subjektiven Sicherheit vorhanden, wie das untenstehende Beispiel zeigt."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={CP_C_516}>
        <FeelSafe.Image value={56.13} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p39.image1"
            defaultMessage="Ist fließender Verkehr linksseitig der RVA geführt, ist eine physische Trennung rechts problematisch."
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_509}>
        <FeelSafe.Image value={77.42} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p39.image2"
            defaultMessage="Besser ist dann die Trennung durch einen schmalen Grünstreifen."
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p40"
        defaultMessage="Geschäftsnutzung relevant bei engen Gehwegen"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p41"
        defaultMessage="Der Einfluss durch hohes Fußgänger:innenaufkommen, bzw. Geschäftsnutzung wurde in der Umfrage durch die Darstellung von Cafétischen dargestellt. Dieser Faktor wird relevant wenn die Gehweg-Gesamtbreite schmal ist."
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart16.title',
        defaultMessage: 'HVS-S: Mit und ohne Auslage',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart16.label',
        defaultMessage:
          'Anm.: Durchschnitt der Bewertungen aller Situationen im Seitenraum',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart16.1',
          defaultMessage: 'Breiter Gehweg Auslage ja',
        })}
        data={[2.043688, 11.751203, 39.159571, 47.045539]}
        feelsafe={84.24}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart16.2',
          defaultMessage: 'Breiter Gehweg Auslage nein',
        })}
        data={[2.039444, 11.687584, 37.483191, 48.78978]}
        feelsafe={84.16}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart16.3',
          defaultMessage: 'Schmaler Gehweg Auslage ja',
        })}
        data={[3.390943, 18.938234, 40.016772, 37.654051]}
        feelsafe={74.96}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart16.4',
          defaultMessage: 'Schmaler Gehweg Auslage nein',
        })}
        data={[1.710024, 9.920563, 35.795282, 52.574131]}
        feelsafe={86.4}
      />
    </BarChart.Wrapper>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p42"
        defaultMessage="Hier zeigen sich im Detail große Unterschiede: Ist die RVA gut getrennt und ausreichend breit, wird sie von Radfahrenden auch bei schmalem Gehweg als sicher empfunden. Ist sie dies nicht, so sinkt der Wert stark ab: zumindest eine gut erkennbare Trennung zwischen Rad und Fußverkehr sollte vorhanden sein."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={CP_C_725}>
        <FeelSafe.Image value={69.16} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_823}>
        <FeelSafe.Image value={98.18} />
      </ImageMulti.Inner>
    </ImageMulti>

    <ImageMulti>
      <ImageMulti.Inner source={CP_C_49}>
        <FeelSafe.Image value={49.56} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_58}>
        <FeelSafe.Image value={67.88} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p43.heading"
        defaultMessage="Fußgänger:innen ist eine eindeutige Trennung vom Radverkehr wichtig."
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p43"
        defaultMessage="Die meisten zu Fuß Gehenden fühlen sich grundsätzlich sicher mit einer Führung des Radverkehrs im Seitenraum. Wichtig ist ihnen eine eindeutige Trennung und ausreichend verbleibender Platz für den Fußverkehr."
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart17.title',
        defaultMessage: 'Diagramm Gewicht',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart17.label',
        defaultMessage:
          'Anm.: Unterschied der Mittelwerte der Bewertungen aller für das Merkmal relevanter Situationen. Die Fußperspektive wurde nur bei schmaler Gehweg-Gesamtbreite abgefragt.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart17.1',
          defaultMessage: 'Breite RVA schmal vs. breit',
        })}
        data={[5.76]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart17.2',
          defaultMessage: 'Trennung rechts (grün - keine)',
        })}
        data={[32.13]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart17.3',
          defaultMessage: 'Auslage (ja - nein)',
        })}
        data={[25.39]}
      />
    </BarChart.Wrapper>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p44.heading"
        defaultMessage="Hohes Fußverkehrsaufkommen erfordert passende Gestaltung"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p44"
        defaultMessage="Hat die Straße eine überwiegend geschäftliche Nutzung und damit verbundenes hohes Fußverkehrsaufkommen, so werden nur bestimmte Gestaltungen der RVA von den zu Fuß Gehenden als sicher empfunden. Im Vergleich zur Radperspektive zeigt sich ein deutlich unterschiedliches Empfinden der Situationen mit Auslage."
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart18.title',
        defaultMessage: 'HVS-S Fuß- und Radperspektive: Mit und ohne Auslage',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart18.label',
        defaultMessage:
          'Anm.: Durchschnitt der Bewertungen aller Situationen im Seitenraum. Die Auswertung vergleicht nur die Fälle mit schmaler Gehweggesamtbreite, da die Fußperspektive nur in dieser Variante abgefragt wurde.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart18.1',
          defaultMessage: 'Fußperspektive Auslage ja',
        })}
        data={[6.599897, 36.123951, 38.004337, 19.271814]}
        feelsafe={53.24}
        feelsafeIcon="walk"
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart18.2',
          defaultMessage: 'Fußperspektive Auslage nein',
        })}
        data={[1.740895, 12.454977, 42.070208, 43.73392]}
        feelsafe={83.36}
        feelsafeIcon="walk"
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart18.3',
          defaultMessage: 'Radperspektive Auslage ja',
        })}
        data={[3.390943, 18.938234, 40.016772, 37.654051]}
        feelsafe={74.95}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart18.4',
          defaultMessage: 'Radperspektive Auslage nein',
        })}
        data={[1.710024, 9.920563, 35.795282, 52.574131]}
        feelsafe={86.4}
      />
    </BarChart.Wrapper>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p45"
        defaultMessage="Eine Variante, mit der Radfahrende und Fußgänger:innen unter engen Platzverhältnissen relativ gut leben können, ist die Trennung durch einen Grünstreifen. In der realen Situation spielen Faktoren wie Überholvorgänge von Radfahrenden, frei laufende Hunde, Kinder etc. eine zusätzlich mindernde Rolle auf das Sicherheitsempfinden. Eine gemeinsame Führung von Radverkehr und Fußverkehr bei hohem Fußgängeraufkommen ist daher nur bei ausreichend breitem Gehweg zu empfehlen."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={CP_P_194}>
        <FeelSafe.Image value={81.44} icon="walk" />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p45.image1"
            defaultMessage="Trotz relativ enger Platzverhältnisse, wird diese Situation noch 81,44 % der zu Fuß Gehenden als “eher sicher” oder “sicher” empfunden."
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_C_194}>
        <FeelSafe.Image value={75.56} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p45.image2"
            defaultMessage="Die gleiche Situation wird von 75,56 % der Radfahrenden als “eher sicher” oder “sicher” bewertet."
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p46"
        defaultMessage="Eine eindeutige Trennung der RVA kann das subjektive Sicherheitsempfinden der zu Fuß Gehenden deutlich verbessern."
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart19.title',
        defaultMessage: 'HVS-S Fußperspektive: Mit und ohne Trennung',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart19.label',
        defaultMessage:
          'Anm.: Durchschnitt der Bewertungen aller Situationen im Seitenraum. Die Fußperspektive wurde nur bei schmaler Gehweggesamtbreite abgefragt.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart19.1',
          defaultMessage: 'Trennung rechts grünstreifen schmal',
        })}
        data={[2.90756, 16.603599, 39.771411, 40.71743]}
        feelsafe={78.18}
        feelsafeIcon="walk"
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart19.2',
          defaultMessage: 'Trennung rechts grünstreifen breit',
        })}
        data={[1.970729, 10.93387, 35.689949, 51.405451]}
        feelsafe={85.49}
        feelsafeIcon="walk"
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart19.3',
          defaultMessage: 'Trennung rechts keine',
        })}
        data={[8.617505, 35.028605, 35.731339, 20.622551]}
        feelsafe={56.35}
        feelsafeIcon="walk"
      />
    </BarChart.Wrapper>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p47"
        defaultMessage="Sind keine Auslagen vorhanden und ist der Radweg klar erkennbar vom Fußweg getrennt fühlen sich Fußgänger:innen mit den meisten Varianten der Radverkehrsführung sicher."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={CP_P_149}>
        <FeelSafe.Image value={90.52} icon="walk" />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={CP_P_778}>
        <FeelSafe.Image value={93.47} icon="walk" />
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p48"
        defaultMessage="Führung in Nebenverkehrsstraßen"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p49"
        defaultMessage="Der Vergleich einer Radverkehrsführung in Nebenverkehrsstraßen gegenüber der Führung an Hauptverkehrsstraßen ist nur bedingt aussagekräftig, da in der Umfrage nur statische Bilder gezeigt wurden, die den potenziellen Konflikt zwischen Kfz und Fahrrad zeigen. Das unterschiedliche Verkehrsaufkommen zwischen Haupt- und Nebenstraße konnte nur andeutungsweise abgebildet werden. Dennoch lassen die Ergebnisse Aussagen zum subjektiven Sicherheitsempfinden bei unterschiedlichen Gestaltungsformen von Nebenstraßen zu."
      />
    </Paragraph>
    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p50.heading"
        defaultMessage="Nebenstraßen am liebsten “autofrei”"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p50"
        defaultMessage="Auffällig ist, dass der Faktor “autofrei” (fließender Verkehr ja - nein) bei der Bewertung von Nebenstraßen die größte Rolle spielt. Außerdem haben Einbahnstraßen mit Gegenverkehr eine sehr negative Wirkung auf das Sicherheitsempfinden. Breitere Straßen werden als sicherer empfunden, ruhender Verkehr verschlechtert das Sicherheitsempfinden."
      />
    </Paragraph>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart20.title',
        defaultMessage: 'NVS: Gewicht der Einflussfaktoren im Mittel',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart20.label',
        defaultMessage:
          'Anm: Unterschied der Mittelwerte der Bewertungen im Vergleich zweier Merkmalsausprägungen. Grundlage sind alle für das Merkmal relevante Situationen. Ausgenommen sind die Situationen mit durchgehender Grüneinfärbung des Asphalts. Unter Markierung werden Fahrradstraße, Fahrradstraße - Sondermarkierung Dooring und Spielstraße zusammengefasst.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart20.1',
          defaultMessage: 'Straßenbreite (schmal vs. breit)',
        })}
        data={[30.5]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart20.2',
          defaultMessage: 'Parken (beidseitig – nein)',
        })}
        data={[19.4]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart20.3',
          defaultMessage: 'Parken (einseitig – nein)',
        })}
        data={[18.07]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart20.4',
          defaultMessage: 'Markierung (vorhanden – keine)',
        })}
        data={[26.14]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart20.5',
          defaultMessage:
            'Gegenläufige Einbahnstraße (gegenläufig vs. beidseitig)',
        })}
        data={[60.52]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart20.6',
          defaultMessage:
            'Einbahnstraße in Fahrtrichtung (einbahn vs. beidseitig)',
        })}
        data={[1.13]}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart20.7',
          defaultMessage: '“autofrei” (ja/nein)',
        })}
        data={[76.66]}
      />
    </BarChart.Wrapper>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p51"
        defaultMessage="Wenn wir alle Situationen ohne Markierungen (als Fahrradstraße oder Spielstraße) jedoch mit Kfz-Verkehr betrachten, so zeigt sich ein eher schlechtes durchschnittliches Sicherheitsempfinden. Die beste Variante erhält lediglich 33,40% sichere oder eher sichere Bewertungen."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={SE_C_11}>
        <FeelSafe.Image value={33.4} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={SE_C_71}>
        <FeelSafe.Image value={21.43} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p52"
        defaultMessage="Fahrradstraßen sind besser, aber nicht ausreichend"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p53"
        defaultMessage="Die Markierung von Fahrradstraßen verbessert das Sicherheitsempfinden, aber es werden keine besonders hohen Werte erreicht. Es wird maximal ein Wert von 45,03% sicherer oder eher sicherer Bewertungen erreicht. Bei Straßen ohne Parken und geführten Einbahnstraßen in Fahrtrichtung erhöht sich dieser Wert auf maximal 56,72%"
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={SE_C_2}>
        <FeelSafe.Image value={51.02} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p53.image1"
            defaultMessage="Die bestbewertete Fahrradstraße mit KFZ-Verkehr in beide Richtungen"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
      <ImageMulti.Inner source={SE_C_12}>
        <FeelSafe.Image value={56.72} />
        <ImageMulti.Subtitle>
          <FormattedMessage
            id="research.05_results.p53.image2"
            defaultMessage="Die bestbewertete Fahrradstraße mit KFZ-Verkehr als Einbahnstraße in Fahrtrichtung"
          />
        </ImageMulti.Subtitle>
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart21.title',
        defaultMessage: 'NVS: Markierungsarten',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart21.label',
        defaultMessage:
          'Anm: Durchschnitt der Bewertungen aller Situationen in Nebenverkehrsstraßen. Ausgenommen sind die Situationen mit durchgehender Grüneinfärbung des Asphalts.',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart21.1',
          defaultMessage: 'ohne Markierung',
        })}
        data={[35.902256, 36.172462, 20.911654, 7.013628]}
        feelsafe={27.93}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart21.2',
          defaultMessage: 'Fahrradstraße',
        })}
        data={[17.051071, 34.478701, 33.478466, 14.991763]}
        feelsafe={48.47}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart21.3',
          defaultMessage: 'Fahrradstraße - Sondermarkierung Dooring',
        })}
        data={[30.787364, 36.338991, 22.477605, 10.39604]}
        feelsafe={32.87}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart21.4',
          defaultMessage: 'Spielstraße',
        })}
        data={[17.137386, 34.837243, 34.633796, 13.391575]}
        feelsafe={48.03}
      />
    </BarChart.Wrapper>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p54"
        defaultMessage="Auffällig ist, dass Fahrradstraßen mit “Sondermarkierungen Dooring“ (Markierung der Dooring-Zone durch eine unterbrochene Linie, zusätzlich Markierung eines Doppelpfeils um das Nebeneinanderfahren von Radfahrenden anzuzeigen) schlechter abschneiden als solche mit einer großen Fahrradstraßen-Markierung auf der Fahrbahn. Dieser Vergleich ist durch die Darstellung in der Umfrage allerdings wenig aussagekräftig, da durch die Komposition der Bilder mehrere Faktoren (Kennzeichnung als Fahrradstraße, Optische Breite der zur Verfügung stehenden Fahrbahn, Position der Radfahrenden) die Bewertung beeinflussen können."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={SE_C_42}>
        <FeelSafe.Image value={45.03} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={SE_C_44}>
        <FeelSafe.Image value={21.74} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Heading as="h3">
      <FormattedMessage
        id="research.05_results.p55"
        defaultMessage="Die Holländische Lösung"
      />
    </Heading>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p56"
        defaultMessage="Wirklich gute Werte erhalten in den NVS lediglich die Varianten, bei denen kein fließender Kfz-Verkehr dargestellt wurde. Darunter sind auch Varianten mit parkenden Autos. (Dies würde z.B. der Situatione in einer Straße mit Durchfahrtssperren entsprechen, wo nur Anlieger einfahren können.) Die besten Bewertungen erhält die “holländische Lösung” mit aufgepflastertem Mittelstreifen und durchgehendem grünen Asphalt. Bei der Führung in Nebenstraßen scheint die optisch deutliche Signalisierung der Fahrradstraße eine hohe Bedeutung zu haben."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={SE_C_10}>
        <FeelSafe.Image value={98.33} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={SE_C_50}>
        <FeelSafe.Image value={92.42} />
      </ImageMulti.Inner>
    </ImageMulti>

    <Paragraph>
      <FormattedMessage
        id="research.05_results.p57"
        defaultMessage="Bei den Varianten mit ruhendem Verkehr zeigen sich deutliche Unterschiede in der Markierungsart."
      />
    </Paragraph>

    <ImageMulti>
      <ImageMulti.Inner source={SE_C_47}>
        <FeelSafe.Image value={74.54} />
      </ImageMulti.Inner>
      <ImageMulti.Inner source={SE_C_49}>
        <FeelSafe.Image value={54.83} />
      </ImageMulti.Inner>
    </ImageMulti>

    <BarChart.Wrapper
      title={intl.formatMessage({
        id: 'research.05_results.chart22.title',
        defaultMessage: 'NVS “autofrei”: Markierungsarten',
      })}
      source={intl.formatMessage({
        id: 'research.05_results.chart22.label',
        defaultMessage:
          'Anm: Durchschnitt der Bewertungen aller Situationen in Nebenverkehrsstraßen. Nur solche die ohne fließenden Kfz-Verkehrs dargestellt wurden',
      })}
    >
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart22.1',
          defaultMessage: 'Ohne Markierung',
        })}
        data={[15.428571, 33.142857, 33.0, 18.428571]}
        feelsafe={51.42}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart22.2',
          defaultMessage: 'Holländische Markierung',
        })}
        data={[2.039405, 6.394746, 22.571725, 68.994124]}
        feelsafe={91.56}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart22.3',
          defaultMessage: 'Fahrradstraße',
        })}
        data={[2.811245, 14.993307, 40.763052, 41.432396]}
        feelsafe={82.19}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart22.4',
          defaultMessage: 'Fahrradstraße - Sondermarkierung',
        })}
        data={[9.591983, 20.042949, 33.786686, 36.578382]}
        feelsafe={70.35}
      />
      <BarChart
        title={intl.formatMessage({
          id: 'research.05_results.chart22.5',
          defaultMessage: 'Spielstraße',
        })}
        data={[4.538799, 18.081991, 43.045388, 34.333821]}
        feelsafe={77.37}
      />
    </BarChart.Wrapper>
  </>
);

export default injectIntl(SectionResults);
