import { Answer, Perspective, Section } from './types';

import ButtonIconUnsafe from '~/images/kataster-icons/button-backgrund-1.svg';
import ButtonIconMostyUnsafe from '~/images/kataster-icons/button-backgrund-2.svg';
import ButtonIconMostlySafe from '~/images/kataster-icons/button-backgrund-3.svg';
import ButtonIconSafe from '~/images/kataster-icons/button-backgrund-4.svg';

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

const ratingIcons = [
  ButtonIconUnsafe,
  ButtonIconMostyUnsafe,
  ButtonIconMostlySafe,
  ButtonIconSafe
];

export const getSceneImageSrc = (id) => {
  if (config.debug) {
    return `/src/images/404-weg-zu-ende.jpg`;
  }

  return `${config.prodUrl}/images/kataster/${id}`;
};

export const makeSection = (
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
      value: i,
      icon: ratingIcons[i]
    }))
  }));

  return [titleScreen, ...sceneScreens, perspectiveChangeScreen];
};
