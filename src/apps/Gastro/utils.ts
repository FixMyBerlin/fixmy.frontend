import { parse } from 'date-fns';
import debug from 'debug';
import mapboxgl from 'mapbox-gl';
import {
  NUM_PARTICIPANTS_L,
  NUM_PARTICIPANTS_M,
  NUM_PARTICIPANTS_S,
  PRICE_PARTICIPANTS_L,
  PRICE_PARTICIPANTS_M,
  PRICE_PARTICIPANTS_S,
} from './constants';

import { EventPermit } from './types';

const logger = debug('fmc:Gastro:utils');

/**
 * Return true if the given regulation requires applications to
 * draw a requested area for their application
 *
 * @param zone Text description of a regulation
 */
export const requiresArea = (zone: string) =>
  [
    'Parkplatz',
    'Gehweg',
    'Parken längs',
    'Parken quer',
    'Parken diagonal',
    'Sonstige',
  ].includes(zone);

/** Return a description of the category given an application */
export const getCategoryDescription = (application: any) => {
  let categoryDescription = null;
  switch (application.category) {
    case 'restaurant':
      categoryDescription =
        'Herausstellen von Tischen & Stühlen für Schankzwecke';
      break;
    case 'retail':
      categoryDescription = 'Herausstellen von Waren';
      break;
    case 'workshop':
      categoryDescription = 'Ausführen von Dienstleistungen';
      break;
    default:
      categoryDescription = application.usage;
      break;
  }
  return categoryDescription;
};

/* eslint-disable camelcase */
export const dateReceived = ({ application_received }) =>
  application_received == null
    ? '<Datum Eingang>'
    : new Date(application_received).toLocaleDateString('de-DE');

export const permitStart = ({ permit_start }) =>
  permit_start == null
    ? '<Beginn der Genehmigung unbestimmt>'
    : new Date(permit_start).toLocaleDateString('de-DE');

export const permitEnd = ({ permit_end }) =>
  permit_end == null
    ? '<Ende der Genehmigung unbestimmt>'
    : new Date(permit_end).toLocaleDateString('de-DE');

export const eventDate = ({ date }: EventPermit): string =>
  date == null
    ? '<Datum der Veranstaltung nicht angegeben>'
    : new Date(date).toLocaleDateString('de-DE');

/**
 * Return the string-formatted amount due for an event permit
 *
 * @param EventPermit retrieved from api
 * @returns null if no payment due, otherwise string
 */
export const getPermitFee = ({
  num_participants,
  is_public_benefit,
}: EventPermit): string | null => {
  let amountCents: number;
  if (is_public_benefit === true) {
    amountCents = 0;
  } else {
    switch (num_participants) {
      case NUM_PARTICIPANTS_S:
        amountCents = PRICE_PARTICIPANTS_S;
        break;
      case NUM_PARTICIPANTS_M:
        amountCents = PRICE_PARTICIPANTS_M;
        break;
      case NUM_PARTICIPANTS_L:
        amountCents = PRICE_PARTICIPANTS_L;
        break;
      default:
        throw new Error(`Invalid num_participants: ${num_participants}`);
    }
  }

  if (amountCents === 0) {
    return null;
  }
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amountCents / 100.0);
};
/* eslint-enable camelcase */

export enum REGULATION {
  'Parkplatz' = 0,
  'Zone1' = 1,
  'Zone2' = 2,
  'Zone3' = 3,
  'Zone4' = 4,
  'Zone5' = 5,
  'Zone6' = 6,
  'Zone7' = 7,
  'Zone8' = 8,
  'Zone9' = 9,
  'Gehweg' = 10,
  'ParkenLängs' = 11,
  'ParkenQuer' = 12,
  'ParkenDiagonal' = 13,
  'Sonstige' = 14,
}

export const isBoardwalk = ({ regulation }) => regulation === REGULATION.Gehweg;

export const preSignup = (district) =>
  new Date() < district.apps.gastro.timeline.openSignup;

export const postSignup = (district) =>
  new Date() > district.apps.gastro.timeline.closeSignup;

export const openSignup = (district) =>
  !preSignup(district) && !postSignup(district);

export const setLayerVisibility = (
  map: mapboxgl.Map,
  availableLayerSets: { [name: string]: string[] },
  visibleLayerSets: string[]
) => {
  // All layer sets that are not visible are hidden
  const hiddenLayerSets = Object.keys(availableLayerSets).filter(
    (layerSet) => !visibleLayerSets.includes(layerSet)
  );
  // Hide all layers in hidden layer sets
  hiddenLayerSets.forEach((layerSet) => {
    logger(`Hiding layerset ${layerSet}:`, availableLayerSets[layerSet]);
    availableLayerSets[layerSet].forEach((layerName: string) =>
      map.setLayoutProperty(layerName, 'visibility', 'none')
    );
  });
  // Show all layers in visible layer sets
  visibleLayerSets.forEach((layerSet) => {
    logger(`Showing layerset ${layerSet}:`, availableLayerSets[layerSet]);
    availableLayerSets[layerSet].forEach((layerName: string) =>
      map.setLayoutProperty(layerName, 'visibility', 'visible')
    );
  });
};
