/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';

import AreaMap from '~/apps/Gastro/components/AreaMap';

import { EventPermit } from '../types';
import { dateReceived, getPermitFee, eventDate, dateDecided } from '../utils';

const PermitContainer = styled.section`
  h1 {
    font-size: 2em;
  }

  h2,
  h3,
  h4 {
    font-size: 1.4em;
    margin: 0;
  }

  hr,
  h4 {
    font-weight: normal;
  }

  h4 {
    font-size: 1.2em;
    font-weight: bold;
    margin: 2em 0;
  }

  p.address {
    font-size: 16px;
    margin-bottom: 1em;
  }

  @media print {
    font-size: 12px !important;
    line-height: 1.2 !important;
  }

  table {
    border-collapse: collapse;
    margin-bottom: 1em;
  }

  table,
  td {
    border: 1px solid #333;
  }

  td {
    padding: 0.5em 1em;
  }

  td:first-child {
    font-weight: bold;
  }

  .mapbox-improve-map {
    display: none;
  }
`;

const Headline = styled.div`
  margin: 2em auto;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  flex-direction: row;

  & span {
    width: 50%;
  }
`;

const StyledAreaMap = styled(AreaMap)`
  width: 100%;
`;

type Props = {
  application: EventPermit;
  id: number;
};

const Permit = ({ application, id }: Props) => {
  if (application.status !== 'application_accepted')
    return <p>Dieser Antrag wurde bisher nicht bewilligt.</p>;

  const fees = getPermitFee(application);

  return (
    <PermitContainer>
      <h2>Bezirksamt Friedrichshain-Kreuzberg von Berlin</h2>
      <h3>Abt. Familie, Personal, Diversity, Straßen- und Grünflächen</h3>
      <h3>Straßen- und Grünflächenamt</h3>

      <Headline>
        <span className="address">
          {application.first_name} {application.last_name}
          <br /> {application.address}
        </span>
        <span>
          <p>
            <p>{dateDecided(application)}</p>
            <strong>Geschäftszeichen (bitte immer angeben): </strong>
            <br />
            Event-Terrassen-{id}
          </p>
          {fees != null && (
            <p>
              <strong>
                Bei Zahlungen bitte unbedingt das / die Kassenzeichen aus dem
                Gebührenbescheid angeben!
              </strong>
            </p>
          )}
        </span>
      </Headline>

      <p>
        Sehr geehrte Damen und Herren, <br />
        gemäß Ihrem Antrag vom {dateReceived(application)} und aufgrund des § 29
        Abs. 2 der Straßenverkehrsordnung (StVO) sowie nach § 11 Abs. 1 i.V.m.
        §13 des Berliner Straßengesetzes ( BerlStrG ) in der jeweils geltenden
        Fassung, wird unter dem Vorbehalt des jederzeit zulässigen Widerrufs
        folgende Erlaubnis erteilt:
      </p>

      <h1 style={{ color: 'red' }}>Sondererlaubnis.</h1>

      <table>
        <tbody>
          <tr>
            <td>Veranstalter</td>
            <td>
              Name: {application.first_name} {application.last_name} <br />
              Anschrift: {application.address}
            </td>
          </tr>
          <tr>
            <td>Bezeichnung der Veranstaltung</td>
            <td>{application.title}</td>
          </tr>
          <tr>
            <td>Zeitlicher Verlauf</td>
            <td>
              <p>
                Dauer der Veranstaltung: am {eventDate(application)} von{' '}
                {application.event_start.slice(0, -3)} Uhr bis{' '}
                {application.event_end.slice(0, -3)} Uhr.
              </p>
              <p>
                Aufbau am {eventDate(application)} von{' '}
                {application.setup_start.slice(0, -3)} Uhr bis{' '}
                {application.event_start.slice(0, -3)} Uhr
              </p>
              <p>
                Abbau am {eventDate(application)} von{' '}
                {application.event_end.slice(0, -3)} Uhr bis{' '}
                {application.teardown_end.slice(0, -3)} Uhr
              </p>
            </td>
          </tr>
          <tr>
            <td>Ort</td>
            <td>
              Berlin, Friedrichshain-Kreuzberg, innerhalb der auf der
              untenstehenden Karte verzeichneten Fläche{' '}
              <strong>nur im Bereich der Parkflächen.</strong>
              <StyledAreaMap application={application} printable showAreaPin />
            </td>
          </tr>
          <tr>
            <td>Gebühren</td>
            <td>
              {fees == null && <p>Der Bescheid ergeht gebührenfrei.</p>}
              {fees != null && (
                <p>
                  Es fallen Gebühren in Höhe von {fees} an.{' '}
                  <strong>
                    Bitte beachten Sie den separat verschickten
                    Gebührenbescheid.
                  </strong>
                </p>
              )}
            </td>
          </tr>
          {application.note != null && application.note.length > 0 && (
            <tr>
              <td>Besondere Hinweise:</td>
              <td>{application.note}</td>
            </tr>
          )}
          <tr>
            <td>Hinweise</td>
            <td>
              <p>
                Diese Erlaubnis und die straßenrechtliche Zustimmung werden
                vorbehaltlich der Rechte Dritter erteilt. Zuwiderhandlungen
                gegen die Nebenbestimmungen dieser Ausnahmegenehmigung und
                Erlaubnis stellen eine Ordnungswidrigkeit dar, die mit einer
                Geldbuße bis zu 10.000,00 € geahndet werden kann. Außerdem
                behalte ich mir bei Zuwiderhandlungen den Widerruf und die
                Einziehung dieses Bescheides vor. Die beigefügten Anlagen,{' '}
                <strong>
                  insbesondere der ggf. beigefügte Verkehrszeichenplan
                </strong>{' '}
                bilden einen wesentlichen Bestandteil des Bescheides.
              </p>
              <p>
                Die Fortsetzung der Nebenbestimmungen und die Anlagen sind
                Bestandteil dieses Bescheides.
              </p>
            </td>
          </tr>
          <tr>
            <td>Anlagen</td>
            <td>
              <ul>
                <li>Verkehrszeichenplan (Regelplan)</li>
                <li>Merkblatt &ldquo;Sanitätsdienst&rdquo;</li>
                <li>
                  Merkblatt &ldquo;Berliner Feuerwehr&rdquo; und
                  Muster-Richtlinien über Flächen für die Feuerwehr
                </li>
                <li>
                  Bitte beachten Sie gegebenenfalls weitere Anlagen zu der
                  Erlaubnis, die Sie in der Bewilligungs-E-Mail erhalten haben.
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <section>
        <h3>Allgemeine Nebenbestimmungen:</h3>
        <p>
          Das Original der Erlaubnis ist mitzuführen und den Mitarbeitern der
          zuständigen Ordnungsbehörde auf Verlangen auszuhändigen.
        </p>
        <p>
          Diese Erlaubnis gilt vorbehaltlich der Erteilung einer
          Ausnahmegenehmigung / Ausnahmezulassung nach dem Landes
          Immissionsschutzgesetz, die ggf. gesondert zu beantragen ist.{' '}
        </p>

        <p>
          Die Vorschriften des Landes-Immissionschutzgesetzes Berlin (LImschG)
          in der jeweils geltenden Fassung sind einzuhalten.{' '}
        </p>

        <p>
          Es darf nur die im beigefügten Lageplan eingezeichnete Verkehrsfläche
          genutzt werden.{' '}
        </p>

        <p>
          Zur Sicherung des Veranstaltungsbereichs sind vom Veranstalter die in
          dem beigefügten Verkehrszeichenplan eingezeichneten verkehrlichen
          Maßnahmen durchzuführen. Nähere Erläuterungen hierzu sind der Anlage B
          zu entnehmen.{' '}
        </p>
        <p>
          Eine Gefährdung anderer Verkehrsteilnehmender (z.B. Radfahrende und zu
          Fuß Gehende) ist auszuschließen.{' '}
        </p>
        <p>
          Der Veranstalter hat die Teilnehmer in geeigneter Form darüber in
          Kenntnis zu setzen, dass die Vorschriften der Straßenverkehrsordnung
          einzuhalten sind.{' '}
        </p>
        <p>
          Der Veranstalter hat die von der Veranstaltung unmittelbar betroffenen
          Anwohner umgehend durch Wurfsendungen über den Ort, die Zeit und den
          Ablauf der Veranstaltung zu unterrichten{' '}
        </p>
        <p>
          Hydranten, Anleiterflächen der Feuerwehr und Notausstiege sind
          freizuhalten{' '}
        </p>
        <p>
          Der allgemeine Fußgängerverkehr darf im gesamten Veranstaltungsbereich
          nicht unvertretbar beeinträchtigt werden.
        </p>
        <p>
          Bei Dunkelheit und bei Nebel ist für ausreichende Beleuchtung zu
          sorgen{' '}
        </p>
        <p>
          Soweit erforderlich, ist die Nutzungsfläche von Schnee- und Eisglätte
          zu befreien. Der Veranstalter hat die Veranstaltungsfläche unmittelbar
          nach Beendigung der Veranstaltung ordnungsgemäß zu reinigen bzw.
          reinigen zu lassen.{' '}
        </p>
        <p>
          Sofern über die Nebenbestimmungen dieser Erlaubnis hinaus weitere
          Maßnahmen in verkehrspolizeilicher oder sicherheitspolizeilicher
          Hinsicht notwendig werden, ist den entsprechenden Anordnungen der
          zuständigen Ordnungsbehörden nachzukommen.{' '}
        </p>
        <p>
          Nach aktuellem Stand der
          SARS-CoV-2-Infektionsschutzmaßnahmenverordnung müssten die
          Antragstellenden ein auf die konkrete Veranstaltung bezogenes Schutz-
          und Hygienekonzept erstellen und auf Verlangen den zuständigen
          Behörden vorlegen. In diesem Konzept ist darzulegen, wie die
          allgemeinen Anforderungen der Infektionsschutzverordnung, insbesondere
          Abstands- und Hygieneregeln, auf der jeweiligen Veranstaltung
          umgesetzt werden sollen. Bitte beachten Sie dazu die jeweils gültigen
          Verordnungen.
        </p>

        <h3>Nebenbestimmungen des Trägers der Straßenbaulast </h3>
        <p>
          Vor dem Beginn der Veranstaltung ist mit einem Vertreter des
          Fachbereichs Straßen ein Pflasterprotokoll anzufertigen. Unter bleibt
          dies, wird davon ausgegangen, dass sich die Straßenbefestigung vor
          Inanspruchnahme in einem ordnungsgemäßen Zustand befand.{' '}
        </p>
        <p>
          Pfosten, Anker, o.ä. evtl. vorgesehener Aufbauten dürfen nicht
          eingegraben werden, Kabelschächte, Hydranten, Schieberkästen,
          Einsteigeschächte, Baumscheiben usw. müssen jederzeit zugänglich
          bleiben und dürfen nicht bedeckt werden. Laternen, Bäume Feuermelder
          und dergl. sind ggf. durch Ummantelungen zu schützen.{' '}
        </p>
        <p>
          Gehwege und Fußgängerzonen dürfen mit Kraftfahrzeugen nicht befahren
          werden.
        </p>
        <p>
          Die Straßenrinne ist in ca. 30 cm Breite für den ungehinderten Ablauf
          des Regenwassers freizuhalten.{' '}
        </p>

        <p>
          Die Ausübung eines auf Gewinn gerichteten Handels ist nicht zulässig.{' '}
        </p>

        <p>
          Soweit Verkehrsschilder und Absperrungen erforderlich werden, hat sich
          der Veranstalter diese auf eigene Kosten zu beschaffen oder von
          einschlägigen Firmen zu leihen.{' '}
        </p>

        <p>
          Für alle Schäden am Straßenkörper und an Bestandteilen der Straße
          sowie für alle Körper-, Sach- und Vermögensschäden Dritter, die durch
          die Sondernutzung entstehen, haftet der Sondernutzer. Er hat Berlin
          von allen diesbezüglichen Ansprüchen freizustellen. Hierzu gehört auch
          die gerichtliche und außergerichtliche Abwehr von Ansprüchen. Soweit
          Schäden durch die Sondernutzung an der Straßenbefestigung oder am
          Straßenzubehör entstanden sind, wird Berlin diese auf Kosten des
          Genehmigungsinhabers beseitigen.{' '}
        </p>
        <p>
          Im Falle des Widerrufs, bei sonstiger Beendigung der Maßnahme oder bei
          der Notwendigkeit einer Verlegung des Standorts kann ein
          Entschädigungsanspruch gegen Berlin nicht geltend gemacht werden.{' '}
        </p>
        <p>
          Bei der Abgabe von Speisen und Getränken dürfen nur wiederverwendbares
          Geschirr, Bestecke und Mehrwegtrinkgefäße verwendet werden.
          Zapfanlagen sind nur mit Mehrweggetränkebehältnissen (z.B.- Fässern)
          zu betreiben Die Abgabe von Portionspackungen z.B. für Kaffeesahne,
          Ketchup und Senf ist nicht zulässig.{' '}
        </p>
        <p>
          Alle anfallenden Transport-, / Um- und Verkaufsverpackungen (z.B.
          Paletten, Folien, Kartons) sind getrennt nach Wertstoffarten zu
          erfassen und einer stofflichen Verwertung oder erneuten Verwendung
          zuzuführen. Dies betrifft die folgenden Wertstoffarten: Pappe /
          Papier, Glas, Weißblech, Aluminium, Kunststoffe und Verbunde.{' '}
        </p>

        <p>
          Folgende Fraktionen an Abfällen/ Reststoffen sind getrennt zu erfassen
          und einer Verwertung zuzuführen: Weißglas, Braun- und Grünglas,
          Papier, Pappe, Kunststoff, Metall, kompostierte / vegetable Stoffe und
          sonstige Verpackungsabfälle (z.B. Holzabfälle, Styropor).{' '}
        </p>
        <p>Nicht verwertbare Abfälle sind ordnungsgemäß zu entsorgen. </p>

        <p>
          Altfette, Öle, Speisereste u.a. dürfen nicht in die Kanalisation,
          Regenabläufe, Toiletten oder ähnlich Abflüsse geschüttet werden. Es
          wird ausdrücklich darauf hingewiesen, dass die nicht ordnungsgemäße
          Entsorgung derartiger Abfälle von strafrechtlicher Relevanz ist.{' '}
        </p>
        <p>
          Bei Zelten und ähnlichen Aufbauten ist Barrierefreiheit zu
          gewährleisten, d.h., sie müssen auch für Rollstuhlfahrer zugänglich
          sein (Rampen). Sofern dies nicht im Einzelfall unumgänglich ist,
          dürfen Tische und Stühle nicht auf Podesten aufgestellt werden.{' '}
        </p>
        <p>
          Der Veranstalter hat für die Standsicherheit und Verkehrssicherheit
          sämtlicher Aufbauten in Verbindung mit der Veranstaltung zu sorgen.
          Soweit die bauordnungsrechtlichen Vorschriften dies vorsehen, ist das
          zuständige Bauaufsichtsamt zu beteiligen.{' '}
        </p>

        <h3>Hinweis:</h3>
        <p>
          Ich weise vorsorglich darauf hin, dass z.B. auch bei der Abgabe von
          Speisen und Getränken zum Selbstkostenpreis durchaus Belange des
          Gewerberechts berührt werden können und empfehle daher, sich im
          Zweifelsfall rechtzeitig mit unserem Bereich Gewerbeservice ins
          Benehmen zu setzen{' '}
        </p>
        <h3>Rechtsbehelfsbelehrung: </h3>
        <p>
          Gegen den vorstehenden Bescheid einschließlich der
          Gebührenfestsetzungen ist der Widerspruch zulässig. Er ist innerhalb
          eines Monats nach Zugang dieses Bescheides schriftlich oder zur
          Niederschrift beim Bezirkssamt Friedrichshain - Kreuzberg von Berlin,
          Straßen- und Grünflächenamt, Yorckstraße 4-1, 10963 Berlin oder auf
          elektronischem Weg durch E-Mail mit qualifizierter elektronischer
          Signatur nach dem Signaturgesetz an die E-Mail-Adresse
          post@ba-fk.berlin.de zu erheben. Es wird darauf hingewiesen, dass bei
          schriftlicher Einlegung des Widerspruchs die Widerspruchsfrist nur
          dann gewahrt ist, wenn der Widerspruch innerhalb dieser Frist
          eingegangen ist. Nach § 80 Abs. 2 Nr.1 der Verwaltungsgerichtsordnung
          (VwGO) hat ein Widerspruch bei der Anforderung von öffentlichen
          Abgaben und Kosten keine aufschiebende Wirkung. Die Erhebung des
          Widerspruchs befreit daher nicht von der fristgemäßen Zahlung der
          festgesetzten Verwaltungsgebühren.
        </p>

        <p>
          Mit freundlichen Grüßen <br />
          Straßen- und Grünflächenamt Friedrichshain-Kreuzberg
        </p>
      </section>
    </PermitContainer>
  );
};

export default Permit;
