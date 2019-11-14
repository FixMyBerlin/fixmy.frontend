import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import { numberFormat } from '~/utils/utils';
import Flex from '~/components/Flex';
import { getFeedbackThreshold } from '~/pages/KatasterKI/utils';
import Paragraph from '~/pages/KatasterKI/components/Paragraph';
import Button from '~/pages/KatasterKI/components/Button';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';
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
    width: 500px;
  `}
`;

// @TODO: the situation count needs to be dynamic
const userSituationCount = 15;

const Feedback = (props) => {
  if (!props.isTosAccepted) {
    return <Redirect to={config.routes.katasterKI.landing} />;
  }

  const feedbackThreshold = getFeedbackThreshold();
  const title = getTitle(numberFormat(props.statisticsCounter), numberFormat(feedbackThreshold));

  const onShare = () => {
    navigator.share({
      title: config.katasterKI.shareTitle,
      text: config.katasterKI.shareText,
      url: `${config.prodUrl}/${config.routes.katasterKI.landing}`
    });
  };

  const onOpenInfo = () => {
    window.location.href = config.katasterKI.tspArticleLink;
  };

  return (
    <>
      <QuestionTitle>
        {title}
        <ProgressVis value={props.statisticsCounter} max={feedbackThreshold} style={{ margin: '15px 0' }} />
      </QuestionTitle>

      <FeedbackWrapper>
        <Paragraph css={{ margin: '0 0 25px 0' }}>
          Sie haben bereits <strong>{userSituationCount} Situationen</strong> bewertet. Je mehr Bewertungen die Umfrage
          erhält umso aussagekräftiger sind die Ergebnisse.
        </Paragraph>

        <Flex css={{ flexGrow: 1 }} alignItems="center" flexDirection="column">
          {/* @TODO: where should we go when user clicks "weiter bewerten" ? */}
          <Button as={Link} to={config.routes.katasterKI.landing}>
            Weiter bewerten
          </Button>
          {navigator.share && (
            <GhostButton css={{ marginTop: 20 }} onClick={onShare}>
              Umfrage mit Freunden teilen
            </GhostButton>
          )}
          <GhostButton css={{ marginTop: 'auto' }} onClick={onOpenInfo}>
            Informationen über das Projekt
          </GhostButton>
        </Flex>
      </FeedbackWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  isTosAccepted: state.KatasterKIState.isTosAccepted,
  statisticsCounter: state.KatasterKIState.statisticsCounter
});

export default connect(mapStateToProps)(Feedback);
