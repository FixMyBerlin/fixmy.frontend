import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProgressBar from '~/pages/KatasterKI/components/ProgressBar';
import profileConfig from '~/pages/KatasterKI/config/profile';
import Info from '~/pages/KatasterKI/components/QuestionTypes/Info';
import MultiChoice from '~/pages/KatasterKI/components/QuestionTypes/MultiChoice';
import SingleChoice from '~/pages/KatasterKI/components/QuestionTypes/SingleChoice';
import Sliders from '~/pages/KatasterKI/components/QuestionTypes/Sliders';
import ZipInput from '~/pages/KatasterKI/components/QuestionTypes/ZipInput';
import { setProfileAnswer, updateProgressBar } from '../state';

const sectionTypes = {
  info: Info,
  multi_choice: MultiChoice,
  single_choice: SingleChoice,
  sliders: Sliders,
  zip: ZipInput
};

const Profile = ({ match, isAgbAccepted, profile, dispatch }) => {
  // we dont redirect when developing. We do so if agbs not accepted or no question param passed
  if ((!config.debug && !isAgbAccepted) || !match.params.page) {
    return <Redirect to={config.routes.katasterKI.landing} />;
  }

  const page = +match.params.page - 1;
  dispatch(updateProgressBar(page, profileConfig.length));

  const section = profileConfig[page];
  const SectionComponent = sectionTypes[section.type];
  const isLastSection = page === profileConfig.length - 1;
  const nextRoute = isLastSection
    ? `${config.routes.katasterKI.scenesBase}/1`
    : `${config.routes.katasterKI.profileBase}/${page + 2}`;

  if (
    typeof section === 'undefined' ||
    typeof SectionComponent === 'undefined'
  ) {
    throw new Error("Error: Section or section type doesn't exist.");
  }

  const onChange = (value) => dispatch(setProfileAnswer(section.name, value));

  return (
    <>
      <ProgressBar />
      <SectionComponent
        {...section}
        currentValue={profile[section.name]}
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

export default connect(mapStateToProps)(Profile);
