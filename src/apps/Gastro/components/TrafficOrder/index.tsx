import { Container } from '@material-ui/core';
import React from 'react';

import './styles.css';
import {
  usageWeekday,
  usageWeekend,
  getCategoryDescription,
  dateReceived,
  REGULATION,
  permitEnd,
} from '../../utils';
import AreaMap from '../AreaMap';

// eslint-disable-next-line camelcase
const getSetupTimerangeEnd = ({ permit_start }) => {
  const date = new Date(permit_start);
  date.setDate(date.getDate() + 4);
  return date.toLocaleDateString('de-DE');
};

const isParking = ({ regulation }) =>
  [
    REGULATION.Parkplatz,
    REGULATION.ParkenDiagonal,
    REGULATION.ParkenLängs,
    REGULATION.ParkenDiagonal,
  ].includes(regulation);

const TrafficOrder = ({ application }) => {
  if (application.status !== 'application_accepted')
    return (
      <Container>
        <h1>Verkehrsrechtliche Anordnung</h1>
        <p>Dieser Antrag ist derzeit nicht bewilligt.</p>
      </Container>
    );

  const categoryDescription = getCategoryDescription(application);
  const setupTimerangeEnd = getSetupTimerangeEnd(application);
  return (
    <div className="c229 trafficOrder">
      <div>
        <p className="c20">
          <span className="c23" />
        </p>
      </div>
      <p className="c3">
        <span className="c23" />
      </p>
      <table className="c321">
        <tbody>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c163" colSpan={6} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c198" colSpan={8} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c319" colSpan={2} rowSpan={2}>
              <p className="c32 c294">
                <span className="c15" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c292" colSpan={6} rowSpan={5}>
              <p className="c32 c93">
                <span className="c14">
                  Bezirksamt Friedrichshain-Kreuzberg von Berlin
                </span>
              </p>
              <p className="c93 c32">
                <span className="c14">Stra&szlig;enverkehrsbeh&ouml;rde</span>
              </p>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c310" colSpan={8} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c274" colSpan={5} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c302" colSpan={5} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c259" colSpan={5} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c265" colSpan={5} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c274" colSpan={5} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c302" colSpan={5} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c259" colSpan={5} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c265" colSpan={5} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c300" colSpan={6} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c110" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c252" colSpan={10} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c331" colSpan={6} rowSpan={9}>
              <p className="c93 c32">
                <span className="c15">
                  Bezirksamt Friedrichshain-Kreuzberg von Berlin, Petersburger
                  Stra&szlig;e 86-90, 10247 Berlin
                </span>
              </p>
              <p className="c20">
                <span className="c23" />
              </p>
              <p className="c20">
                <span className="c23" style={{ fontSize: '10pt' }}>
                  {application.shop_name} <br />
                  {application.address}
                </span>
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c212" colSpan={10} rowSpan={1}>
              <p className="c32 c251">
                <span className="c86" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c309">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c267" colSpan={10} rowSpan={1}>
              <p className="c32 c303 c330">
                <span className="c14" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c266" colSpan={10} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c93 c32">
                <span className="c23">&nbsp;</span>
              </p>
            </td>
            <td className="c272" colSpan={10} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c72">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c15" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c20">
                <span className="c15" />
              </p>
            </td>
            <td className="c301" colSpan={10} rowSpan={1}>
              <p className="c20">
                <span className="c15" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c15" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c51" colSpan={10} rowSpan={1}>
              <h3 className="c32 c100 c145">
                <span className="c298">Verkehrsrechtliche Anordnung</span>
              </h3>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c288">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c114" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c20">
                <span className="c114" />
              </p>
            </td>
            <td className="c51" colSpan={10} rowSpan={1}>
              <p className="c145 c32">
                <span className="c102">
                  zur Sicherung einer Arbeitsstelle an Stra&szlig;en
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c124">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c182" colSpan={10} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c15" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c152" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c122" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c272" colSpan={10} rowSpan={1}>
              <p className="c93 c32">
                <span className="c57">Zum Antrag vom:</span>
                <span className="c240">&nbsp;</span>
                <span className="c201">&nbsp;</span>
                <span className="c201">{dateReceived(application)}</span>
              </p>
              <p className="c31 c32 c248">
                <span className="c57">Zeichen Antragsteller:</span>
                <span className="c240">&nbsp;</span>
                <span className="c201">&nbsp; </span>
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c323" colSpan={6} rowSpan={4}>
              <p className="c32 c90">
                <span className="c57">
                  Zur Sicherung und Kennzeichnung der Arbeitsstelle
                  (Arbeitsbereich) sowie zur Sicherung und Ordnung des Verkehrs
                  (Verkehrsbereich) werden gem&auml;&szlig; &sect; 45 Abs. 6
                  Stra&szlig;enverkehrs-Ordnung (StVO) unter dem Vorbehalt des
                  Widerrufs folgende Verkehrsma&szlig;nahmen angeordnet:
                </span>
              </p>
            </td>
            <td className="c110" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c282" colSpan={5} rowSpan={1}>
              <p className="c93 c32 c333">
                <span className="c1">Anlagen:</span>
              </p>
            </td>
            <td className="c206" colSpan={1} rowSpan={1}>
              <p className="c145 c32">
                <span className="c11">&nbsp;</span>
              </p>
            </td>
            <td className="c82" colSpan={4} rowSpan={1}>
              <p className="c93 c32">
                <span className="c2">Bauphasenplan/-pl&auml;ne</span>
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c110" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c213" colSpan={2} rowSpan={1}>
              <p className="c145 c32 c303">
                <span className="c11" />
              </p>
            </td>
            <td className="c149" colSpan={3} rowSpan={1}>
              <p className="c93 c32">
                <span className="c2">Verkehrszeichenplan/-pl&auml;ne</span>
              </p>
            </td>
            <td className="c206" colSpan={1} rowSpan={1}>
              <p className="c145 c32">
                <span className="c11">&nbsp;</span>
              </p>
            </td>
            <td className="c149" colSpan={4} rowSpan={1}>
              <p className="c31 c32">
                <span className="c2">Umleitungsplan/-pl&auml;ne</span>
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c110" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c213" colSpan={2} rowSpan={1}>
              <p className="c145 c32">
                <span className="c11">&nbsp;</span>
              </p>
            </td>
            <td className="c149" colSpan={3} rowSpan={1}>
              <p className="c31 c32">
                <span className="c2">Verkehrszeichenskizze(n)</span>
              </p>
            </td>
            <td className="c206" colSpan={1} rowSpan={1}>
              <p className="c145 c32">
                <span className="c11">&nbsp;</span>
              </p>
            </td>
            <td className="c149" colSpan={4} rowSpan={1}>
              <p className="c31 c32">
                <span className="c2">Aufbau (Lage)-plan/-pl&auml;ne</span>
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c110" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c213" colSpan={2} rowSpan={1}>
              <p className="c145 c32">
                <span className="c11">x</span>
              </p>
            </td>
            <td className="c10" colSpan={3} rowSpan={1}>
              <p className="c31 c32">
                <span className="c2">Regelplan </span>
              </p>
            </td>
            <td className="c206" colSpan={1} rowSpan={1}>
              <p className="c145 c32">
                <span className="c11">&nbsp;</span>
              </p>
            </td>
            <td className="c10" colSpan={4} rowSpan={1}>
              <p className="c31 c32">
                <span className="c2">&nbsp; </span>
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
            <td className="c262" colSpan={6} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
            <td className="c84" colSpan={2} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
            <td className="c301" colSpan={10} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c162" colSpan={18} rowSpan={1}>
              <p className="c93 c32">
                <span className="c11">I. Unternehmer</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c210" colSpan={17} rowSpan={1}>
              <p className="c93 c32">
                <span className="c23">&nbsp;</span>
                <span className="c23">
                  {application.first_name} {application.last_name}
                </span>
              </p>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c72">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c268" colSpan={17} rowSpan={1}>
              <p className="c32 c241">
                <span className="c1">
                  Verantwortlicher (Name + Handynummer){' '}
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c210" colSpan={17} rowSpan={1}>
              <p className="c93 c32">
                {application.first_name} {application.last_name} (Tel:{' '}
                {application.phone})
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c268" colSpan={17} rowSpan={1}>
              <p className="c32 c233">
                <span className="c1" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c210" colSpan={17} rowSpan={1}>
              <p className="c233 c32">
                <span className="c14" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c178" colSpan={17} rowSpan={1}>
              <p className="c233 c32">
                <span className="c14" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c162" colSpan={18} rowSpan={1}>
              <p className="c93 c32 c207">
                <span className="c11">II. Arbeitsstelle</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c93 c32 c29">
                <span className="c1">1.</span>
              </p>
            </td>
            <td className="c120" colSpan={17} rowSpan={1}>
              <p className="c93 c32">
                <span className="c1">Art der Arbeitsstelle</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c338">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c14" />
              </p>
            </td>
            <td className="c210" colSpan={17} rowSpan={1}>
              {categoryDescription}
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c78" />
              </p>
            </td>
            <td className="c178" colSpan={17} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c93 c32 c29">
                <span className="c1">2.</span>
              </p>
            </td>
            <td className="c120" colSpan={17} rowSpan={1}>
              <p className="c93 c32">
                <span className="c1">Lage der Arbeitsstelle </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c23" />
              </p>
            </td>
            <td className="c210" colSpan={17} rowSpan={1}>
              <p className="c93 c32">{application.address}</p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c178" colSpan={17} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c93 c32 c29">
                <span className="c1">3.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <h1 className="c93 c32 c100">
                <span className="c1">Dauer der Arbeitsstelle</span>
              </h1>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c193" colSpan={5} rowSpan={1}>
              <p className="c93 c32">
                <span className="c2">Beginn der Arbeitsstelle</span>
              </p>
            </td>
            <td className="c42" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
            <td className="c313" colSpan={11} rowSpan={1}>
              <p className="c93 c32">
                <span className="c2">Aufhebung der Arbeitsstelle</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c14" />
              </p>
            </td>
            <td className="c197" colSpan={5} rowSpan={1}>
              <p className="c93 c32">{setupTimerangeEnd}</p>
            </td>
            <td className="c194" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
            <td className="c314" colSpan={11} rowSpan={1}>
              <p className="c93 c32">
                <span className="c14">&nbsp;{permitEnd(application)} </span>
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c270" colSpan={5} rowSpan={1}>
              <p className="c93 c32">
                <span className="c2">
                  Weitere Detailangaben zum zeitlichen Ablauf
                </span>
              </p>
            </td>
            <td className="c177" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
            <td className="c239" colSpan={11} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c166">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c14" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c14" />
              </p>
            </td>
            <td className="c210" colSpan={17} rowSpan={1}>
              {usageWeekend(application) && (
                <span>Freitag-Sonntag jeweils von 11-22 Uhr</span>
              )}
              {usageWeekday(application) && (
                <span>Montag-Freitag jeweils von 10-20 Uhr</span>
              )}
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c8" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c8" />
              </p>
            </td>
            <td className="c178" colSpan={17} rowSpan={1}>
              <p className="c7">
                <span className="c8" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c8" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c8" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7 c29 c100">
                <span className="c8" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c7 c100">
                <span className="c8" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c8" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c14" />
              </p>
            </td>
            <td className="c162" colSpan={18} rowSpan={1}>
              <p className="c93 c32 c29 c100">
                <span className="c11">
                  III. Kennzeichnung, Verkehrsregelung, Verkehrsf&uuml;hrung
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c15" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c93 c32 c29 c100">
                <span className="c1">1.</span>
              </p>
            </td>
            <td className="c258" colSpan={17} rowSpan={1}>
              <p className="c93 c32 c100">
                <span className="c11">
                  Sicherung und Kennzeichnung der Arbeitsstellen
                </span>
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c15" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c20 c29">
                <span className="c14" />
              </p>
            </td>
            <td className="c94" colSpan={17} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
              <p className="c31 c32">
                <span className="c14">Sicherung nach Regelplan </span>
              </p>
              <p className="c31 c32">
                <span className="c14">
                  - vorhandene Parkanordnung L&auml;ngsaufstellung
                </span>
              </p>
              <p className="c31 c32">
                <span className="c14">
                  - vorhandene Parkanordnung Schr&auml;gaufstellung
                </span>
              </p>
              <p className="c31 c32">
                <span className="c14">
                  - vorhandene Parkanordnung Senkrechtaufstellung
                </span>
              </p>
              <br />
              <p className="c31 c32">
                {isParking(application) && (
                  <>
                    <span>
                      Haltverbote: Z 283 nach VLB-Regelplan 630 mit
                      Zusatzzeichen 1042-33 StVO (zeitliche Beschr&auml;nkung)
                    </span>{' '}
                    {setupTimerangeEnd} - {permitEnd(application)}{' '}
                    {usageWeekend(application) && (
                      <span>Freitag-Sonntag jeweils von 11-22 Uhr. </span>
                    )}
                    {usageWeekday(application) && (
                      <span>Montag-Freitag jeweils von 10-20 Uhr. </span>
                    )}
                    Ausdehnung gemäß Lageplan.
                  </>
                )}
                {!isParking(application) && (
                  <span className="c14">
                    Ausdehnung gem&auml;&szlig; Ladenfrontbreite
                  </span>
                )}
              </p>
              <AreaMap application={application} printable />
              <p className="c20">
                <span className="c14 c77" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c20 c29">
                <span className="c14" />
              </p>
            </td>
            <td className="c94" colSpan={17} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c14" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c7 c29 c100">
                <span className="c14" />
              </p>
            </td>
            <td className="c94" colSpan={17} rowSpan={1}>
              <p className="c93 c32 c100">
                <span className="c11">
                  Abweichend/ Erg&auml;nzend wird festgelegt:
                </span>
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c20 c29">
                <span className="c14" />
              </p>
            </td>
            <td className="c94" colSpan={17} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
              <p
                className="c20"
                style={{ height: 'initial', padding: '1em 0' }}
              >
                {application.note.split('\n').map((content) => (
                  <span>
                    {content}
                    <br />
                  </span>
                ))}
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c20 c29">
                <span className="c14" />
              </p>
            </td>
            <td className="c327" colSpan={17} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c14" />
              </p>
            </td>
          </tr>
          <tr className="c191">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c78" />
              </p>
            </td>
            <td className="c178" colSpan={17} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
          </tr>
          <tr className="c191">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c78" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c78" />
              </p>
            </td>
            <td className="c120" colSpan={17} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c78" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c15" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c93 c32 c29 c100">
                <span className="c1">2.</span>
              </p>
            </td>
            <td className="c258" colSpan={17} rowSpan={1}>
              <p className="c93 c32 c100">
                <span className="c11">Sonstiges</span>
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c15" />
              </p>
            </td>
          </tr>
          <tr className="c155">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
            <td className="c16" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c23" />
              </p>
            </td>
            <td className="c327" colSpan={17} rowSpan={1}>
              <p className="c93 c32">
                <span className="c14">&nbsp; </span>
              </p>
            </td>
            <td className="c87" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c23" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c8" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c8" />
              </p>
            </td>
            <td className="c178" colSpan={17} rowSpan={1}>
              <p className="c7">
                <span className="c8" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c8" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c8" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c7 c29">
                <span className="c8" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c7">
                <span className="c8" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c8" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c8" />
              </p>
            </td>
            <td className="c162" colSpan={18} rowSpan={1}>
              <p className="c93 c32 c100">
                <span className="c11">IV. Nebenbestimmungen</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7 c100">
                <span className="c8" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c61 c32 c29">
                <span className="c1">0.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Allgemein</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c93 c32 c195">
                <span className="c2">
                  Entgegenstehende Regelungen aus den vorstehend angeordneten
                  Regel-/ Verkehrszeichen-/ Umleitungs-/ Signalanlage- mit
                  Signalzeitenpl&auml;nen gehen diesen Nebenbestimmungen vor.
                </span>
              </p>
              <p className="c93 c32 c195">
                <span className="c2">
                  Abweichungen von dieser Anordnung sind nur im Wege einer
                  &Auml;nderung (weiteren Anordnung) durch die
                  Stra&szlig;enverkehrsbeh&ouml;rde zul&auml;ssig.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">1.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Gesetze und Richtlinien</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c32 c73">
                <span className="c2">
                  Die Sicherung der Arbeitsstelle und der Einsatz von
                  Absperrger&auml;ten hat nach den aktuellen &quot;Richtlinien
                  f&uuml;r die Sicherung von Arbeitsstellen an Stra&szlig;en
                  (RSA)&quot; zu erfolgen.
                </span>
              </p>
              <p className="c73 c32">
                <span className="c2">
                  Zus&auml;tzlich sind zu ber&uuml;cksichtigen:
                </span>
              </p>
              <ul className="c89 lst-kix_list_14-0 start">
                <li className="c91 c32">
                  <span className="c2">
                    bei Umleitungen die Richtlinien f&uuml;r
                    Umleitungsbeschilderungen (RUB)
                  </span>
                </li>
                <li className="c32 c91">
                  <span className="c2">
                    zur Regelung von Lichtzeichenanlagen die Richtlinien
                    f&uuml;r Lichtsignalanlagen (RiLSA)
                  </span>
                </li>
                <li className="c91 c32">
                  <span className="c2">
                    die Richtlinien f&uuml;r die Markierung von Stra&szlig;en
                    (RMS)
                  </span>
                </li>
                <li className="c91 c32">
                  <span className="c2">
                    die Richtlinien f&uuml;r passiven Schutz an Stra&szlig;en
                    durch Fahrzeug-R&uuml;ckhaltesysteme (RPS)
                  </span>
                </li>
                <li className="c241 c32 c320">
                  <span className="c2">
                    f&uuml;r Art und Aufstellung der Verkehrszeichen und
                    -einrichtungen die Technischen Lieferbedingungen (ZTV-SA)
                  </span>
                </li>
              </ul>
              <p className="c93 c32">
                <span className="c2">
                  Die Regelwerke sind in der jeweils g&uuml;ltigen Fassung
                  anzuwenden.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c7">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">2.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">
                  Vorbehalte Dritter/ Widerrufsvorbehalt
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Die angeordneten Ma&szlig;nahmen gelten vorbehaltlich der
                  Rechte Dritter und des jederzeitigen Widerrufs.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">3.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">
                  Bereithalten der verkehrsrechtlichen Anordnung
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Diese verkehrsrechtliche Anordnung ist einschlie&szlig;lich
                  der Anlagen stets auf der Arbeitsstelle bereitzuhalten und den
                  Dienstkr&auml;ften der Stra&szlig;enverkehrsbeh&ouml;rde,
                  Polizei, des Ordnungsamtes auf Verlangen vorzuzeigen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Im &Uuml;brigen sind Weisungen Zust&auml;ndiger zu
                  &nbsp;befolgen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">4.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">
                  Abgleich mit der vorhandenen Beschilderung
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Die Au&szlig;erkraftsetzung (anderer) dauerhafter
                  Streckenbeschilderungen, die das Parken erlauben, ist nur
                  erforderlich, wenn sich andernfalls keine zweifelsfreie
                  Erkennbarkeit der Verkehrsma&szlig;nahmen bzw. &ouml;rtlich
                  geltenden Verkehrsregelungen ergibt. Dies ist insbesondere bei
                  l&auml;ngeren Geltungszeiten der vor&uuml;bergehenden
                  Ma&szlig;nahmen anzunehmen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c260">
                  Die der vor&uuml;bergehenden Verkehrsma&szlig;nahme
                  entgegenstehenden Verkehrszeichen und -einrichtungen sind in
                  diesen F&auml;llen mit Beginn der Wirksamkeit abzudecken bzw.
                  fachgerecht au&szlig;er Kraft zu setzen; in Bereichen mit
                  gekennzeichneten Fl&auml;chen (Parkstandsmarkierungen auf der
                  Fahrbahn oder auf Parkpl&auml;tzen) ist das Zz &bdquo;auch in
                  gekennzeichneten Fl&auml;chen&ldquo; zus&auml;tzlich
                  aufzustellen
                </span>
                <span className="c260 c324">.</span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Zweifel oder Missverst&auml;ndnisse bei den
                  Verkehrsteilnehmenden sind auszuschlie&szlig;en.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">5.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">
                  Sichtbarkeit, Standsicherheit und ggf. Beleuchtung der
                  Verkehrszeichen
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Verkehrszeichen sind standsicher und von der Fahrbahn aus gut
                  sichtbar aufzustellen. Sie d&uuml;rfen nicht an B&auml;umen
                  angebracht werden und sind bei Verschmutzung zu s&auml;ubern.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die Erkennbarkeit der Verkehrszeichen ist jederzeit zu
                  gew&auml;hrleisten.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die angeordneten Verkehrszeichen bzw. -einrichtungen sind
                  gem&auml;&szlig; RSA zu beleuchten.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">6.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Lichtraumprofil / Baumschnitt</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Der Baumschnitt ist zur Freihaltung des erforderlichen
                  Lichtraumprofils bei Bedarf mit dem zust&auml;ndigen
                  Stra&szlig;enbaulasttr&auml;ger zu pr&uuml;fen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">7.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Beginn der Arbeiten</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Aus Gr&uuml;nden der Sicherheit darf mit den Arbeiten erst
                  begonnen werden, wenn die f&uuml;r die Arbeitsstelle &ndash;
                  sowie ggf. Umleitungsstrecke &ndash; angeordneten
                  Verkehrszeichen und -einrichtungen ordnungsgem&auml;&szlig;
                  aufgestellt und die erforderlichen Lichtraumprofile
                  hergestellt sind.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">8.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Zuwegungen zu Grundst&uuml;cken</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Die Nutzung von Grundst&uuml;ckszug&auml;ngen und -zufahrten
                  ist jederzeit zu gew&auml;hrleisten. Sofern dies nicht
                  m&ouml;glich ist, sind die Betroffenen rechtzeitig in
                  geeigneter Weise &uuml;ber die Einschr&auml;nkungen zu
                  informieren. Fahrzeugen mit Sondersignalen (Bundeswehr,
                  Polizei, Feuerwehr usw.) ist das Durchfahren der Arbeitsstelle
                  grunds&auml;tzlich jederzeit zu erm&ouml;glichen. Kann dies
                  wegen des Baufortschritts vor&uuml;bergehend nicht
                  gew&auml;hrleistet werden, sind die zust&auml;ndigen
                  Leitstellen rechtzeitig in geeigneter Weise &uuml;ber die
                  Einschr&auml;nkungen zu informieren.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die von den Verkehrseinschr&auml;nkungen unmittelbar
                  betroffenen Anlieger sind rechtzeitig vor Beginn der
                  Ma&szlig;nahme in geeigneter Weise &uuml;ber Art und Dauer der
                  Beeintr&auml;chtigungen zu informieren.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c61 c32 c29">
                <span className="c57">9.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c57">
                  Arbeitsstellen an Kreuzungen und Einm&uuml;ndungen
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Befinden sich Arbeitsstellen an Einm&uuml;ndungen oder
                  Kreuzungen, ist der zur Arbeitsstelle hin einbiegende Verkehr
                  zus&auml;tzlich durch Zeichen 123 StVO mit Zusatzzeichen
                  1000-11/-21 StVO zu warnen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">10.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">
                  Wiederherstellung des urspr&uuml;nglichen Verkehrszustandes
                  nach Beendigung der Arbeiten
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Nach Beendigung der Arbeiten sind s&auml;mtliche aus Anlass
                  der Ma&szlig;nahme angeordneten und aufgestellten
                  Verkehrszeichen und
                  <br />
                  -einrichtungen unverz&uuml;glich vom &ouml;ffentlichen
                  Stra&szlig;enland zu entfernen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Der vor Beginn der Arbeiten vorhandene Verkehrszeichen- und
                  Markierungszustand einschlie&szlig;lich der
                  Verkehrseinrichtungen
                  <br />- urspr&uuml;nglicher Verkehrszustand - ist wieder
                  herzustellen und die anordnende
                  Stra&szlig;enverkehrsbeh&ouml;rde zu benachrichtigen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Abweichend davon gilt: Wenn durch die Arbeiten der
                  Verkehrsraum oder die Verkehrsf&uuml;hrung ver&auml;ndert
                  wurde, darf dieser erst freigegeben werden, wenn die
                  erforderlichen Verkehrszeichen, Verkehrseinrichtungen und
                  Markierungen gem&auml;&szlig; der
                  stra&szlig;enverkehrsbeh&ouml;rdlichen Anordnung installiert
                  sind.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">11.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">
                  Haltverbote (A.), ggf. im Vorfeld einer Arbeitsstelle (B.)
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">A.</span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die Zeichen 283 StVO (absolutes Haltverbot) und die Zeichen
                  286 StVO (eingeschr&auml;nktes Haltverbot) sind mit Pfeilen
                  &ndash; Anfang &ndash; Mitte &ndash; Ende &ndash; zu versehen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  In Bereichen mit Parkraumbewirtschaftung sind anstelle der
                  Zeichen 286 StVO die Zeichen 283 StVO mit Zusatzzeichen
                  &bdquo;Be- und Entladen frei&ldquo; aufzustellen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">B.</span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Der f&uuml;r die Arbeitsstelle ben&ouml;tigte Raum und ggf.
                  gegen&uuml;ber ist durch Aufstellen von Zeichen 283 StVO
                  freizuhalten.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die Verkehrszeichen im Bereich der Arbeitsstelle sind vom
                  Stra&szlig;enland zu entfernen, sobald der Arbeitsbereich
                  eingerichtet ist.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c261 c260 c222">Allgemein:</span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die angeordneten Haltverbotszeichen und Zusatzzeichen sind
                  mindestens 3 volle Tage (= Standzeit der Verkehrszeichen
                  betr&auml;gt 3 volle Datumstage, die vorherige 72-Stundenfrist
                  ist nach einem Urteil vom Bundesverwaltungsgericht (BVerwG 3 C
                  25.16) hinf&auml;llig) vor Beginn der Wirksamkeit
                  aufzustellen. Der Zeitraum der G&uuml;ltigkeit ist durch den
                  Zusatz &bdquo;Datum und Uhrzeit&ldquo; gem&auml;&szlig;
                  Anordnung anzugeben.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Fahrzeuge, die bereits in der noch nicht wirksamen
                  Haltverbotsstrecke stehen, sind listenm&auml;&szlig;ig, gut
                  leserlich, mit Angabe von Kennzeichen, Fahrzeugtyp, Farbe,
                  Feststellzeit und -ort (Stra&szlig;e, Hausnummer) zu notieren.
                  Ort und Zeit der Haltverbotsstrecke sowie Datum und Nr. der
                  Anordnung sind zus&auml;tzlich auf der Liste zu dokumentieren.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Diese Kennzeichenliste ist dem anordnenden Bezirksamt von
                  Berlin &ndash; Stra&szlig;enverkehrsbeh&ouml;rde &ndash; nach
                  Ablauf der Verkehrsma&szlig;nahme unverz&uuml;glich zu
                  &uuml;bersenden. Aus datenschutzrechtlichen Gr&uuml;nden ist
                  eine Aufbewahrung beim Anordnungsinhaber bzw. der
                  Anordnungsinhaberin oder Beauftragten nicht zul&auml;ssig.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c260 c222 c261">Hinweis:</span>
              </p>
              <p className="c31 c32">
                <span className="c1">
                  Umsetzungen bed&uuml;rfen der Anordnung durch die
                  zust&auml;ndigen Dienstkr&auml;fte (beispielsweise Polizei
                  oder Ordnungsamt). Die vorgenannte Kennzeichenliste ist
                  vorzulegen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Wer die Kosten einer Umsetzung zu tragen hat, wird durch das
                  Referat Verkehrsordnungswidrigkeiten und
                  Bu&szlig;geldeinziehung beim Polizeipr&auml;sidenten in Berlin
                  entschieden.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Auch Nutznie&szlig;er einer Umsetzung k&ouml;nnen zur Zahlung
                  der Umsetzkosten herangezogen werden. Bei einer Aufstellung
                  der angeordneten Verkehrsma&szlig;nahmen mit einem Vorlauf von
                  weniger als 3 vollen Tagen* oder bei nicht
                  ordnungsgem&auml;&szlig;er F&uuml;hrung der Kennzeichenlisten
                  ist dies der Regelfall.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c231">
                  *Die &Uuml;bertragung von Kosten f&uuml;r die Umsetzung von
                  Fahrzeugen an Verkehrsteilnehmende widerspricht nach dem
                  Urteil des Bundesverwaltungsgerichts zum Aktenzeichen BVerwG 3
                  C 25.16 dann den Anforderungen des
                  Verh&auml;ltnism&auml;&szlig;igkeitsgrundsatzes, wenn
                  Umsetzungsma&szlig;nahmen vor dem vierten Tage nach
                  Aufstellung der Haltverbote erfolgen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">12.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c1">
                  Haltestellen- oder Taxenhalteplatzverlegungen
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Ma&szlig;nahmen, die sich auf den Linienverkehr des
                  &ouml;ffentlichen Personennahverkehrs auswirken, oder
                  Verlegungen von Haltestellen oder Taxenst&auml;nden sind vor
                  Beginn der Ma&szlig;nahmen mit dem Betreiber (beispielsweise
                  betroffenes Verkehrsunternehmen oder Taxi-Innung) abzustimmen.
                  Dazu ist ein Nachweis vorzulegen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Das/ die Zeichen 224 StVO (Haltestellen) und ggf.
                  Zusatzzeichen ist/ sind mindestens 72 Stunden vor Beginn der
                  Wirksamkeit aufzustellen. Es ist eine Kennzeichenliste
                  gem&auml;&szlig; Nebenbestimmung 11 zu fertigen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Anmerkung: Sollte die BVG Betreiber der Haltestelle sein, ist
                  sie nach M&ouml;glichkeit mindestens zehn Tage vorher zu
                  informieren.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c32 c29 c39">
                <span className="c1">13.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c1">Parkraumbewirtschaftung</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  In Parkraumbewirtschaftungszonen wird die Aufhebung der
                  Parkraumbewirtschaftung entsprechend der in der Anordnung
                  verf&uuml;gten Einschr&auml;nkung f&uuml;r die Dauer der
                  Arbeiten angeordnet. Vor Beginn ist die Sicherung der
                  entsprechenden Verkehrszeichen und Parkscheinautomaten mit dem
                  beauftragten Bewirtschaftungsunternehmen abzustimmen und dem
                  zust&auml;ndigen Bezirksamt von Berlin &ndash; Stra&szlig;en-
                  und Gr&uuml;nfl&auml;chenamt - anzuzeigen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">14.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c1">
                  Wendebereich bei Vollsperrung von Fahrbahnen
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Vor einer Vollsperrung innerhalb einer Stra&szlig;e ist
                  (beidseitig) auf 10 Meter ein Wendebereich mit Zeichen
                  283-10/-20/-30 StVO auszuschildern.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">15.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Unterbrechung der Arbeiten</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Bei Unterbrechung der Arbeiten sind die
                  Verkehrsbeschr&auml;nkungen im Einvernehmen mit dem/ der
                  Sachbearbeiter/ Sachbearbeiterin der
                  Stra&szlig;enverkehrsbeh&ouml;rde des zust&auml;ndigen
                  Bezirksamtes von Berlin auf das erforderliche Mindestma&szlig;
                  zu begrenzen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Wird die T&auml;tigkeit l&auml;nger als zwei Wochen
                  unterbrochen, sind die Verkehrsfl&auml;chen f&uuml;r den
                  Verkehr wieder frei zu geben. Hiervon kann nur abgesehen
                  werden, wenn dies nachweislich bautechnisch nicht anders
                  m&ouml;glich ist.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">16.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Vorfahrt regelnde Verkehrszeichen</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Vorfahrt regelnde Verkehrszeichen (Zeichen 205, Zeichen 206,
                  Zeichen 301, Zeichen 306, Zeichen 307 StVO) sind immer fest zu
                  installieren und d&uuml;rfen nicht transportabel aufgestellt
                  werden.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Bei einer Vorfahrt&auml;nderung ist f&uuml;r den nunmehr
                  wartepflichtigen Fahrzeugverkehr Zeichen 101 StVO mit
                  Zusatzzeichen 1008-30 StVO f&uuml;r die Dauer der
                  Arbeitsstelle, nicht jedoch l&auml;nger als 3 Monate,
                  aufzustellen. Dies gilt auch im Anschluss der Arbeitsstelle
                  bei Wiederherstellung der urspr&uuml;nglichen
                  Vorfahrtregelung.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die feste Installation von Verkehrszeichen ist im Vorfeld mit
                  dem zust&auml;ndigen Bezirksamt von Berlin - Stra&szlig;en-
                  und Gr&uuml;nfl&auml;chenamt - abzustimmen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">17.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">
                  Ladezonen und Schwerbehindertenparkpl&auml;tze
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c32 c61">
                <span className="c2">
                  Sind von der Arbeitsstelle Ladezonen oder/ und
                  Schwerbehindertenparkpl&auml;tze betroffen, so sind diese in
                  Abstimmung mit der Stra&szlig;enverkehrsbeh&ouml;rde des
                  &ouml;rtlich zust&auml;ndigen Bezirksamtes von Berlin auf
                  Grundlage ihrer Anordnung f&uuml;r die Dauer der
                  Einschr&auml;nkung zu verlegen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">18.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">
                  Baustellenbedingte Fahrbahnunebenheiten
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Vor baustellenbedingten Fahrbahnunebenheiten und -kanten ist
                  durch Zeichen 112 StVO ggf. in Verbindung mit Zeichen 274-30
                  StVO zu warnen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">19.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c57">Gemeinsamer Geh- und Radweg</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Wird eine gemeinsame F&uuml;hrung von Radfahrern und
                  Fu&szlig;g&auml;ngern angeordnet, ist bei zuvor nicht
                  benutzungspflichtigen Radwegen das Zeichen 239 StVO mit
                  Zusatzzeichen 1022-10 StVO aufzustellen. Die Zeichen 240 StVO
                  oder Zeichen 241 StVO begr&uuml;nden dagegen eine
                  Radwegebenutzungspflicht und sind daher nicht zu verwenden.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">20.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Schlauchbr&uuml;cken und Tastleisten</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Zum Schutz f&uuml;r Sehbehinderte sind die
                  Gehwegf&uuml;hrungen im Bereich der Arbeitsstelle
                  zus&auml;tzlich zur vorhandenen Absperrung mit 10 cm hohen
                  Tastleisten abzusichern (Aufstellh&ouml;he der Oberkante: 25
                  cm &uuml;ber dem Boden).
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Bei ebenerdiger Verlegung von Schl&auml;uchen und/oder Kabeln
                  sind diese in geeigneter Weise abzudecken und/oder mit
                  Anrampungen f&uuml;r Rollstuhlfahrer, Kinderwagen bzw.
                  Radfahrer zu versehen und erforderlichenfalls zus&auml;tzlich
                  zu kennzeichnen/zu beleuchten.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">21.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Warnposten</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Beim Verbringen von Lasten &uuml;ber den Geh-/Radweg,
                  insbesondere auch bei Arbeiten mit Hebezeugen/
                  Schr&auml;gaufz&uuml;gen, ist sicherzustellen, dass sich keine
                  Personen im Gefahrenbereich aufhalten. Der
                  Fu&szlig;g&auml;nger-/ Radfahrverkehr ist kurzzeitig durch
                  beidseitiges Aufstellen von Zeichen 600 StVO und Warnposten
                  au&szlig;erhalb des Gefahrenbereiches anzuhalten. Warnposten
                  d&uuml;rfen keine Verkehrsregelung vornehmen. Werden sie
                  eingesetzt, m&uuml;ssen sie Warnkleidung und eine Warnfahne so
                  tragen, so dass sie f&uuml;r Verkehrsteilnehmende hinreichend
                  sichtbar sind.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">22.</span>
              </p>
            </td>
            <td className="c256" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Vollsperrung des Gehweges</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Fu&szlig;g&auml;nger sind bei einer angeordneten Vollsperrung
                  des Gehweges ohne gleichzeitig angeordneten Notweg durch
                  entsprechende Zusatzzeichen 1000-12 oder 1000-22 StVO oder
                  Hinweisschilder auf den gegen&uuml;berliegenden Gehweg zu
                  verweisen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Als Querungshilfe ist der f&uuml;r die Querung benutze Bereich
                  f&uuml;r die Dauer der Sperrung arbeitsstellenseitig und
                  gegen&uuml;ber auf 5 Meter L&auml;nge freizuhalten. Ggf. ist
                  eine entsprechend lange Haltverbotsstrecke mit Zeichen 283
                  StVO einzurichten.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die Nebenbestimmung Nr. 11 ist zu beachten.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Eine Barrierefreiheit in diesen Bereich ist sicherzustellen
                  (sind keine Bordsteinabsenkungen vorhanden, w&auml;ren
                  beispielsweise Borde anzurampen).
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">23.</span>
              </p>
            </td>
            <td className="c256" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Lichtzeichenanlagen</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Vor Inbetriebnahme einer angeordneten Lichtzeichenanlage (LZA)
                  sowie bei angeordneten &Auml;nderungen oder Anpassungen an
                  bestehenden Lichtzeichenanlagen ist mit der anordnenden
                  Stra&szlig;enverkehrsbeh&ouml;rde ein Inbetriebnahmetermin zu
                  vereinbaren.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die Beendigung der Arbeitsstelle ist durch den
                  verantwortlichen Bauleiter sp&auml;testens 3 Werktage vorher
                  bei der Signalbaufirma anzuzeigen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die &quot;Richtlinien f&uuml;r Lichtsignalanlagen (RiLSA)
                  &ndash; Lichtzeichenanlagen f&uuml;r den
                  Stra&szlig;enverkehr&quot; sind zu beachten. Dies gilt
                  insbesondere f&uuml;r Nr. 5.2
                  &rdquo;Engstellensignalisierung&quot; und Nr. 7.4
                  &quot;Ersatzma&szlig;nahmen bei Betriebsunterbrechungen&quot;.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die Signalgeber sind neben dem rechten Fahrstreifen
                  aufzustellen. Im Bereich des rechten Fahrstreifenrandes
                  d&uuml;rfen sie in Ausnahmef&auml;llen nur aufgestellt werden,
                  wenn dadurch der vorbeiflie&szlig;ende Verkehr nicht behindert
                  bzw. keine zus&auml;tzliche Engstelle geschaffen wird. Der
                  Signalgeber kann jedoch auf dem Fahrstreifen aufgestellt
                  werden, wenn dieser nachfolgend durch die Arbeitsstelle
                  eingeengt wird.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Der Einsatz von Polizei f&uuml;r planbare, l&auml;ngere
                  Betriebsunterbrechungen an einer vorhandenen
                  Lichtzeichenanlage ist auszuschlie&szlig;en. Im &Uuml;brigen
                  ist er auf das unbedingt notwendige Ma&szlig; zu begrenzen.
                  Eine Information &uuml;ber den jeweils zust&auml;ndigen
                  St&ouml;rdienst und dessen Telefonnummer ist am
                  Steuerger&auml;t der Lichtzeichenanlage anzubringen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die Verkehrsregelungszentrale (VKRZ) Tel.: 902594 - 605 ist
                  bei bestehenden LZA rechtzeitig (2 Wochen vorher) durch den
                  Veranlasser &uuml;ber Abschalttermin und Abschaltdauer zu
                  informieren. Nach Inbetriebnahme ist die VKRZ durch die
                  Signalbaufirma &uuml;ber Einschalttermin und Einschaltzeit
                  unverz&uuml;glich in Kenntnis zu setzen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">24.</span>
              </p>
            </td>
            <td className="c256" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Umleitungen</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Die ,,Richtlinien f&uuml;r Umleitungsbeschilderung (RUB)&quot;
                  und die &quot;Richtlinien f&uuml;r verkehrslenkende
                  Ma&szlig;nahmen der Stra&szlig;enverkehrsbeh&ouml;rden, der
                  Stra&szlig;enbaubeh&ouml;rden und der Polizei
                  (Verkehrslenkungsrichtlinien)&rdquo; sind zu beachten.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die Umleitung ist so rechtzeitig anzuk&uuml;ndigen, dass sich
                  der Verkehrsteilnehmer auf die neue, unvorhersehbare Situation
                  einstellen kann.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die Umleitungsbeschilderung ist an jeder Stelle mit der
                  &ouml;rtlich vorhandenen Beschilderung abzustimmen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Weiterhin geltende Verkehrszeichen einschl. der Wegweisung und
                  der Verkehrseinrichtungen d&uuml;rfen durch die
                  Umleitungsbeschilderung nicht in ihrer Wirkung
                  beeintr&auml;chtigt werden.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Bei Vollsperrung ist die entgegenstehende wegweisende
                  Beschilderung bzw. sind die Zielangaben rot auszukreuzen. Die
                  dazu verwendeten Materialien m&uuml;ssen auch bei Nacht
                  deutlich erkennbar sein. Bei gr&ouml;&szlig;eren Umleitungen
                  &uuml;ber l&auml;ngere Streckenabschnitte ist die
                  Umleitungsbeschilderung mit Zusatzzeichen, welche den Namen
                  des Zielortes enthalten, zu erg&auml;nzen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">25.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">
                  Mitwirkungspflicht des (Bau-)Unternehmers
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Der (Bau-)Unternehmer hat im Hinblick auf seine
                  Verkehrssicherungspflicht st&auml;ndig eigenverantwortlich zu
                  pr&uuml;fen, ob zur Sicherung des Stra&szlig;enverkehrs
                  Ma&szlig;nahmen geboten sind, die &uuml;ber diese
                  verkehrsrechtliche Anordnung hinausgehen. Erscheinen hiernach
                  zus&auml;tzliche (verkehrsrechtliche) Ma&szlig;nahmen geboten,
                  ist unverz&uuml;glich bei der zust&auml;ndigen Beh&ouml;rde,
                  bei Gefahr im Verzug bei der Polizei, ggf. unter Vorlage eines
                  ge&auml;nderten Verkehrszeichenplanes/ -skizze, eine
                  erg&auml;nzende verkehrsrechtliche Anordnung einzuholen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Dies gilt auch f&uuml;r eventuell notwendige &Auml;nderungen/
                  Erg&auml;nzungen infolge des Baugeschehens etc.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">26.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Bekanntgabe von Baubeginn und -ende</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Der Beginn der Arbeiten ist der
                  Stra&szlig;enverkehrsbeh&ouml;rde des &ouml;rtlich
                  zust&auml;ndigen Bezirksamtes von Berlin mindestens 3 Tage
                  vorher und die Beendigung unverz&uuml;glich mitzuteilen (unter
                  Angabe der Ma&szlig;nahmen-Nummer der Anordnung).
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">27.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Verantwortliche</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Die benannten Personen m&uuml;ssen &uuml;ber die notwendigen
                  Kenntnisse nach der RSA verf&uuml;gen.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Die Eignung und Qualifikationen des/r Verantwortlichen
                  f&uuml;r die Sicherung von Arbeitsstellen ist im
                  &bdquo;Merkblatt &uuml;ber Rahmenbedingungen f&uuml;r
                  erforderliche Fachkenntnisse zur Verkehrssicherung an
                  Arbeitsstellen an Stra&szlig;e (MVAS 99)&ldquo;, VkBl. 1999
                  (Seite 694) beschrieben.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Auf Verlangen der Stra&szlig;enverkehrsbeh&ouml;rde sind dazu
                  Nachweise (&uuml;ber entsprechende Schulungen/
                  Qualifikationen) vorzulegen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c19" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c19" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c19" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c19" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c2" />
              </p>
            </td>
            <td className="c162" colSpan={18} rowSpan={1}>
              <p className="c39 c32">
                <span className="c102">V. Hinweise</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">1.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">
                  Zuwiderhandlungen gegen diese verkehrsrechtliche Anordnung
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Stellt die Stra&szlig;enverkehrsbeh&ouml;rde, die Polizei oder
                  eine andere zust&auml;ndige Beh&ouml;rde Zuwiderhandlungen
                  gegen diese verkehrsrechtliche Anordnung fest und werden sie
                  vom (Bau-)Unternehmer nicht sofort behoben, kann auf Kosten
                  des (Bau-) Unternehmers ein Dritter mit der Ausf&uuml;hrung
                  betraut werden. Das Gleiche gilt, wenn der (Bau-)Unternehmer
                  nur deswegen nicht sofort beheben kann, weil er durch
                  mangelnde Erreichbarkeit des Verantwortlichen nicht die
                  Gelegenheit dazu erh&auml;lt.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Sofern aus stra&szlig;enverkehrlicher Sicht erforderlich, kann
                  die zust&auml;ndige Beh&ouml;rde auch eine Beseitigung der
                  Arbeitsstelle auf Kosten des (Bau-)Unternehmers veranlassen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">2.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Gefahr im Verzug</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Bei Gefahr im Verzug ist die Polizei, vertreten durch jeden
                  einzelnen Polizeivollzugsbeamten, befugt, anstelle der
                  zust&auml;ndigen Beh&ouml;rde selbst vorl&auml;ufige
                  Ma&szlig;nahmen anzuordnen. Dies wird in der
                  verkehrsrechtlichen Anordnung vermerkt.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">3.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Ordnungswidrigkeiten</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Ordnungswidrig im Sinne von &sect; 24
                  Stra&szlig;enverkehrsgesetz (StVG) handelt, wer
                  vors&auml;tzlich oder fahrl&auml;ssig entgegen &sect; 45 Abs.
                  6 StVO mit Arbeiten beginnt, ohne zuvor Anordnungen eingeholt
                  zu haben, die Anordnungen nicht befolgt oder
                  Lichtzeichenanlagen nicht bedient (&sect; 49 Abs. 4 Nr. 3
                  StVO). Eine zivilrechtliche Haftung oder/ und strafrechtliche
                  Konsequenzen sind unbenommen davon m&ouml;glich.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c39 c32 c29">
                <span className="c1">4.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c39 c32">
                <span className="c1">Kennzeichnung der Arbeitsstelle</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c1" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Dient die Arbeitsstelle zur Durchf&uuml;hrung eines
                  Bauvorhabens gem&auml;&szlig; &sect; 11 Absatz 11 Berliner
                  Stra&szlig;engesetzes (BerlStrG) ist sie nach dieser
                  Vorschrift durch ein nach au&szlig;en hin deutlich lesbares
                  Schild mit den Angaben &uuml;ber Beginn, Umfang und Ende der
                  Sondernutzung sowie des Namens und der Telefonnummer der
                  Stra&szlig;enbaubeh&ouml;rde zu kennzeichnen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c1" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c61 c32 c29">
                <span className="c57">5.</span>
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c1">Sondernutzungserlaubnis</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c1" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Diese Anordnung regelt nicht die stra&szlig;enrechtliche
                  Sondernutzung. Die Erlaubnis zur Sondernutzung der
                  Stra&szlig;e ist gesondert bei der &ouml;rtlich
                  zust&auml;ndigen Stra&szlig;enbaubeh&ouml;rde (Stra&szlig;en-
                  und Gr&uuml;nfl&auml;chenamt) zu beantragen/ erlangen.
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c19" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c19" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c19" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c5 c29">
                <span className="c19" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c5">
                <span className="c19" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c19" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c5">
                <span className="c2" />
              </p>
            </td>
            <td className="c162" colSpan={18} rowSpan={1}>
              <p className="c39 c32">
                <span className="c102">VII. Rechtsbehelfsbelehrung</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20 c100">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c2" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c2" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Gegen diesen Bescheid ist der Widerspruch zul&auml;ssig. Er
                  ist innerhalb eines Monats nach Zugang dieses Bescheides
                  schriftlich oder zur Niederschrift bei Bezirksamt
                  Friedrichshain-Kreuzberg, Stra&szlig;enverkehrsbeh&ouml;rde,
                  Petersburger Stra&szlig;e 86-90, 10247 Berlin oder in
                  elektronischer Form mit einer qualifizierten elektronischen
                  Signatur im Sinne des Vertrauensdienstegesetzes i. V. m. der
                  Verordnung (EU) Nr. 910/2014 versehen an die E-Mail-Adresse
                  post@ba-fk.berlin.de zu erheben. Bei schriftlicher oder
                  elektronischer Einlegung des Widerspruchs ist die
                  Widerspruchsfrist nur dann gewahrt, wenn der Widerspruch
                  innerhalb dieser Frist eingegangen ist.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Nach &sect; 80 Abs. 2 Nr. 1 der Verwaltungsgerichtsordnung
                  (VwGO) hat ein Widerspruch bei der Anforderung von
                  &ouml;ffentlichen Abgaben und Kosten keine aufschiebende
                  Wirkung. Die Erhebung des Widerspruchs befreit daher nicht von
                  der fristgem&auml;&szlig;en Zahlung der festgesetzten
                  Verwaltungsgeb&uuml;hren.
                </span>
              </p>
              <p className="c61 c32">
                <span className="c2">
                  Ein erfolgloses Widerspruchsverfahren ist
                  geb&uuml;hrenpflichtig (mindestens 25,60 Euro).
                </span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c2" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c19" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c19" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c19" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c19" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c162" colSpan={18} rowSpan={1}>
              <p className="c39 c32">
                <span className="c102">VIII. Information</span>
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c19" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c19" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c61 c32">
                <span className="c2">
                  Der Verkehrszeichenplan ist vor Ort &ouml;ffentlich einsehbar
                  durch den Bauherrn oder den beauftragten Unternehmer
                  auszuh&auml;ngen (&sect; 39 Abs. 2 Satz 1 des Berliner
                  Mobilit&auml;tsgesetz -MobG-). Der Verkehrszeichenplan soll
                  gut lesbar (nach M&ouml;glichkeit nicht gr&ouml;&szlig;er als
                  im DIN A 2 Format) gesch&uuml;tzt vor Witterung (vorzugsweise
                  laminiert) sichtbar ausgehangen werden; sofern eine
                  Baustelleneinrichtung vorhanden ist, soll der
                  Verkehrszeichenplan an dieser im Fu&szlig;g&auml;ngerbereich
                  zug&auml;nglich angebracht werden. Der Verkehrszeichenplan
                  soll um die Angabe der f&uuml;r die verkehrsrechtliche
                  Anordnung zust&auml;ndigen Stra&szlig;enverkehrsbeh&ouml;rde
                  erg&auml;nzt werden; personenbezogene Daten sind indes zu
                  schw&auml;rzen bzw. ist der Verkehrszeichenplan um diese
                  Angaben zu bereinigen.
                </span>
              </p>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c19" />
              </p>
            </td>
          </tr>
          <tr className="c21">
            <td className="c40" colSpan={1} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c30" colSpan={1} rowSpan={1}>
              <p className="c18 c29">
                <span className="c19" />
              </p>
            </td>
            <td className="c24" colSpan={17} rowSpan={1}>
              <p className="c18">
                <span className="c19" />
              </p>
            </td>
            <td className="c26" colSpan={1} rowSpan={1}>
              <p className="c20">
                <span className="c19" />
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="c20">
        <span className="c23" />
      </p>
      <p className="c31 c32">
        <span className="c23">Mit freundlichen Gr&uuml;&szlig;en</span>
      </p>
      <p className="c31 c32">
        <span className="c23">
          Im Auftrag
          <br />
          <br />
          Ihr Bezirksamt Friedrichshain-Kreuzberg von Berlin,
          <br />
          Straßenverkehrsbehörde
        </span>
      </p>
      <p className="c20">
        <span className="c23" />
      </p>
      <p className="c20">
        <span className="c23" />
      </p>
      <div>
        <p className="c20">
          <span className="c23" />
        </p>
      </div>
    </div>
  );
};

export default TrafficOrder;
