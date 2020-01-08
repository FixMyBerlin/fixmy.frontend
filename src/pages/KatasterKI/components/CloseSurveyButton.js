import React from 'react';
import { connect } from 'react-redux';

import config from '~/pages/KatasterKI/config';
import { handleQuit } from '~/pages/KatasterKI/utils';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';

const CloseSurveyButton = ({ isEmbedded, style = {} }) => {
  return isEmbedded ? (
    <GhostButton css={style} onClick={handleQuit}>
      Umfrage beenden
    </GhostButton>
  ) : (
    <GhostButton
      css={style}
      onClick={() => {
        window.open(config.tspKatasterURL);
      }}
    >
      Informationen über das Projekt
    </GhostButton>
  );
};

const mapStateToProps = (state) => ({
  isEmbedded: state.KatasterKIState.isEmbedded
});

export default connect(mapStateToProps)(CloseSurveyButton);
