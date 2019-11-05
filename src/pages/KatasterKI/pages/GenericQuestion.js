import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProgressBar from '~/pages/KatasterKI/components/ProgressBar';
import questions from '~/pages/KatasterKI/config/questions';
import Info from '~/pages/KatasterKI/components/QuestionTypes/Info';
import MultiChoice from '~/pages/KatasterKI/components/QuestionTypes/MultiChoice';
import SingleChoice from '~/pages/KatasterKI/components/QuestionTypes/SingleChoice';
import Sliders from '~/pages/KatasterKI/components/QuestionTypes/Sliders';
import ZipInput from '~/pages/KatasterKI/components/QuestionTypes/ZipInput';
import { setProfileAnswer } from '../state';

const questionTypes = {
  info: Info,
  multi_choice: MultiChoice,
  single_choice: SingleChoice,
  sliders: Sliders,
  zip: ZipInput
};

const GenericQuestion = ({ match, isAgbAccepted, profile, dispatch }) => {
  // we dont redirect when developing. We do so if agbs not accepted or no question param passed
  if ((!config.debug && !isAgbAccepted) || !match.params.question) {
    return <Redirect to={config.routes.katasterKI.landing} />;
  }

  const questionIndex = +match.params.question - 1;
  const question = questions[questionIndex];
  const QuestionComponent = questionTypes[question.type];
  const isLastQuestion = questionIndex === questions.length - 1;
  const nextRoute = isLastQuestion
    ? `${config.routes.katasterKI.sceneBase}/1`
    : `${config.routes.katasterKI.introBase}/${questionIndex + 2}`;

  if (
    typeof question === 'undefined' ||
    typeof QuestionComponent === 'undefined'
  ) {
    throw new Error("Error: Question or question type doesn't exist.");
  }

  const onChange = (value) => dispatch(setProfileAnswer(question.name, value));

  return (
    <>
      <ProgressBar steps={questions.length} currentStep={questionIndex} />
      <QuestionComponent
        {...question}
        currentValue={profile[question.name]}
        nextRoute={nextRoute}
        handleChange={onChange}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAgbAccepted: state.KatasterKIState.isAgbAccepted,
  profile: state.KatasterKIState.profile
});

export default connect(mapStateToProps)(GenericQuestion);
