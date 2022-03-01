/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import { SenderDepartment } from './SenderDepartment';

import AreaMap from '~/apps/Gastro/components/AreaMap';

import { EventPermit } from '../types';
import {
  dateDecided,
  dateReceived,
  photosDue,
  getPermitFee,
  eventDate,
} from '../utils';

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
      <SenderDepartment />

      <Headline>
        <span className="address">
          {application.first_name} {application.last_name}
          <br /> {application.address}
        </span>
        <span>
          <p>{dateDecided(application)}</p>
          <p>
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
        Sehr geehrte/r {application.first_name} {application.last_name}, <br />
        Auf Grund Ihres Antrages vom {dateReceived(application)}, erteile ich
        Ihnen hiermit nach § 6 Abs. 5 des Gesetzes zum Schutz, zur Pflege und
        zur Entwicklung der öffentlichen Grün- und Erholungsanlagen
        (Grünanlagengesetz -GrünanIG-) vorbehaltlich der Rechte Dritter und des
        jederzeitigen Widerrufs, der beim Vorliegen öffentlichen Interesses
        geltend gemacht wird, die
      </p>

      <h1>Erlaubnis zur Sondernutzung.</h1>

      <table>
        <tbody>
          <tr>
            <td>Veranstalter</td>
            <td>
              <p>
                Name: {application.first_name} {application.last_name} <br />
                Anschrift: {application.address}
              </p>
              {application.org_name.length > 0 && <p>{application.org_name}</p>}
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
              <p>
                Öffentliche geschützte Grün- und Erholungsanlage{' '}
                {application.area_park_name_long}.
              </p>

              {application.setup_sketch != null &&
                application.setup_sketch.length > 0 && (
                  <p>Aufbauten analog dem beigefügten Lageplan.</p>
                )}

              <StyledAreaMap application={application} printable showAreaPin />
            </td>
          </tr>
          <tr>
            <td>Zeck der Inanspruchnahme / Sondernutzung</td>
            <td>
              {application.details.split('\n').map((line) => (
                <>
                  {line}
                  <br />
                </>
              ))}
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
          <tr>
            <td>Begründung</td>
            <td>
              <p>
                Gemäß § 6 Abs. 5 des GrünanlG bedarf eine Benutzung der
                öffentlichen Grün- und Erholungsanlagen, die über deren
                Zweckbestimmung hinausgeht, der Genehmigung der zuständigen
                Behörde. Die Genehmigung kann im Einzelfall erteilt werden, wenn
                das überwiegende öffentliche Interesse dies erfordert und die
                Folgenbeseitigung gesichert ist. Bei der Entscheidung ist zu
                berücksichtigen, ob andere Standorte eine geringere
                Beeinträchtigung der Anlage zur Folge haben. Die Genehmigung
                kann mit Auflagen verbunden werden.
              </p>
              <p>
                Die Veranstaltung liegt im besonderen öffentlichen Interesse des
                Landes Berlin. Neben der Pandemievorsorge durch die Ausweisung
                von zusätzlichen Flächen steht ein Angebot von vorbestimmten
                Sondernutzungsflächen in Grünanlagen im Zentrum dieses
                Interesses, um in einem geordneten Verfahren geeignete Flächen
                für eine über den Gemeingebrauch hinausgehende, nicht
                kommerzielle Nutzung auszuweisen.
              </p>
              {application.is_public_benefit && (
                <p>
                  Der {application.org_name} ist als gemeinnützig anerkannt.
                </p>
              )}
              <p>
                Die Folgebeseitigung von möglichen Schäden ist gesichert, da von
                Ihnen eine Versicherungsbestätigung für die
                Betriebshaftpflichtversicherung eingereicht worden ist. Eine
                Nutzung des öffentlichen Straßenlandes oder angrenzender
                Privatflächen im Nahbereich der Sondernutzungsfläche ist nicht
                möglich. Bei der Veranstaltung handelt es sich um eine
                Veranstaltung, deren Durchführung auf spielerische Aktivitäten
                auf einer Grünanlage ausgerichtet ist. Die Prüfung zur Nutzung
                von Alternativflächen außerhalb einer geschützten Grün- und
                Erholungsanlage kommt daher nicht in Betracht, da sie dem
                Charakter der Veranstaltung widersprechen würde. Die
                Voraussetzungen zur Erteilung dieser Sondernutzungsgenehmigung
                gem. § 6 Abs. 5 des GrünanlG sind somit gegeben.
              </p>
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
                Die Fortsetzung der Nebenbestimmungen und die Anlagen sind
                Bestandteil dieses Bescheides.
              </p>
            </td>
          </tr>
          <tr>
            <td>Anlagen</td>
            <td>
              <ul>
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
        <h3>
          Diese Genehmigung ist mit folgenden Nebenbestimmungen und Auflagen
          verbunden:
        </h3>
        <ol>
          <li>
            Vom Veranstalter ist eine Fotodokumentation zu fertigen (vor Aufbau
            und nach Abbau). Diese ist spätestens zum {photosDue(application)}{' '}
            als PDF Datei zu übersenden.
          </li>
          <li>
            Für alle entstehenden Schäden, die auf Nutzung dieser
            Sondernutzungsgenehmigung zurückzuführen sind, ist der
            Sondernutzungsinhaber allein haftbar. Er verpflichtet sich auch
            Dritten gegenüber, das Land Berlin, vertreten durch das Bezirksamt
            Friedrichshain-Kreuzberg von Berlin, Straßen- und Grünflächenamt von
            allen Ersatzansprüchen freizustellen.
          </li>
          <li>
            Zum Schutz der Nutzungsflächen auf der Grün-und Erholungsanlage
            müssen alle Aufbauten in Übereinstimmung des vorliegenden Lageplanes
            errichtet werden. Es dürfen <strong>keine</strong>{' '}
            Bodenverankerungen in die Flächen eingebracht werden.
          </li>
          <li>
            Das Befahren der gesamten Grün- und Erholungsanlage mit
            motorisierten Fahrzeugen ist nicht erlaubt. Gegenstände sind von
            Hand oder durch einen Hubwagen, Sackkarre o.ä. auf die Grünfläche zu
            verbringen. Dies gilt insbesondere auch für den Auf- und Abbau.
          </li>
          <li>
            Die Bäume im Veranstaltungsbereich sind nach DIN 18920 zu schützen,
          </li>
          <li>
            An den Bäumen dürfen keine Befestigungen angebracht werden (Plakate
            und Transparente, Wimpel, Lichterketten, etc.).
          </li>
          <li>
            Das Anbringen von Slacklines an Bäumen ist ausdrücklich verboten!
          </li>
          <li>
            Der Boden des gesamten genutzten Veranstaltungsraumes darf nicht
            durch Substanzen geschädigt werden. Das Eindringen von Flüssigkeiten
            und festen Stoffen ist durch geeignete Maßnahmen zu verhindern.
          </li>
          <li>
            Getränke sind ausschließlich in Mehrwegverpackungen, Speisen
            ausschließlich auf Mehrweggeschirr mit Mehrwegbesteck anzubieten.
            Salz, Zucker, Senf, Mayonnaise, Ketchup etc. dürfen nicht in
            Portionsverpackungen angeboten werden. Küchenabfälle, Altglas,
            Papier/Pappe und Leichtverpackungen (Grüner Punkt) sind der
            Wertstoffsammlung zuzuführen.
          </li>
          <li>
            Nicht verwertbare Abfälle sind einer Beseitigung zuzuführen.
            Altfette, Öle, Speisereste u. a. dürfen nicht in die Kanalisation,
            Regenabläufe, Toiletten oder ähnliche Abflüsse geschüttet werden.
            <br /> Es wird ausdrücklich darauf hingewiesen, dass die nicht
            ordnungsgemäße Entsorgung von Altfetten und Frittieröl, zum Beispiel
            in einen Regenablauf, einen Straftatbestandnach § 326 Abs, 1 Nr. 3
            und Abs. 4 StGB darstellt, der mit Geldbußen in erheblicher Höhe
            oder gar mit Freiheitsstrafen geahndet werden kann.
          </li>
          <li>
            Verschmutzungen der Grünanlagen durch Papier, Unrat usw. sind
            unbedingt zu vermeiden, Angesammelte Abfälle während der
            Veranstaltung sind <strong>umgehend</strong> und auf Ihre Kosten zu
            beseitigen,
          </li>
          <li>
            Am Veranstaltungsort hat während der zugelassenen Sondernutzung
            ständig ein Beauftragter, bzw. Verantwortlicher anwesend zu sein,
            der für die Einhaltung der Nebenbestimmungen und Auflagen
            verantwortlich ist unvermeidbare Verstöße an Ort und Stelle
            abstellen kann. Der/die Verantwortliche hat sich gegenüber eventuell
            einschreitenden Polizeibeamten oder Vertretern der
            Ordnungsbehörde/des Bezirksamtes Friedrichshain-Kreuzberg
            auszuweisen und die Genehmigung vorzulegen.
          </li>
          <li>
            Beschwerden und Missstände, die von einschreitenden Polizeibeamten
            oder anderen zuständigen Behördenvertretern &apos;nach
            pflichtgemäßem Ermessen als berechtigt anerkannt werden, sind
            unverzüglich abzuhelfen,
          </li>
          <li>
            Der Sondernutzungsinhaber ist verpflichtet, entstandene Schäden im
            Einvernehmen mit dem Straßen- und Grünflächenamt durch eine
            Fachfirma auf eigene Kosten nach dem Ende der Sondernutzung
            beseitigen zu lassen und die Grünfläche mindestens wieder so
            herzustellen, wie sie übernommen wurde. Die Kosten aller
            Wiederherstellungsarbeiten trägt der Sondernutzer.
          </li>
          <li>
            Die zugelassenen Ausnahmen anlässlich Ihrer Veranstaltung entbinden
            Sie nicht von der Beachtung der sonstigen Vorschriften des
            Grünanlagengesetzes (GrünanIG).
          </li>
        </ol>
        <h3>Rechtsbehelfsbelehrung</h3>
        <p>
          Gegen diesen Bescheid einschließlich der Gebührenfestsetzung ist der
          Widerspruch zulässig. Er ist innerhalb eines Monats nach Zugang dieses
          Bescheides schriftlich oder zur Niederschrift bei dem Bezirksamt
          Friedrichshain-Kreuzberg von Berlin, Straßen- und Grünflächenamt oder
          in elektronischer Form mit einer qualifizierten elektronischen
          Signatur im Sinne des Vertrauensdienstegesetzes i. V. m. der
          Verordnung (EU) Nr. 910/2014 versehen an die E-Mail-Adresse
          post@ba-fk.berlin.de zu erheben. Es wird darauf hingewiesen, dass bei
          schriftlicher oder elektronischer Einlegung des Widerspruchs die
          Widerspruchsfrist nur dann gewahrt ist, wenn der Widerspruch innerhalb
          dieser Frist eingegangen ist.
        </p>
        <p>
          Nach § 80 Abs. 2 Nr. 1 der Verwaltungsgerichtsordnung (VwGO) hat ein
          Widerspruch bei der Anforderung von öffentlichen Abgaben und Kosten
          keine aufschiebende Wirkung. Die Erhebung des Widerspruchs befreit
          daher nicht von der fristgemäßen Zahlung der festgesetzten
          Verwaltungsgebühren.
        </p>
        <h3>Anordnung der sofortigen Vollziehung</h3>
        <p>
          Gemäß § 80 Abs. 2 Nr. 4 der Verwaltungsgerichtsordnung (VwGO) ordne
          ich im öffentlichen Interesse die sofortige Vollziehung dieses
          Bescheides an. Dies bedeutet, dass die darin bezeichneten Auflagen und
          Nebenbestimmungen auch dann zu dem angegebenen Zeitpunkt zu erfüllen
          sind, wenn von dem Rechtsbehelf Gebrauch gemacht wird. Die Anordnung
          der sofortigen Vollziehung ist im öffentlichen Interesse dringend
          erforderlich und dient der Gefahrenabwehr. Da Sie die Erlaubnis
          bereits vor Unanfechtbarkeit in Anspruch nehmen wollen, die Einhaltung
          der erforderlichen Auflagen und Nebenbestimmungen jedoch nur
          durchgesetzt werden kann, wenn die Erlaubnis einschließlich der
          Auflagen und Nebenbestimmungen vollziehbar ist, es im überwiegenden
          Interesse der Allgemeinheit dieses Bescheides anzuordnen. Die
          aufschiebende Wirkung eines Rechtsmittels würde die Gefahrenabwehr
          vereiteln und das Risiko von Verletzungen an Leib, Leben und
          Gesundheit von Besucherinnen und Besuchern, der Bewohnerschaft und
          sonstigen Betroffenen schaffen. Es besteht ein zwingend öffentliches
          Interesse an der Durchsetzung dieses Bescheides, da nur dadurch auch
          gewährleistet ist, dass die Auflagen und Nebenbestimmungen eingehalten
          werden. Aus diesen Gründen überwiegt das Interesse der Allgemeinheit
          an dem umgehenden Wirksamwerden dieser Sondernutzungserlaubnis
          gegenüber Ihren privatwirtschaftlichen Interessen. Das
          Verwaltungsgericht Berlin, Kirchstr. 7 in 10557 Berlin, kann auf
          Antrag die aufschiebende Wirkung des Rechtsbehelfs wiederherstellen (§
          80 Abs. 5 VwGO).
        </p>
        <p>
          Mit freundlichen Grüßen,
          <br />
          Straßen- und Grünflächenamt Friedrichshain-Kreuzberg
        </p>
      </section>
    </PermitContainer>
  );
};

export default Permit;
