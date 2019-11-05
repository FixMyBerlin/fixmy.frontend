export interface Answer {
  sceneID: string;
  rating: Rating;
  duration: number;
}

export interface ProfileRequest {
  ageGroup: 0 | 1 | 2 | 3;
  berlinTraffic?: string;
  bicycleAccident: 0 | 1 | 2 | 3;
  bicycleUse: 0 | 1 | 2 | 3;
  bikeReasons?: Array<string>;
  district: string;
  gender: 'm' | 'w' | 'd';
  hasChildren: boolean;
  isAgbAccepted: boolean;
  postcode: string;
  transportRatings: {
    [mode: string]: TransportRating;
  };
  userGroup: UserGroup;
  vehiclesOwned: Array<VehicleKind>;
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
