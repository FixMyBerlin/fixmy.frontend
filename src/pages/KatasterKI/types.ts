export interface Answer {
  sceneID: string;
  rating?: Rating;
  duration?: number;
}

export interface ProfileRequest {
  ageGroup: number;
  berlinTraffic: {
    [name: string]: boolean;
  };
  bicycleUse?: number;
  bikeReasons?: Array<string>;
  bikeReasonsVar?: string;
  district: string;
  gender: 'm' | 'w' | 'd';
  hasChildren: boolean;
  isTosAccepted: boolean;
  motivationalFactors?: {
    [name: string]: number;
  };
  perspective: Perspective;
  transportRatings: {
    [mode: string]: TransportRating;
  };
  userGroup: UserGroup;
  vehiclesOwned: Array<string>;
  whyBiking: Array<string>;
  zipcode: string;
  sessionID: string;
}

export interface ProfileResponse {
  scenes: Array<string>;
  ratings_total: number;
}

export interface AnswerRequest extends Answer {
  sessionID: string;
}

export interface NewsletterRequest {
  email: string;
  username: string;
  password: string;
  newsletter: boolean;
}

export type NewsletterResponse = NewsletterResponseOK | NewsletterResponseError;

type NewsletterResponseError = {
  [field: string]: [string];
};

type NewsletterResponseOK = {
  email: string;
  username: string;
  id: number;
};

export interface PerspectiveRequest {
  perspective: Perspective;
  sessionID: string;
}

export interface PerspectiveResponse extends ProfileResponse {}

export interface Section {
  type: string;
  title: string;
  name: string;
  options?: Array<{
    label: string;
    value: any;
  }>;
}

export enum Experiment {
  MainStreet = 'MS',
  CyclePath = 'CP',
  SideStreet = 'SE'
}

export enum Perspective {
  bicycle = 'C',
  car = 'A',
  pedestrian = 'P'
}

export enum Rating {
  unsafe,
  mostlyUnsafe,
  mostlySafe,
  safe
}

export enum RequestState {
  waiting = 'waiting',
  pending = 'pending',
  delayed = 'delayed',
  success = 'success',
  error = 'error'
}

export enum TransportMode {
  pedestrian = 'pedestrian',
  bicycle = 'bicycle',
  motorbike = 'motorbike',
  public = 'public',
  car = 'car'
}

export enum TransportRating {
  never,
  monthly,
  monthlyPlus,
  weekly,
  weeklyPlus,
  daily
}

export enum UserGroup {
  bicycle = 'bicycle',
  potentialBicycle = 'potentialBicycle',
  car = 'car',
  pedestrian = 'pedestrian'
}

export enum VehicleKind {
  pedelec = 'pedelec',
  car = 'car',
  public = 'public',
  motorbike = 'motorbike',
  bicycle = 'bicycle'
}
