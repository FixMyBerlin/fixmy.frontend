import React from 'react';
import { connect } from 'react-redux';
import Notice from '~/components2/Notice';
import { preSignup, openSignup, postSignup } from '~/apps/Gastro/utils';

const GastroNotice = ({ district }) => {
  if (district?.name === 'xhain')
    return (
      <Notice>
        Die eingereichten Meldungen werden vom Bezirksamt geprüft. Eine
        Bedarfsmeldung ist derzeit nicht möglich (Frist endete zum 17. Mai).
      </Notice>
    );

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
          Bitte füllen Sie das Formular bis zum Montag, den 22. Juni 2020 um 10
          Uhr aus.
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
  district: AppState.district
});

export default connect(mapStateToProps)(GastroNotice);
