/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProgressBar from '~/pages/KatasterKI/components/ProgressBar';
import questions from '~/pages/KatasterKI/config/questions';
import Info from '~/pages/KatasterKI/pages/GenericQuestion/Types/Info';
import MultiChoice from '~/pages/KatasterKI/pages/GenericQuestion/Types/MultiChoice';
import SingleChoice from '~/pages/KatasterKI/pages/GenericQuestion/Types/SingleChoice';
import Sliders from '~/pages/KatasterKI/pages/GenericQuestion/Types/Sliders';
import ZipInput from '~/pages/KatasterKI/pages/GenericQuestion/Types/ZipInput';

const questionTypes = {
  info: Info,
  multi_choice: MultiChoice,
  single_choice: SingleChoice,
  sliders: Sliders,
  zip: ZipInput
};

const GenericQuestion = (props) => {
  // we dont redirect when developing. We do so if agbs not accepted or no question param passed
  if ((!config.debug && !props.isAgbAccepted) || !props.match.params.question) {
    return <Redirect to={config.routes.katasterKI.landing} />;
  }

  const questionIndex = +props.match.params.question - 1;
  const question = questions[questionIndex];
  const QuestionComponent = questionTypes[question.type];
  const isLastQuestion = questionIndex === questions.length - 1;
  const nextRoute = isLastQuestion
    ? `${config.routes.katasterKI.sceneBase}/1`
    : `${config.routes.katasterKI.introBase}/${questionIndex + 2}`;

  console.log(question);
  if (
    typeof question === 'undefined' ||
    typeof QuestionComponent === 'undefined'
  ) {
    throw new Error("Error: Question or question type doesn't exist.");
  }

  return (
    <>
      <ProgressBar steps={questions.length} currentStep={questionIndex} />
      <QuestionComponent {...question} nextRoute={nextRoute} />
    </>
  );
};

const mapStateToProps = (state) => ({
  intro: state.KatasterKIState.intro,
  isAgbAccepted: state.KatasterKIState.isAgbAccepted
});

export default connect(mapStateToProps)(GenericQuestion);
