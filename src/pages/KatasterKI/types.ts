export interface Answer {
  sceneID: string;
  rating?: Rating;
  duration?: number;
}

export interface ProfileRequest {
  ageGroup: number;
  berlinTraffic: number;
  bicycleUse: number;
  bikeReasons: Array<string>;
  bikeReasonsVar?: string;
  district?: string;
  gender: 'm' | 'w' | 'd';
  hasChildren: boolean;
  isTosAccepted: boolean;
  motivationalFactors: {
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
}

export interface ProfileResponse {
  scenes: Array<string>;
  ratings_total: number;
}

export interface AnswerRequest extends Answer {}

export interface PerspectiveChangeRequest {
  perspective: Perspective;
}

export interface PerspectiveChangeResponse extends ProfileResponse {}

export interface Section {
  type: string;
  title: string;
  name: string;
  options?: Array<{
    label: string;
    value: any;
  }>;
}

export const enum Experiment {
  MainStreet = 'MS',
  CyclePath = 'CP',
  SideStreet = 'SE'
}

export const enum Perspective {
  bicycle = 'C',
  car = 'A',
  pedestrian = 'P'
}

export const enum Rating {
  unsafe,
  mostlyUnsafe,
  mostlySafe,
  safe
}

export const enum RequestState {
  waiting = 'waiting',
  pending = 'pending',
  delayed = 'delayed',
  success = 'success',
  error = 'error'
}

export const enum TransportMode {
  pedestrian = 'pedestrian',
  bicycle = 'bicycle',
  motorbike = 'motorbike',
  public = 'public',
  car = 'car'
}

export const enum TransportRating {
  never,
  monthly,
  monthlyPlus,
  weekly,
  weeklyPlus,
  daily
}

export const enum UserGroup {
  bicycle = 'bicycle',
  potentialBicycle = 'potentialBicycle',
  car = 'car',
  pedestrian = 'pedestrian'
}

export const enum VehicleKind {
  pedelec = 'pedelec',
  car = 'car',
  public = 'public',
  motorbike = 'motorbike',
  bicycle = 'bicycle'
}
