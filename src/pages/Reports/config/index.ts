import globalConfig from '~/config';
import berlin from './berlin';
import aachen from './aachen';
import { RootConfig } from '~/types';

type ImageSrc = {
  source: string;
  attribution?: string;
};

interface LandingContent {
  faq: { heading: string; text: string }[];
  intro: string;
  sections?: { heading: string; text: string }[];
  steps?: { step: number; text: string }[];
}

interface LandingConfig {
  title: string;
  CTA: string;
  logo: ImageSrc;
  background: ImageSrc;
  backgroundDesktop: ImageSrc;
  stepColors: string[];
  reportsActive: LandingContent;
  reportsInactive: LandingContent;
  logoFooter?: {
    large: string;
    small: string;
    alt: string;
    footerLine: string;
  };
}

interface LocateMeMapConfig {
  zoomOnGeocodedLocation: number;
  boundaryGeodataUrl: string;
  outofBoundaryText: string;
  paddingInDegree: number;
  geocoder: {
    debounceTime: number;
    searchStringMinLength: number;
  };
}

interface OverviewMapConfig {
  bounds: mapboxgl.LngLatBoundsLike;
  clusterColor: {
    outer: string;
    inner: string;
  };
  linkLayer?: {
    color: string;
  };
  maxBounds: mapboxgl.LngLatBoundsLike;
  style: string;
  zoomDeepLinkedMarkers?: number;
}

export interface ReportsConfig {
  enabled: boolean;
  dialog: {
    imageResizeOptions: {
      maxWidth: number;
      maxHeight: number;
      quality: number;
    };
  };
  landing: LandingConfig;
  locateMeMap: LocateMeMapConfig;
  overviewMap: OverviewMapConfig;
  title: string;
  form: {
    placementNotice?: boolean;
    newsletter: boolean;
    zoomOutForInvalidLocations?: boolean;
  };
  markerSet: 'default' | 'aachen';
  tests: {
    addressInput: string;
    mockGeoLocation: {
      latitude: number;
      longitude: number;
    };
  };
  feedbackMail: string;
  region: string;
  flatButtons: boolean;
  thankYouNote: {
    base: string;
    loggedIn: string;
    loggedOut: string;
  };
}

const instanceConfig = globalConfig.region === 'aachen' ? aachen : berlin;

const reportsConfig: RootConfig & { reports: ReportsConfig } = {
  ...globalConfig,
  reports: instanceConfig,
};

export default reportsConfig;
