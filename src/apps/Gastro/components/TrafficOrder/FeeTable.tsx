import React from 'react';

const FeeTable = ({ status, invoiceNumber }) => {
  if (status !== 'application_accepted') {
    return <h1>Fehler bei Erstellung der Kostenaufstellung</h1>;
  }
  return (
    <>
      <h3>Kosten</h3>
      <p style={{ marginBottom: '1rem' }}>
        <strong>
          Anordnungen nach § 45 Abs. 6 StVO sind nach § 6a StVG i. V. m. der
          Gebührenordnung für Maßnahmen im Straßenverkehr (GebOSt)
          gebührenpflichtig.
        </strong>
      </p>
      <table cellSpacing="0" cellPadding="0">
        <colgroup>
          <col width="64" />
          <col width="68" />
          <col width="65" />
          <col width="43" />
          <col width="97" />
          <col width="11" />
          <col width="109" />
          <col width="18" />
          <col width="58" />
          <col width="25" />
          <col width="109" />
          <col width="32" />
        </colgroup>
        <tr>
          <th style={{ textAlign: 'left' }}>
            <strong>Geb.-Nr.</strong>
          </th>
          <th colSpan={5} style={{ textAlign: 'left' }}>
            <strong>Bezeichnung</strong>
          </th>
          <th style={{ textAlign: 'left' }}>
            <strong>Anzahl</strong>
          </th>
          <th colSpan={3} style={{ textAlign: 'left' }}>
            <strong>Gebühr</strong>
          </th>
          <th style={{ textAlign: 'left' }}>
            <strong>Gesamt</strong>
          </th>
        </tr>
        <tr>
          <td style={{ textAlign: 'left' }}>
            <span>399</span>
          </td>
          <td colSpan={5} style={{ textAlign: 'left' }}>
            <span>sonstige Maßnahmen auf dem Gebiet des Straßenverkehrs</span>
          </td>
          <td style={{ textAlign: 'left' }}>
            <span>1</span>
          </td>
          <td colSpan={3} style={{ textAlign: 'left' }}>
            <span>51,20 EUR</span>
          </td>
          <td style={{ textAlign: 'left' }}>
            <span>51,20 EUR</span>
          </td>
        </tr>
        <tr>
          <td />
          <td colSpan={9} style={{ textAlign: 'right', paddingRight: 10 }}>
            <strong>Die ausstehenden Gebühren und Auslagen betragen:</strong>
          </td>
          <td
            colSpan={2}
            style={{
              textAlign: 'left',
              border: '2px solid black',
              padding: 10,
            }}
          >
            <strong>51,20 EUR</strong>
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr style={{ marginBottom: '1rem' }}>
          <td
            colSpan={11}
            style={{
              textAlign: 'left',
              border: '2px solid black',
              padding: 5,
            }}
          >
            <strong>Zahlen Sie bitte unter Angabe des Kassenzeichens </strong>
            <strong>{invoiceNumber} </strong>
            <strong>
              innerhalb von 14 Tagen nach Erhalt dieser Anordnung auf eines der
              nachstehenden Konten der Bezirkskasse Friedrichshain-Kreuzberg.
            </strong>
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td colSpan={3} style={{ textAlign: 'left' }}>
            <strong>Bank</strong>
          </td>
          <td colSpan={5} style={{ textAlign: 'left' }}>
            <strong>IBAN</strong>
          </td>
          <td colSpan={3} style={{ textAlign: 'left' }}>
            <strong>BIC</strong>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ textAlign: 'left' }}>
            <span>Berliner Sparkasse</span>
          </td>
          <td colSpan={5} style={{ textAlign: 'left' }}>
            <span>DE57100500000610003607</span>
          </td>
          <td colSpan={3} style={{ textAlign: 'left' }}>
            <span>BELADEBEXXX</span>
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ textAlign: 'left' }}>
            <span>Postbank</span>
          </td>
          <td colSpan={5} style={{ textAlign: 'left' }}>
            <span>DE33100100100003416104</span>
          </td>
          <td colSpan={3} style={{ textAlign: 'left' }}>
            <span>PBNKDEFF</span>
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td colSpan={11} style={{ textAlign: 'left' }}>
            Ihre Daten werden, soweit sie zur Überwachung der
            Gebührenfestsetzungen und des Zahlungseingangs benötigt werden, in
            meiner Dienststelle gespeichert. Die Datei wurde gemäß §§ 19 und 19
            a Abs. 1 Berliner Datenschutzgesetz (BlnDSG) mit der
            Dateibeschreibung dem behördlichen Datenschutzbeauftragten gemeldet.
            Die Dateibeschreibungen und Verzeichnisse können von jeder Person
            beim behördlichen Datenschutzbeauftragten eingesehen werden.
          </td>
        </tr>
      </table>
    </>
  );
};

export default FeeTable;
