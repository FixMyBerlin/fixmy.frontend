import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from '~/components/PageLoading';
import history from '~/history';
import ProgressBar from '~/pages/KatasterKI/components/ProgressBar';
import Info from '~/pages/KatasterKI/components/SectionTypes/Info';
import MultiChoice from '~/pages/KatasterKI/components/SectionTypes/MultiChoice';
import Scene from '~/pages/KatasterKI/components/SectionTypes/Scene';
import SingleChoice from '~/pages/KatasterKI/components/SectionTypes/SingleChoice';
import config from '~/pages/KatasterKI/config';
import Survey from '~/pages/KatasterKI/survey';

import EmailCheckboxes from '../components/SectionTypes/EmailCheckboxes';
import Feedback from '../components/SectionTypes/Feedback';
import PerspectiveChange from '../components/SectionTypes/PerspectiveChange';
import { updateProgressBar, submitPerspective, submitAnswer } from '../state';
import { Answer, Section, RequestState } from '../types';

const sectionTypes = {
  info: Info,
  multi_choice: MultiChoice,
  single_choice: SingleChoice,
  scene: Scene,
  perspective_change: PerspectiveChange,
  feedback: Feedback,
  email: EmailCheckboxes,
};

const getCurrentValue = (section: Section, scenes: Array<Answer>) =>
  section.type === 'scene'
    ? scenes.find((s) => s.sceneID === section.name)
    : null;

/**
 * Modifies the behavior of updateProgressBar so that only 'scene' sections
 * are considered
 *
 * @param page current match.params page entry
 * @param sectionConfig sectionConfig for current sceneGroup
 */
const updateScenesProgress = (page, sectionConfig) => {
  const progressPages = sectionConfig.filter(
    (section) => section.type === 'scene'
  );
  const current = progressPages.indexOf(sectionConfig[page]);
  return updateProgressBar(current, progressPages.length);
};

const Scenes = ({
  match,
  scenes,
  perspective,
  dispatch,
  profileRequest,
  perspectiveRequest,
  sceneGroupCounter,
}) => {
  // we dont redirect when developing. We do so if agbs not accepted or no question param passed
  if (
    (!config.debug && profileRequest.state === RequestState.waiting) ||
    !match.params.page
  ) {
    return <Redirect to={config.routes.katasterKI.profileBase} />;
  }

  if (
    profileRequest.state === RequestState.pending ||
    profileRequest.state === RequestState.error
  )
    return (
      <Loader
        pastDelay={false}
        error={profileRequest.message}
        color={config.colors.katasterHighlight}
      />
    );

  if (
    perspectiveRequest.state === RequestState.pending ||
    perspectiveRequest.state === RequestState.error
  )
    return (
      <Loader
        pastDelay={false}
        error={perspectiveRequest.message}
        color={config.colors.katasterHighlight}
      />
    );

  const page = +match.params.page - 1;
  const sectionConfig = Survey.scenesConfig(
    scenes,
    perspective,
    sceneGroupCounter
  );
  const section = sectionConfig[page];
  if (section == null)
    return <Redirect to={`${config.routes.katasterKI.scenesBase}/1`} />;
  const SectionComponent = sectionTypes[section.type];

  useEffect(() => {
    dispatch(updateScenesProgress(page, sectionConfig));
  }, [page, sectionConfig.length]);

  if (
    typeof section === 'undefined' ||
    typeof SectionComponent === 'undefined'
  ) {
    throw new Error("Error: Section or section type doesn't exist.");
  }

  const onChange = ({ rating, duration, nextPerspective }) => {
    if (section.type === 'scene') {
      dispatch(submitAnswer(section.name, rating, duration));
    } else if (section.type === 'perspective_change') {
      dispatch(submitPerspective(nextPerspective));
    }
  };

  const next = () => {
    const isLastSection = page === sectionConfig.length - 1;

    if (isLastSection) {
      history.push(`${config.routes.katasterKI.scenesBase}/1`);
    } else {
      history.push(`${config.routes.katasterKI.scenesBase}/${page + 2}`);
    }
  };

  return (
    <>
      {section.type === 'scene' && <ProgressBar />}
      <SectionComponent
        {...section}
        currentValue={getCurrentValue(section, scenes)}
        next={next}
        handleChange={onChange}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  isTosAccepted: state.KatasterKIState.isTosAccepted,
  scenes: state.KatasterKIState.scenes,
  perspective: state.KatasterKIState.currentPerspective,
  profileRequest: state.KatasterKIState.profileRequest,
  perspectiveRequest: state.KatasterKIState.perspectiveRequest,
  sceneGroupCounter: state.KatasterKIState.sceneGroupCounter,
});

export default connect(mapStateToProps)(Scenes);
