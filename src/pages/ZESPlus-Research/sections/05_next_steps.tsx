import React from 'react';

import { Paragraph, Heading, SectionProps } from '~/components2/Article';
// import ZESMobil from './images/ZESMobil';

const SectionNextSteps = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Wie geht es weiter?
    </Heading>
    <Paragraph>
      *Als nächste Schritte* sind Abschluss der Netzplanung und die
      Weiterentwicklung der Maßnahmenübersicht geplant. Parallel bewirbt sich
      das NUDAFA-Projekt im Rahmen der MobilitätsWerkStadt 2025 auf weitere
      Fördermittel des BMBF. Zukünftig sollen damit die agile Kommunikations-
      und Planungsplattform für die interkommunale Radverkehrsförderung
      weiterentwickelt werden und die Übertragbarkeit auf andere Kommunen
      (insbesondere auch für Wildau, Königs Wusterhausen und Schönefeld) erprobt
      werden. Geplant ist dabei bspw. Planungskarte, die Bewertung des
      Umsetzungsgrad des Konzepts mit dem Happy-Bike-Index 2.0 und die
      Entwicklung weiterer Themenkarten.
    </Paragraph>
    <Paragraph>
      *Die Integration der Nachbargemeinden* in den Betrachtungsraum des
      *ZESplus*-Konzepts bietet dabei die Möglichkeit, die entwickelte Methodik
      anzupassen und weiter zu entwickeln. Im Vordergrund steht dabei jedoch die
      Abstimmung mit den Nachbarkommunen zur Herstellung eines flächendeckenden,
      attraktiven und sicheren Wegenetzes.
    </Paragraph>
    <Paragraph>
      *Das geplante Reallabor für interkommunale Radverkehrsförderung* bietet
      dabei die Möglichkeit verschiedene Kooperationspartner zusammen zu
      bringen, um in konkreten Modellprojekten und *Realexperimenten* den
      Radverkehr stärker in der Region zu verankern. Ein besonders wichtiger
      Partner ist dabei die *TH Wildau* mit der dort angesiedelten
      *Stiftungsprofessur für Radverkehrsplanung*[LINK] und weiteren Professuren
      mit umfangreichen Kompetenzen in der Verkehrsplanung. Neben der
      Fortführung der Kooperation mit FixMyCity[LINK] und dem Fachgebiet Mobile
      Cloud Computing[LINK] der TU Berlin ist auch die intensive Zusammenarbeit
      mit dem FG Integrierte Verkehrsplanung an der TU Berlin[LINK] geplant.
    </Paragraph>
    <Paragraph>
      *Realexperimente* beschreiben dabei die transformation und
      transdiszipiplinäre Erforschung innovativer Ansätze der
      Radverkehrsförderung. Die Entwicklung der oben vorgestellten Karten bildet
      so ein Realexperiment. Weitere Realexperimente werden aktuell vorbereitet
      bzw. durchgeführt: Zur Verbesserung des Fahrkomforts erprobt die Gemeinde
      Eichwalde aktuell zusammen mit mehreren Firmen einer neuartigen
      Schleifmaschine zum Abschleifen von Fahrbahnflächen mit großem
      Kopfsteinpflaster. Am Humboldt-Gymnasium Eichwalde wurde mit der
      Partizipation Schulwegkartierung bereits erste Schritte zur Verbesserung
      des Schulischen Mobilitätsmanagements eingeleitet. Sie hilft, die
      Bedürfnisse der Schüler:innen besser zu verstehen, ihre Schulwege sicherer
      zu machen und mehr Menschen frühzeitig fürs Radfahren zu begeistern. Mit
      weiteren Schulen und in Kooperation mit dem Kinder und Jugend
      Verband[https://www.kjv.de/kultur/] soll dies fortgeführt werden.
    </Paragraph>
    {/* <Image src={ZESMobil} alt="Das ZESmobil" /> */}
    <Paragraph>
      *Das ZESmobil* soll zukünftig die Bürgerbeteiligung im Freien
      (corona-konform) unterstützten. Mit umfangreicher Ausstattung (integrierte
      Tablets, weitere Präsentationstechnik, Moderationskoffer, Handbibliothek,
      Sonnenschirm, klappbarer Tisch und Stühlen) bildet es das Bindeglied
      zwischen digitalen und analogen Beteiligungsformen, weil bspw. die
      Themenkarten mobil betrachtet und diskutiert werden können.
    </Paragraph>
  </>
);

export default SectionNextSteps;
