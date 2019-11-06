import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import history from '~/history';
import ProgressBar from '~/pages/KatasterKI/components/ProgressBar';
import profileConfig from '~/pages/KatasterKI/config/profile';
import Info from '~/pages/KatasterKI/components/QuestionTypes/Info';
import MultiChoice from '~/pages/KatasterKI/components/QuestionTypes/MultiChoice';
import SingleChoice from '~/pages/KatasterKI/components/QuestionTypes/SingleChoice';
import Scene from '~/pages/KatasterKI/components/QuestionTypes/Scene';
import Sliders from '~/pages/KatasterKI/components/QuestionTypes/Sliders';
import ZipInput from '~/pages/KatasterKI/components/QuestionTypes/ZipInput';
import { setAnswer, updateProgressBar } from '../state';
import { Answer, Perspective, Section } from '../types';

const sectionTypes = {
  info: Info,
  multi_choice: MultiChoice,
  single_choice: SingleChoice,
  scene: Scene,
  sliders: Sliders,
  zip: ZipInput
};

// TODO: Replace with function
const isProfileComplete = true;

const perspectiveNames = {
  C: 'Fahrradfahrerperspektive',
  A: 'Autofahrerperspektive',
  P: 'Fußgängerperspektive'
};

const agentNames = {
  C: 'Fahrradfahrer:in',
  A: 'Autofahrer:in',
  P: 'Fußgänger:in'
};

const ratingNames = ['unsicher', 'eher unsicher', 'eher sicher', 'sicher'];

const makeSection = (
  scenes: Array<Answer>,
  perspective: Perspective
): Array<Section> => {
  const perspectiveName = perspectiveNames[perspective];

  const titleScreen = {
    type: 'info',
    title: `Wir zeigen ihnen nun Bilder aus ${perspectiveName}. Bitte bewerten Sie, wie sicher Sie sich in den Situationen fühlen:`,
    name: 'info'
  };
  const perspectiveChangeScreen = {
    type: 'single_choice',
    name: 'perspectiveChange',
    title:
      'Danke für Ihre Bewertungen. Sie können weiter machen oder die Perspektive wechseln.',
    options: Object.keys(perspectiveNames).map((p) => ({
      label: perspectiveNames[p],
      value: p
    }))
  };
  const sceneScreens = scenes.map((scene) => ({
    type: 'scene',
    name: scene.sceneID,
    title: `Fühlen Sie sich hier als ${agentNames[perspective]} sicher?`,
    options: ratingNames.map((r, i) => ({
      label: r,
      value: i
    }))
  }));
  return [titleScreen, ...sceneScreens, perspectiveChangeScreen];
};

const getCurrentValue = (section: Section, scenes: Array<Answer>) =>
  section.name === 'scene'
    ? scenes.find((s) => s.sceneID === section.name)
    : null;

const Scenes = ({ match, scenes, perspective, dispatch }) => {
  // we dont redirect when developing. We do so if agbs not accepted or no question param passed
  if ((!config.debug && !isProfileComplete) || !match.params.page) {
    return <Redirect to={config.routes.katasterKI.profileBase} />;
  }
  const page = +match.params.page - 1;

  const sectionConfig = makeSection(scenes, perspective);

  useEffect(() => dispatch(updateProgressBar(page, sectionConfig.length)), [
    page,
    sectionConfig.length
  ]);

  const section = sectionConfig[page];
  const SectionComponent = sectionTypes[section.type];

  if (
    typeof section === 'undefined' ||
    typeof SectionComponent === 'undefined'
  ) {
    throw new Error("Error: Section or section type doesn't exist.");
  }

  const onChange = (rating: number, duration: number) =>
    section.type === 'scene'
      ? dispatch(setAnswer(section.name, rating, duration))
      : null;

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
  isAgbAccepted: state.KatasterKIState.isAgbAccepted,
  scenes: state.KatasterKIState.scenes,
  perspective: state.KatasterKIState.currentPerspective
});

export default connect(mapStateToProps)(Scenes);
