import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import history from '~/history';
import Loader from '~/components/PageLoading';
import ProgressBar from '~/pages/KatasterKI/components/ProgressBar';
import Info from '~/pages/KatasterKI/components/SectionTypes/Info';
import MultiChoice from '~/pages/KatasterKI/components/SectionTypes/MultiChoice';
import SingleChoice from '~/pages/KatasterKI/components/SectionTypes/SingleChoice';
import Scene from '~/pages/KatasterKI/components/SectionTypes/Scene';
import {
  setAnswer,
  updateProgressBar,
  submitPerspectiveChange
} from '../state';
import { Answer, Section, RequestState } from '../types';
import { makeSection } from '~/pages/KatasterKI/scene-utils';
import PerspectiveChange from '../components/SectionTypes/PerspectiveChange';

const sectionTypes = {
  info: Info,
  multi_choice: MultiChoice,
  single_choice: SingleChoice,
  scene: Scene,
  perspective_change: PerspectiveChange
};

const getCurrentValue = (section: Section, scenes: Array<Answer>) =>
  section.type === 'scene'
    ? scenes.find((s) => s.sceneID === section.name)
    : null;

const Scenes = ({
  match,
  scenes,
  perspective,
  dispatch,
  profileRequest,
  perspectiveRequest
}) => {
  // we dont redirect when developing. We do so if agbs not accepted or no question param passed
  if (
    (!config.debug && profileRequest.state == RequestState.waiting) ||
    !match.params.page
  ) {
    return <Redirect to={config.routes.katasterKI.profileBase} />;
  }

  if (
    profileRequest.state == RequestState.pending ||
    profileRequest.state == RequestState.error
  )
    return <Loader pastDelay={true} error={profileRequest.message} />;

  if (
    perspectiveRequest.state == RequestState.pending ||
    perspectiveRequest.state == RequestState.error
  )
    return <Loader pastDelay={true} error={perspectiveRequest.message} />;

  const page = +match.params.page - 1;
  const sectionConfig = makeSection(scenes, perspective);
  const section = sectionConfig[page];
  if (section == null)
    return <Redirect to={config.routes.katasterKI.scenesBase + '/1'} />;
  const SectionComponent = sectionTypes[section.type];

  useEffect(() => {
    dispatch(updateProgressBar(page, sectionConfig.length));
  }, [page, sectionConfig.length]);

  if (
    typeof section === 'undefined' ||
    typeof SectionComponent === 'undefined'
  ) {
    throw new Error("Error: Section or section type doesn't exist.");
  }

  const onChange = ({ rating, duration, nextPerspective }) => {
    if (section.type === 'scene') {
      dispatch(setAnswer(section.name, rating, duration));
    } else if (section.type === 'perspective_change') {
      dispatch(setAnswer(section.name, rating, duration));
      dispatch(submitPerspectiveChange(nextPerspective));
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
      <ProgressBar />
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
  perspectiveRequest: state.KatasterKIState.perspectiveRequest
});

export default connect(mapStateToProps)(Scenes);
