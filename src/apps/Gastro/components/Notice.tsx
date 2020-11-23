import React from 'react';
import { connect } from 'react-redux';
import Notice from '~/components2/Notice';
import { preSignup, openSignup, postSignup } from '~/apps/Gastro/utils';

const GastroNotice = ({ district }) => {
  if (district?.name === 'xhain') {
    if (preSignup(district))
      return (
        <Notice>
          Bisher wurden 100 Anträge genehmigt, das Formular zur Antragsstellung
          wird demnächst wieder für neue Anträge freigeschaltet.
        </Notice>
      );
    if (openSignup(district))
      return (
        <Notice>
          Anträge können durch gastronomische Betriebe, Soziale Projekte oder
          den Einzelhandel gestellt werden, sofern diese in einer Nebenstraße
          liegen.
        </Notice>
      );
    if (postSignup(district))
      return (
        <Notice>
          Vielen Dank für Ihr Interesse. Das Formular zur Antragsstellung wird
          demnächst wieder für neue Anträge freigeschaltet.
        </Notice>
      );
  }

  if (district?.name === 'tempelberg') {
    if (preSignup(district))
      return (
        <Notice>
          Die Anmeldung ist ab{' '}
          {district.apps.gastro.timeline.openSignup.toLocaleString()} möglich.
        </Notice>
      );
    if (openSignup(district))
      return (
        <Notice>
          Bitte füllen Sie das Formular bis zum Dienstag, den 23. Juni 2020 um
          10 Uhr aus.
        </Notice>
      );
    if (postSignup(district))
      return (
        <Notice>
          Die eingereichten Meldungen werden vom Bezirksamt geprüft. Eine
          Bedarfsmeldung ist derzeit nicht möglich (Frist endete zum 22. Juni).
        </Notice>
      );
  }
  return null;
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(GastroNotice);
