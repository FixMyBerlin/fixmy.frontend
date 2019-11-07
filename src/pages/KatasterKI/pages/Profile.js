/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import history from '~/history';
import ProgressBar from '~/pages/KatasterKI/components/ProgressBar';
import profileConfig from '~/pages/KatasterKI/config/profile';
import Info from '~/pages/KatasterKI/components/SectionTypes/Info';
import MultiChoice from '~/pages/KatasterKI/components/SectionTypes/MultiChoice';
import SingleChoice from '~/pages/KatasterKI/components/SectionTypes/SingleChoice';
import TransportRatings from '~/pages/KatasterKI/components/SectionTypes/TransportRatings';
import ZipInput from '~/pages/KatasterKI/components/SectionTypes/ZipInput';
import {
  setProfileAnswer,
  updateProgressBar,
  setZipcode,
  setTransportRating
} from '../state';

const sectionTypes = {
  info: Info,
  multi_choice: MultiChoice,
  single_choice: SingleChoice,
  transportRatings: TransportRatings,
  zip: ZipInput
};

const Profile = ({ match, isAgbAccepted, profile, dispatch }) => {
  // we dont redirect when developing. We do so if agbs not accepted or no question param passed
  if ((!config.debug && !isAgbAccepted) || !match.params.page) {
    return <Redirect to={config.routes.katasterKI.landing} />;
  }

  const page = +match.params.page - 1;

  useEffect(() => {
    dispatch(updateProgressBar(page, profileConfig.length));
  }, [page, profileConfig.length]);

  const section = profileConfig[page];
  const SectionComponent = sectionTypes[section.type];

  if (
    typeof section === 'undefined' ||
    typeof SectionComponent === 'undefined'
  ) {
    throw new Error("Error: Section or section type doesn't exist.");
  }

  const onChange = (value) => {
    if (section.name === 'transportRatings') {
      const { type, rating } = value;
      dispatch(setTransportRating(type, rating));
    } else if (section.name === 'zipcode') {
      const { zipcode, district } = value;
      dispatch(setZipcode(zipcode, district));
    } else {
      dispatch(setProfileAnswer(section.name, value));
    }
  };

  const next = () => {
    const isLastSection = page === profileConfig.length - 1;
    if (isLastSection) {
      history.push(`${config.routes.katasterKI.scenesBase}/1`);
    } else {
      history.push(`${config.routes.katasterKI.profileBase}/${page + 2}`);
    }
  };

  return (
    <>
      <ProgressBar />
      <SectionComponent
        {...section}
        currentValue={profile[section.name]}
        next={next}
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
