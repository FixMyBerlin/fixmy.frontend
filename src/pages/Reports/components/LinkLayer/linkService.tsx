import debug from 'debug';
// eslint complains about not finding this even though it's just a type import
// eslint-disable-next-line import/no-unresolved
import type { FeatureCollection, LineString } from 'geojson';

import {
  Report,
  Status,
  STATUS_PLANNING,
  STATUS_REPORT,
} from '~/pages/Reports/apiservice';

const log = debug('fmc:reports:LinkLayer');

type NODE_TYPE = 'PLANNING' | 'REPORT' | 'UNHANDLED';

type Node = {
  readonly coordinates: [number, number];
  readonly address: string;
  readonly type: NODE_TYPE;
};

export type EntryLink = {
  from: Node;
  to: Node;
};

/**
 * Compile all links for a given report
 */
export function getLinks(report?: Report): EntryLink[] {
  if (!report) return [];
  const linkOrigin: EntryLink['from'] = getNode(report);

  return getReportLinks(report).map((linkedReport) => ({
    from: linkOrigin,
    to: getNode(linkedReport),
  }));
}

/**
 * Compile link collections into GeoJSON FeatureCollection
 *
 * @param linkData collection of links
 */
export const getFeatureCollection = (
  linkData: EntryLink[]
): FeatureCollection<LineString> => ({
  type: 'FeatureCollection',
  features: linkData.map((link) => ({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [link.from.coordinates, link.to.coordinates],
    },
  })),
});

function getNode(report: Omit<Report, 'origin' | 'plannings'>): Node {
  return {
    coordinates: report.geometry.coordinates as [number, number],
    address: report.address,
    type: getNodeType(report.status),
  };
}

function getNodeType(reportStatus: Status): NODE_TYPE {
  if (STATUS_REPORT.includes(reportStatus)) {
    return 'REPORT';
  }
  if (STATUS_PLANNING.includes(reportStatus)) {
    return 'PLANNING';
  }
  return 'UNHANDLED';
}

function getReportLinks(selectedReport: Report) {
  // Plannings are linked to Reports by stating one ore more entries under "origin",
  // Reports are linked to Plannings by stating one ore more entries under "plannings"
  // The API states both fields, so we have to check if one of those keys contains an array
  // with at least one value
  let links: Report['origin'] | Report['plannings'] = [];
  try {
    ['plannings', 'origin'].forEach((linkType) => {
      // Also check for strings and try to parse it as Array.
      // FIXME: fix this on the API side.
      let relationsList = selectedReport[linkType];
      if (typeof relationsList === 'string') {
        relationsList = JSON.parse(relationsList);
      }
      if (relationsList.length) {
        links = links.concat(relationsList);
      }
    });
  } catch (e) {
    log('failed to assemble LinkLayer data, using an empty data set');
    throw e;
  }
  return links;
}
