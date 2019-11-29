import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

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
import ShareButtonDesktop from '../ShareButtonDesktop';

const getTitle = (count, max) => {
  return `Wir haben bereits ${count} Bewertungen erhalten. Helfen Sie, damit wir auf ${max} kommen.`;
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
    window.parent.postMessage({ msg: 'done' }, '*');
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
          bewertet. Je mehr Straßensituationen bewertet werden, desto
          aussagekräftiger die Ergebnisse.
        </FeedbackParagraph>

        <Flex
          css={{ flexGrow: 1, maxWidth: 500, width: '100%', margin: '0 auto' }}
          alignItems="center"
          flexDirection="column"
        >
          <Button onClick={next}>Mehr Situationen bewerten</Button>

          {isEmbedded ? (
            <GhostButton css={{ marginTop: 10 }} onClick={handleQuit}>
              Umfrage beenden
            </GhostButton>
          ) : (
            <GhostButton
              css={{ marginTop: 10 }}
              onClick={() => {
                window.open(config.katasterKI.tspArticleLink);
              }}
            >
              Informationen über das Projekt
            </GhostButton>
          )}
        </Flex>

        <ShareButtonDesktop />
        <ShareButton />
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
