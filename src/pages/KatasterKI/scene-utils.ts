import { Answer, Perspective, Section } from './types';

import ButtonIconUnsafe from '~/images/kataster-icons/button-backgrund-1.svg';
import ButtonIconMostyUnsafe from '~/images/kataster-icons/button-backgrund-2.svg';
import ButtonIconMostlySafe from '~/images/kataster-icons/button-backgrund-3.svg';
import ButtonIconSafe from '~/images/kataster-icons/button-backgrund-4.svg';

import BikeIcon from '~/images/kataster-icons/icon-transportation-2.svg';
import PedestrianIcon from '~/images/kataster-icons/icon-transportation-1.svg';
import CarIcon from '~/images/kataster-icons/icon-transportation-4.svg';

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

const agentNames = {
  C: 'Fahrradfahrer:in',
  A: 'Autofahrer:in',
  P: 'Fußgänger:in'
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

export const makeSection = (
  scenes: Array<Answer>,
  perspective: Perspective,
  sceneGroupCounter: number
): Array<Section> => {
  const perspectiveName = perspectiveNames[perspective];

  const sceneCount = scenes.length;

  const titleScreen = {
    type: 'info',
    title: `Wir zeigen ihnen nun ${sceneCount} Bilder aus ${perspectiveName}. Bitte bewerten Sie, wie sicher Sie sich in den Situationen fühlen:`,
    name: 'info'
  };

  const perspectiveChangeScreen = {
    type: 'perspective_change',
    name: 'perspectiveChange',
    title:
      'Vielen Dank, Sie können mit dieser Perspektive weiter machen oder jetzt die Straße aus einer anderen Sicht bewerten:',
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

  const sceneScreens = scenes.map((scene) => ({
    type: 'scene',
    name: scene.sceneID,
    title: `Fühlen Sie sich hier als ${agentNames[perspective]} sicher?`,
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
