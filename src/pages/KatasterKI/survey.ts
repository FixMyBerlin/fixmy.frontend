import { Answer, Perspective, Section, UserGroup } from './types';

import ButtonIconUnsafe from '~/images/strassencheck/icons/button-background-1.svg';
import ButtonIconMostyUnsafe from '~/images/strassencheck/icons/button-background-2.svg';
import ButtonIconMostlySafe from '~/images/strassencheck/icons/button-background-3.svg';
import ButtonIconSafe from '~/images/strassencheck/icons/button-background-4.svg';

import BikeIcon from '~/images/strassencheck/icons/icon-transportation-2.svg';
import PedestrianIcon from '~/images/strassencheck/icons/icon-transportation-1.svg';
import CarIcon from '~/images/strassencheck/icons/icon-transportation-4.svg';

import defaultProfileConfig from '~/pages/KatasterKI/config/profile';
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
  // if (config.debug) {
  //   return `/src/images/404-weg-zu-ende.jpg`;
  // }

  return `https://fmb-aws-bucket.s3.eu-central-1.amazonaws.com/KatasterKI/scenes/${id}.jpg`;
};

const profileConfig = (userGroup: UserGroup) => {
  const rv = [...defaultProfileConfig];

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
    const q2 = rv.findIndex((sec) => sec.name === 'motivationalFactors');
    rv.splice(q1, 1);
    rv.splice(q2, 1);
  }

  // Shuffle order of answer options if the section config contains
  // an option randomize

  // for (let i = 0; i < rv.length; i++) {
  //   if (rv[i].randomize) {
  //     if (rv[i].type === 'radiogroups') {
  //       shuffle(rv[i].radiogroups);
  //     } else {
  //       shuffle(rv[i].options);
  //       // Find options that define an input textbox and - if one is found
  //       // - move it to the end of the options array
  //       const inputFieldIndex = rv[i].options.findIndex(
  //         (val) => val.input === true
  //       );
  //       if (inputFieldIndex > -1) {
  //         const inputField = rv[i].options.splice(inputFieldIndex, 1)[0];
  //         // @ts-ignore
  //         rv[i].options.push(inputField);
  //       }
  //     }
  //   }
  // }

  return rv;
};

const scenesConfig = (
  scenes: Array<Answer>,
  perspective: Perspective,
  sceneGroupCounter: number
): Array<Section> => {
  const perspectiveName = perspectiveNames[perspective];

  const sceneCount = scenes.length;

  const titleScreen = {
    type: 'info',
    title: `Wir zeigen ihnen nun ${sceneCount} Bilder aus ${perspectiveName}. Bitte bewerten Sie, wie sicher Sie sich in den Situationen fühlen`,
    name: 'info'
  };

  const perspectiveChangeScreen = {
    type: 'perspective_change',
    name: 'perspectiveChange',
    title:
      'Vielen Dank, Sie können mit dieser Perspektive weiter machen oder jetzt die Straße aus einer anderen Sicht bewerten',
    options: Object.keys(perspectiveNames).map((p) => ({
      label: perspectiveNames[p],
      icon: perspectiveIcons[p],
      value: p
    }))
  };

  const feedbackScreen = {
    type: 'feedback',
    title: null,
    name: 'feedback'
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

  const sectionConfig = [titleScreen, ...sceneScreens];

  if (sceneGroupCounter % 2 === 1) {
    sectionConfig.push(perspectiveChangeScreen);
  } else {
    sectionConfig.push(feedbackScreen, perspectiveChangeScreen);
  }

  return sectionConfig;
};

export default {
  profileConfig,
  scenesConfig
};
