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
import Radiogroups from '~/pages/KatasterKI/components/SectionTypes/Radiogroups';
import {
  setProfileAnswer,
  updateProgressBar,
  setZipcode,
  setTransportRating,
  submitProfile
} from '../state';
import { RequestState } from '../types';

const sectionTypes = {
  info: Info,
  multi_choice: MultiChoice,
  single_choice: SingleChoice,
  transportRatings: TransportRatings,
  zip: ZipInput,
  radiogroups: Radiogroups
};

/**
 * Return true if this page should redirect to the landing page
 *
 * @param matchParams page parameters from react-router
 * @param isTosAccepted boolean from state
 */
const shouldRedirectToLanding = (matchParams, isTosAccepted) => {
  if (config.debug) return false;

  if (!isTosAccepted || +matchParams.page < 1) return true;
  return false;
};

/**
 * Return true if page should redirect to scenes
 *
 * It should not be possible to return to the profile section after the profile
 * has been submitted for the first time. If that was possible a user could
 * receive several SceneGroups without having looked at them.
 *
 * @param profileRequest profile request info from state
 */
const shouldRedirectToScenes = (profileRequest) => {
  if (config.debug) return false;

  if (profileRequest.state === RequestState.success) return true;
  return false;
};

const Profile = ({
  match,
  isTosAccepted,
  profile,
  profileRequest,
  dispatch
}) => {
  if (shouldRedirectToLanding(match.params, isTosAccepted)) {
    return <Redirect to={config.routes.katasterKI.landing} />;
  }

  if (shouldRedirectToScenes(profileRequest)) {
    return <Redirect to={config.routes.katasterKI.scenesBase} />;
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
      dispatch(submitProfile());
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
        page={page}
        currentValue={profile[section.name]}
        next={next}
        handleChange={onChange}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  isTosAccepted: state.KatasterKIState.isTosAccepted,
  profile: state.KatasterKIState.profile,
  profileRequest: state.KatasterKIState.profileRequest
});

export default connect(mapStateToProps)(Profile);
