import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import history from '~/history';
import { media } from '~/styles/utils';
import { numberFormat } from '~/utils/utils';
import Flex from '~/components/Flex';
import { getFeedbackThreshold } from '~/pages/KatasterKI/utils';
import Paragraph from '~/pages/KatasterKI/components/Paragraph';
import Button from '~/pages/KatasterKI/components/Button';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import ShareButton from '~/pages/KatasterKI/components/ShareButton';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import ProgressVis from '~/pages/KatasterKI/components/ProgressVis';

const getTitle = (count, max) => {
  return `Wir haben bereits ${count} Bewertungen bekommen, helfen Sie mit, dass wir auf ${max} kommen.`;
};

const FeedbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${media.m`
    margin-left: auto;
    margin-right: auto;
    width: 640px;
  `}
`;

const FeedbackParagraph = styled(Paragraph)`
  margin: 0 0 25px 0;

  ${media.m`
    margin: 0 0 70px 0;
  `}
`;

const Feedback = ({
  isTosAccepted,
  statisticsCounter,
  ratingsCounter,
  isEmbedded,
  next
}) => {
  if (!isTosAccepted) {
    return <Redirect to={config.routes.katasterKI.landing} />;
  }

  const feedbackThreshold = getFeedbackThreshold(statisticsCounter);
  const title = getTitle(
    numberFormat(statisticsCounter),
    numberFormat(feedbackThreshold)
  );

  /**
   * Handles behavior when users clicked the 'quit' button.
   *
   * When the survey is embedded this should message the parent window to close
   * the iFrame. When not embedded, a redirect to a content page is issued
   * through history.push
   */
  const handleQuit = () => {
    if (isEmbedded) {
      window.parent.postMessage({ msg: 'done' }, '*');
    } else {
      history.push(config.katasterKI.tspArticleLink);
    }
  };

  return (
    <>
      <QuestionTitle>
        {title}
        <ProgressVis
          value={statisticsCounter}
          max={feedbackThreshold}
          style={{ margin: '15px 0' }}
        />
      </QuestionTitle>

      <FeedbackWrapper>
        <FeedbackParagraph>
          Sie haben bereits <strong>{ratingsCounter} Situationen</strong>{' '}
          bewertet. Je mehr Bewertungen die Umfrage erhält umso aussagekräftiger
          sind die Ergebnisse.
        </FeedbackParagraph>

        <Flex
          css={{ flexGrow: 1, maxWidth: 500, width: '100%', margin: '0 auto' }}
          alignItems="center"
          flexDirection="column"
        >
          <Button onClick={next}>Weiter bewerten</Button>
          <ShareButton style={{ marginTop: 20 }} />
          <GhostButton css={{ marginTop: 'auto' }} onClick={handleQuit}>
            Informationen über das Projekt
          </GhostButton>
        </Flex>
      </FeedbackWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  isTosAccepted: state.KatasterKIState.isTosAccepted,
  statisticsCounter: state.KatasterKIState.statisticsCounter,
  ratingsCounter: state.KatasterKIState.ratingsCounter,
  isEmbedded: state.KatasterKIState.isEmbedded
});

export default connect(mapStateToProps)(Feedback);
