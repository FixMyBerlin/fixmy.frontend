export type ConfigRoutePath = `/${string}`;

export type ConfigRoutePage = {
  [key: string]: ConfigRoutePath;
};
