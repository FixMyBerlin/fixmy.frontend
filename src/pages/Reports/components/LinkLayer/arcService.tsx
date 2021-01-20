/* eslint-disable import/no-unresolved */
/**
 * Bundles types and logic to construct a deck.gl ArcLayer with data and configurations
 * in order to visualize relations between reports and plannings.
 */

// TODO: add unit tests (if we are going to move forward with this),
//  see https://deck.gl/docs/developer-guide/testing

import debug from 'debug';
// ESlint complains because deck.gl doesn't provide this export but it's
// available as a type export from @danmarshall/deckgl-typings
// @ts-ignore
import type { PickInfo as PartialPickInfo } from '@deck.gl/core/lib/deck';
import {
  Report,
  Status,
  STATUS_PLANNING,
  STATUS_REPORT,
} from '~/pages/Reports/apiservice';
import config from '~/pages/Reports/config';

const log = debug('fmc:reports:arcService');
const linkLayerConfig = config.reports?.overviewMap.linkLayer;

const enum POI_TYPE {
  PLANNING = 'PLANNING',
  REPORT = 'REPORT',
  // some status we do not care about
  UNHANDLED = 'UHANDLED',
}
type POI = {
  readonly coordinates: [number, number];
  readonly address: string;
  readonly type: POI_TYPE;
};
export type Arc = {
  from: POI;
  to: POI;
};

/**
 * Compiles data items (a list of objects) to be consumed by deck.gl,
 * see https://deck.gl/docs/api-reference/core/layer#data
 */
export function getArcs(report?: Report): Arc[] {
  if (!report) {
    return [];
  }
  const arcOrigin: Arc['from'] = getPoi(report);
  const linkages = getReportLinkages(report);

  // for each related report, construct an Arc
  return linkages.map((linkedReport) => ({
    from: arcOrigin,
    to: getPoi(linkedReport),
  }));
}

const ARC_LAYER_ID = 'reports-arc-layer';

/**
 * Compiles properties for a deck.gl ArcLayer instance,
 * see https://deck.gl/docs/api-reference/layers/arc-layer
 */
export function arcLayerProps(arcData: Arc[]) {
  return {
    id: ARC_LAYER_ID,
    data: arcData,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getSourceColor: () => linkLayerConfig.arcSourceColor || [250, 90, 140],
    getHeight: 0.5,
    getTargetColor: linkLayerConfig.arcTargetColor || [250, 90, 140],
    getWidth: 7,
    opacity: 0.6,
    pickable: true,
    // style on hover
    autoHighlight: true,
  };
}

// copied from deck.gl source code because it's missing in deck.gl types
type TooltipConfig = {
  text: string;
  html?: string;
  className?: string;
  style: {};
};

// deck.gl pickInfo type is missing definitions for fields that we use
type PickInfo = PartialPickInfo<any> &
  (
    | {
        picked: true;
        object: Arc;
      }
    | {
        picked: false;
        object: null;
      }
  );

/**
 * Compiles a tooltip for a picked arc layer item OR NOT,
 * depending on if an arc is picked.
 * see https://deck.gl/docs/developer-guide/interactivity
 */
export const compileTooltip = (pickInfo: PickInfo): TooltipConfig | null => {
  if (!pickInfo.picked) return null;
  if (pickInfo.object?.from.type === POI_TYPE.UNHANDLED) return null;

  const text =
    pickInfo.object.from.type === POI_TYPE.REPORT
      ? 'Planung zu dieser Radbügelmeldung'
      : 'Meldung zu diesem Radbügelstandort';
  const style = {
    /* display above foldout TODO: make this work */
    zIndex: 3001,
    fontFamily: "'Open Sans', sans-serif",
    color: config.colors.lightgrey,
    borderRadius: '6px',
    opacity: 0.9,
  };
  return { text, style };
};

function getPoi(report: Omit<Report, 'origin' | 'plannings'>): POI {
  return {
    coordinates: report.geometry.coordinates as [number, number],
    address: report.address,
    type: getPOIType(report.status),
  };
}
function getPOIType(reportStatus: Status): POI_TYPE {
  if (STATUS_REPORT.includes(reportStatus)) {
    return POI_TYPE.REPORT;
  }
  if (STATUS_PLANNING.includes(reportStatus)) {
    return POI_TYPE.PLANNING;
  }
  return POI_TYPE.UNHANDLED;
}

function getReportLinkages(selectedReport: Report) {
  // Plannings are linked to Reports by stating one ore more entries under "origin",
  // Reports are linked to Plannings by stating one ore more entries under "plannings"
  // The API states both fields, so we have to check if one of those keys contains an array
  // with at least one value
  let linkages: Report['origin'] | Report['plannings'] = [];
  try {
    ['plannings', 'origin'].forEach((linkType) => {
      // Also check for strings and try to parse it as Array. // FIXME: fix this on the API side.
      let relationsList = selectedReport[linkType];
      if (typeof relationsList === 'string') {
        relationsList = JSON.parse(relationsList);
      }
      if (relationsList.length) {
        linkages = linkages.concat(relationsList);
      }
    });
    // check for success and log about it
    if (linkages.length) {
      log('assembled arc Data');
    }
  } catch (e) {
    log('failed to assemble arc Data, using an empty data set');
    throw e;
  }
  return linkages;
}
