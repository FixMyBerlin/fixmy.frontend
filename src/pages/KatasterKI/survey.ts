import { Answer, Perspective, Section, UserGroup } from './types';

import ButtonIconUnsafe from '~/images/strassencheck/icons/button-background-1.svg';
import ButtonIconMostyUnsafe from '~/images/strassencheck/icons/button-background-2.svg';
import ButtonIconMostlySafe from '~/images/strassencheck/icons/button-background-3.svg';
import ButtonIconSafe from '~/images/strassencheck/icons/button-background-4.svg';

import BikeIcon from '~/images/strassencheck/icons/icon-transportation-2.svg';
import PedestrianIcon from '~/images/strassencheck/icons/icon-transportation-1.svg';
import CarIcon from '~/images/strassencheck/icons/icon-transportation-4.svg';

import defaultProfileConfig from './config/profile';
import introQuestions from './config/introQuestions';
import { shuffle } from './utils';

const perspectiveNames = {
  C: 'Fahrradperspektive',
  A: 'Autoperspektive',
  P: 'Fußgängerperspektive'
};

const perspectiveIcons = {
  C: BikeIcon,
  A: CarIcon,
  P: PedestrianIcon
};

const ratingNames = ['unsicher', 'eher unsicher', 'eher sicher', 'sicher'];

const ratingIcons = [
  ButtonIconUnsafe,
  ButtonIconMostyUnsafe,
  ButtonIconMostlySafe,
  ButtonIconSafe
];

export const getSceneImageSrc = (id) => {
  return `https://fmb-aws-bucket.s3.eu-central-1.amazonaws.com/KatasterKI/scenes/${id}.jpg`;
};

/**
 * Given a list of indices for the intro question config, return a list
 * of section spec objects
 *
 * @param selection list of indices specifying questions to return
 */
const genIntroConfig = (selection: Array<number>) =>
  selection.map((num) => introQuestions[num]);

/**
 * Generate a section config for the first part of the survey
 *
 * @param userGroup usergroup of the current user
 * @param introIndices selection of indices, specifying which intro questions
 *   to show
 */
const profileConfig = (userGroup: UserGroup, introIndices: Array<number>) => {
  const introSelection = genIntroConfig(introIndices);
  const rv = [...introSelection, ...defaultProfileConfig];

  // Remove some questions for some user groups
  if (
    userGroup === UserGroup.bicycle ||
    userGroup === UserGroup.potentialBicycle
  ) {
    const q3 = rv.findIndex((sec) => sec.name === 'bikeReasons');
    rv.splice(q3, 1);
  } else if (
    userGroup === UserGroup.car ||
    userGroup === UserGroup.pedestrian
  ) {
    const q1 = rv.findIndex((sec) => sec.name === 'bicycleUse');
    rv.splice(q1, 1);
    const q2 = rv.findIndex((sec) => sec.name === 'motivationalFactors');
    rv.splice(q2, 1);
  }

  return rv;
};

/**
 * Select the screens to be included in the rating part of the survey.
 *
 * @param scenes list of scenes to be included
 * @param perspective the perspective represented by the scenes
 * @param sceneGroupCounter which round of ratings is this?
 */
const scenesConfig = (
  scenes: Array<Answer>,
  perspective: Perspective,
  sceneGroupCounter: number
): Array<Section> => {
  const perspectiveName = perspectiveNames[perspective];

  const sceneCount = scenes.length;

  const titleScreen = {
    type: 'info',
    title: `Wir zeigen Ihnen nun ${sceneCount} Bilder aus ${perspectiveName}. Bitte bewerten Sie, wie sicher Sie sich in den Situationen fühlen`,
    name: 'info'
  };

  const firstPerspectiveScreen = {
    type: 'perspective_change',
    name: 'perspectiveChange',
    title: `Perspektivwechsel: Sie haben bisher aus der ${perspectiveName} bewertet. Bitte bewerten Sie nun einige Situationen von einem anderen Verkehrsmittel aus.`,
    helper: 'Sie können die Perspektive später noch einmal wechseln.',
    options: Object.keys(perspectiveNames)
      .filter((p) => p !== perspective)
      .map((p) => ({
        label: perspectiveNames[p],
        icon: perspectiveIcons[p],
        value: p
      })),
    showCloseButton: false
  };

  const followingPerspectiveScreen = {
    type: 'perspective_change',
    name: 'perspectiveChange',
    title: `Sie können noch weitere Perspektiven bewerten: wahlweise aus derselben Sicht, oder von einem anderen Verkehrsmittel aus.`,
    helper: null,
    options: Object.keys(perspectiveNames).map((p) => ({
      label: perspectiveNames[p],
      icon: perspectiveIcons[p],
      value: p
    })),
    showCloseButton: true
  };

  const feedbackScreen = {
    type: 'feedback',
    title:
      'Tragen Sie hier Ihre E-Mail-Adresse ein, wenn Sie möchten, dass der Tagesspiegel und FixMyBerlin Sie über die Ergebnisse der Umfrage informieren.',
    name: 'feedback'
  };

  const emailScreen = {
    type: 'email',
    title:
      'Tragen Sie hier Ihre E-Mail-Adresse ein, wenn Sie möchten, dass der Tagesspiegel und FixMyBerlin Sie über die Ergebnisse der Umfrage informieren.',
    placeholder: 'Ihre E-Mail-Adresse',
    thankyou:
      'Danke, wir haben Ihnen eine E-Mail geschickt. Klicken Sie dort auf den Link zur Bestätigung.',
    name: 'email'
  };

  const titleByPerspective = {
    C: 'Sie fahren Fahrrad: Fühlen Sie sich hier sicher?',
    A: 'Wie empfinden Sie diese Situation beim Autofahren?',
    P: 'Sie gehen zu Fuß: Fühlen Sie sich hier sicher?'
  };

  const sceneScreens = scenes.map((scene) => ({
    type: 'scene',
    name: scene.sceneID,
    title: titleByPerspective[perspective],
    options: ratingNames.map((r, i) => ({
      label: r,
      value: i,
      icon: ratingIcons[i]
    }))
  }));

  const sectionConfig = [];
  if (sceneGroupCounter === 1) sectionConfig.push(titleScreen);

  sectionConfig.push(...sceneScreens);

  if (sceneGroupCounter === 1) {
    sectionConfig.push(firstPerspectiveScreen);
  } else if (sceneGroupCounter % 2 === 1) {
    sectionConfig.push(followingPerspectiveScreen);
  } else {
    sectionConfig.push(feedbackScreen, emailScreen, followingPerspectiveScreen);
  }

  return sectionConfig;
};

export default {
  profileConfig,
  scenesConfig
};
