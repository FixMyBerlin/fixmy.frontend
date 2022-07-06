import React from 'react';
import { connect } from 'react-redux';

import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import config from '~/pages/KatasterKI/config';
import { handleQuit } from '~/pages/KatasterKI/utils';

const CloseSurveyButton = ({ isEmbedded, style = {} }) => {
  return isEmbedded ? (
    <GhostButton sx={style} onClick={handleQuit}>
      Umfrage beenden
    </GhostButton>
  ) : (
    <GhostButton
      sx={style}
      onClick={() => {
        window.open(config.tspKatasterURL);
      }}
    >
      Informationen über das Projekt
    </GhostButton>
  );
};

const mapStateToProps = (state) => ({
  isEmbedded: state.KatasterKIState.isEmbedded,
});

export default connect(mapStateToProps)(CloseSurveyButton);
