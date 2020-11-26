/**
 * Bundles types and logic to construct a deck.gl ArcLayer with data and configurations
 * in order to visualize relations between reports and plannings.
 */

// TODO: add unit tests (if we are going to move forward with this),
//  see https://deck.gl/docs/developer-guide/testing

import debug from 'debug';
import React from 'react';
import config from '../../../config';

const log = debug('fmc:reports:arcService');

const enum POI_TYPE {
  PLANNING = 'PLANNING',
  REPORT = 'REPORT',
  // some status we do not care about
  UNHANDLED = 'UHANDLED'
}
type POI = {
  readonly coordinates: ReadonlyArray<[number, number]>;
  readonly address: string;
  readonly type: POI_TYPE;
};
export type Arc = {
  from: POI;
  to: POI;
};
type ArcList = Arc[];

// TODO: add types for report entity
type REPORT_FIXME = unknown;

export function compileArcItems(
  reportOrReportList: REPORT_FIXME | REPORT_FIXME[]
): ArcList {
  if (Array.isArray(reportOrReportList)) {
    return reportOrReportList.flatMap(compileArcItemsForSingleReport);
  }
  // we are dealing with a single report
  return compileArcItemsForSingleReport(reportOrReportList);
}

/**
 * Compiles data items (a list of objects) to be consumed by deck.gl,
 * see https://deck.gl/docs/api-reference/core/layer#data
 */
function compileArcItemsForSingleReport(report?: REPORT_FIXME): ArcList {
  if (!report) {
    return [];
  }
  const arcOrigin: Arc['from'] = getPoiForReport(report);
  const linkages = getReportLinkages(report);

  // for each related report, construct an Arc
  return linkages.map(
    (linkedReport): Arc => ({
      from: arcOrigin,
      to: getPoiForReport(linkedReport)
    })
  );
}

const ARC_LAYER_ID = 'reports-arc-layer';

/**
 * Compiles properties for a deck.gl ArcLayer instance,
 * see https://deck.gl/docs/api-reference/layers/arc-layer
 */
export function compileArcLayerProps(arcData: ArcList) {
  return {
    id: ARC_LAYER_ID,
    data: arcData,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getSourceColor: () =>
      config.reports.overviewMap.arcSourceColor || [98, 75, 16],
    getHeight: 0.5,
    getTargetColor: config.reports.overviewMap.arcTargetColor || [
      110,
      155,
      210
    ],
    getWidth: 7,
    opacity: 0.6,
    pickable: true,
    // style on hover
    autoHighlight: true
  };
}

// copied from deck.gl source code TODO: find a way to import his
type TooltipConfig = null | {
  text?: string;
  html?: string;
  className?: string;
  style?: {};
};

/**
 * Compiles a tooltip for a picked arc layer item OR NOT,
 * depending on if an arc is picked.
 * see https://deck.gl/docs/developer-guide/interactivity
 */
export const compileTooltip = (pickInfo): TooltipConfig => {
  if (!pickInfo.picked) {
    // do not render a tooltip
    return null;
  }
  const pickedArc: Arc = pickInfo.object;
  if (pickedArc.from.type === POI_TYPE.UNHANDLED) {
    return null;
  }

  const text =
    pickedArc.from.type === POI_TYPE.REPORT
      ? 'Die zur Meldung gehörende Planung'
      : 'Die zur Planung gehörende Meldung';
  const style = {
    /* display above foldout TODO: make this work */
    zIndex: 3001,
    fontFamily: '"The Mix", sans-serif',
    borderRadius: '6px',
    opacity: 0.8
  };
  return { text, style };
};

function getPoiForReport(report): POI {
  return {
    coordinates: report.geometry.coordinates,
    address: report.address,
    type: mapReportStatusToPoiType(report.status)
  };
}
function mapReportStatusToPoiType(reportStatus: string): POI_TYPE {
  if (reportStatus.startsWith('report')) {
    return POI_TYPE.REPORT;
  }
  if (reportStatus === 'planning') {
    return POI_TYPE.PLANNING;
  }
  return POI_TYPE.UNHANDLED;
}

function getReportLinkages(selectedReport) {
  // Plannings are linked to Reports by stating one ore more entries under "origin",
  // Reports are linked to Plannings by stating one ore more entries under "plannings"
  // The API states both fields, so we have to check if one of those keys contains an array
  // with at least one value
  let linkages = [];
  const relationFieldNames = ['plannings', 'origin'];
  try {
    relationFieldNames.forEach((fieldName) => {
      // Also check for strings and try to parse it as Array. // FIXME: fix this on the API side.
      let relationsList = selectedReport[fieldName];
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
  }
  return linkages;
}
