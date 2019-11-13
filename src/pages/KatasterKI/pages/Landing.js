import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Store from '~/store';
import { setTOSAccepted } from '../state';
import Flex from '~/components/Flex';

import Paragraph from '~/pages/KatasterKI/components/Paragraph';
import IconBar from '~/pages/KatasterKI/components/IconBar';
import IntroImgSrc from '~/images/404-weg-zu-ende.jpg';
import TOCCheckbox from '~/pages/KatasterKI/components/TOCCheckbox';

const IntroScreen = styled.div`
  background: url(${IntroImgSrc}) no-repeat center center;
  background-size: cover;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;

const IntroSubline = styled.div`
  color: white;
  font-size: 16px;
`;

const IntroBottom = styled.div`
  margin-top: auto;
`;

const IntroQuestion = styled.div`
  text-align: center;
  color: white;
  font-weight: 700;
`;

const IntroHeadline = styled.h1`
  font-family: 'Roboto Slab', serif;
  margin: 0.5em 0;
  text-align: center;
  color: white;
`;

const IntroCallToAction = styled.div`
  border-bottom: 2px solid white;
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin: 20px 0 10px 0;
`;

const Headline = styled.h2`
  font-size: 26px;
  color: ${config.colors.darkbg};
  border-bottom: 1px dotted ${config.colors.inactivegrey};
`;

const Content = styled.div`
  padding: 1rem;
`;

const Quote = styled.div`
  padding: 20px 15px;
  font-size: 26px;
  color: ${config.colors.darkbg};
`;

const onAcceptTOS = (ev) => Store.dispatch(setTOSAccepted(ev.target.checked));

const Landing = ({ isTosAccepted }) => {
  return (
    <>
      <IntroScreen>
        <IntroHeadline>Der Straßencheck für Berlin</IntroHeadline>
        <IntroSubline>
          Eine Umfrage für:
          <IconBar />
        </IntroSubline>

        <IntroBottom>
          <IntroQuestion>
            Wie können die Berliner Straßen sicher für alle werden? Sagen Sie es
            uns!
          </IntroQuestion>

          <TOCCheckbox
            checked={isTosAccepted}
            onChange={onAcceptTOS}
            labelColor="white"
          />
          <Flex alignItems="center" justifyContent="center">
            <IntroCallToAction>Alle Infos und Hintergründe</IntroCallToAction>
          </Flex>
        </IntroBottom>
      </IntroScreen>
      <Content>
        <Headline>Was will der Straßencheck erreichen?</Headline>
        <Paragraph>
          Diese Umfrage untersucht: Wie können die Berliner Straßen sicher für
          alle Menschen werden? Wir wollen wissen, wie Sie unterschiedliche
          Situationen im Verkehr wahrnehmen. Wo fühlen Sie sich sicher und wo
          nicht? Wo sehen Sie Konflikte mit anderen Verkehrsteilnehmenden?
        </Paragraph>
        <Quote>
          Wir brauchen Ihre Meinung, egal, ob Sie zu Fuss gehen, Auto oder
          Fahrrad fahren.
        </Quote>
        <Paragraph>
          Egal wie Sie unterwegs sind, ob Sie Fahrrad oder Auto fahren,
          hauptsächlich zu Fuss gehen oder alles kombinieren, machen Sie bei der
          Umfrage mit. Sie können die Straße aus mehreren Perspektiven
          betrachten und bewerten.
        </Paragraph>
        <Quote>Todo: Foto-Slider</Quote>
        <Quote>Todo: Akkordeon</Quote>
        <Headline>Warum gibt es den Straßencheck?</Headline>
        <Paragraph>
          Nach dem 2018 verabschiedeten Berliner Mobilitätsgesetz soll die
          Verkehrsplanung den Fußverkehr, Bus und Bahn und den Radverkehr
          stärker berücksichtigen, dafür werden viele Straßen umgestaltet, doch
          bisher ist unbekannt, auf welcher Art Radweg fahren die meisten
          Menschen am liebsten: Sind Poller, wie an der Hasenheide eine gute
          Lösung zum Schutz der Radfahrenden und was halten Autofahrende davon?
          Wie sollen sichere Fahrradstraßen aussehen? Wie breit muss ein Radweg
          sein, damit sich Menschen sicher überholen können und auf welchen
          Radwegen fahren z.B. auch ältere Menschen gerne? Wo gibt es Konflikte
          zwischen Rad- und Fußverkehr?
        </Paragraph>
        <Quote>
          Sind Poller eine gute Lösung, fühlen Sie sich damit sicher?
        </Quote>
        <Paragraph>
          Auf diesen Fragen will diese Umfrage Antworten geben, deswegen ist es
          wichtig, das möglichst viele Menschen sich daran beteiligen. Machen
          Sie mit und erzählen Sie auch Ihren Freunden und Ihrer Familie davon.
        </Paragraph>
        <Quote>Todo: Image</Quote>
        <TOCCheckbox checked={isTosAccepted} onChange={onAcceptTOS} />
        <Headline>Was passiert mit den Ergebnissen?</Headline>
        <Paragraph>
          Alle Ihre Bewertungen zählen und helfen die Straßen Berlins besser für
          alle zu gestalten. Die Ergebnisse der Umfrage werden hier aus
          tagesspiegel.de veröffentlicht. Sie werden außerdem aufbereitet und
          der Senatsverwaltung für Verkehr zur Verfügung gestellt, die bereits
          bei der Konzeption der Umfrage mitgewirkt hat. AUch für die Forschung
          und zukünftige Planungen in anderen Städten sind Ergebnisse sehr
          wichtig und werden dafür wissenschaftlich ausgewertet.
        </Paragraph>
        <Headline>Wer steckt hinter der Umfrage?</Headline>
        <Paragraph>
          Die Umfrage wurde in einer Kooperation von FixMyBerlin und
          Tagesspiegel entwickelt. Die Senatsverwaltung für Verkehr, Umwelt und
          Klimaschutz hat die Umfrage fachlich begleitet und wird bei der
          Auswertung der Ergebnisse die Projektpartner unterstützen. Die Umfrage
          wird durch den ADFC und den ADAC unterstützt und wurde durch
          zahlreiche Expertinnen und Experten aus der Unfall- und
          Verkehrsforschung begleitet. Gefördert wird das Projekt durch Mittel
          des BMVI im Rahmen des Nationalen Radverkehrsplans und durch die
          Berliner Senatskanzlei.
        </Paragraph>
        <TOCCheckbox checked={isTosAccepted} onChange={onAcceptTOS} />
        <Quote>Todo: Projektpartner</Quote>
      </Content>
    </>
  );
};

const mapStateToProps = (state) => ({
  isTosAccepted: state.KatasterKIState.isTosAccepted
});

export default connect(mapStateToProps)(Landing);
