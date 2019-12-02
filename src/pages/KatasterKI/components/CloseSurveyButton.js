import React from 'react';
import { connect } from 'react-redux';

import { handleQuit } from '~/pages/KatasterKI/utils';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';

const CloseSurveyButton = ({ isEmbedded }) => {
  const css = {
    marginTop: 'auto'
  };
  return isEmbedded ? (
    <GhostButton css={css} onClick={handleQuit}>
      Umfrage beenden
    </GhostButton>
  ) : (
    <GhostButton
      css={css}
      onClick={() => {
        window.open(config.katasterKI.tspArticleLink);
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
