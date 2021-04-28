import { isAfter, isBefore } from 'date-fns';
import { Field } from 'formik';
import { DatePicker, TimePicker } from 'formik-material-ui-pickers';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '~/store';

const InvisiLabel = styled.label`
  display: none;
`;

const timePickerOpts = {
  ampm: false,
  minutesStep: 5,
  views: ['hours', 'minutes'],
};

const connector = connect(({ AppState }: RootState) => ({
  district: AppState.district,
}));

type Props = ConnectedProps<typeof connector> & {
  minDate: Date;
};

const SectionUsage = ({ district, minDate }: Props) => (
  <section>
    <h3>Wann soll die Veranstaltung stattfinden</h3>
    <p>
      Hinweis: Sondergenehmigungen sind von Montag bis Samstag in den Zeiten 6
      bis 22 Uhr möglich (Sonntag und Feiertags nur in Ausnahmefällen). Bitte
      beachten Sie, dass nur eine bestimmte Anzahl von Veranstaltungen pro Monat
      erlaubt werden kann. Über die Belegung der Flächen entscheidet das
      Bezirksamt im Einzelfall. Anträge müssen mindestens 20 Werktage vor
      Veranstaltungsbeginn gestellt werden.
    </p>
    <InvisiLabel htmlFor="date">Datum</InvisiLabel>
    <Field
      component={DatePicker}
      fullWidth
      name="date"
      label="Datum"
      format="PP"
      shouldDisableDate={(dt: Date) =>
        isBefore(dt, minDate) ||
        isAfter(dt, district.apps.gastro.timeline.permitEnd)
      }
    />
    <InvisiLabel htmlFor="setup_start">Beginn des Aufbaus</InvisiLabel>
    <Field
      component={TimePicker}
      fullWidth
      name="setup_start"
      label="Beginn des Aufbaus"
      {...timePickerOpts}
    />
    <InvisiLabel htmlFor="event_start">Beginn der Veranstaltung</InvisiLabel>
    <Field
      component={TimePicker}
      fullWidth
      name="event_start"
      label="Beginn der Veranstaltung"
      {...timePickerOpts}
    />
    <InvisiLabel htmlFor="event_end">Ende der Veranstaltung</InvisiLabel>
    <Field
      component={TimePicker}
      fullWidth
      name="event_end"
      label="Ende der Veranstaltung"
      {...timePickerOpts}
    />
    <InvisiLabel htmlFor="teardown_end">Ende des Abbaus</InvisiLabel>
    <Field
      component={TimePicker}
      fullWidth
      name="teardown_end"
      label="Ende des Abbaus"
      {...timePickerOpts}
    />
  </section>
);

export default connector(SectionUsage);
