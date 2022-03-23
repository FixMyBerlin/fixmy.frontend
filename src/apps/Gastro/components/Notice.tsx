import React from 'react';
import { connect } from 'react-redux';

import { preSignup, openSignup, postSignup } from '~/apps/Gastro/utils';
import { Notice } from '~/components2/Notice';

const GastroNotice = ({ district }) => {
  if (district?.name === 'xhain') {
    if (preSignup(district))
      return (
        <Notice>
          Die Antragstellung ist ab{' '}
          {district.apps.gastro.timeline.openSignup.toLocaleDateString('de-DE')}{' '}
          möglich.
        </Notice>
      );
    if (openSignup(district)) return null;
    if (postSignup(district))
      return (
        <Notice>
          Vielen Dank für Ihr Interesse. Eine Antragsstellung ist derzeit nicht
          möglich.
        </Notice>
      );
  }

  return null;
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(GastroNotice);
