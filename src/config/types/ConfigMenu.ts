import { ConfigRoutePath, ConfigRoutePage } from './ConfigRoute';

type SVGIcon = JSX.Element;

type Link = {
  type: 'link';
  label: string;
  link: ConfigRoutePath | ConfigRoutePage; // The Page
  icon: SVGIcon;
  border: boolean;
};

type ExternalLink = {
  type: 'external';
  label: string;
  href: `https://${string}`;
  icon: SVGIcon;
  border: boolean;
};

type Separator = {
  type: 'separator';
  label: string;
};

type Plus = {
  type: 'plus';
  label: string;
  icon?: SVGIcon;
  children: Link[];
};

type FooterItem = {
  label: string;
  link: ConfigRoutePath;
};

type MenuItem = Link | ExternalLink | Separator | Plus;

export type ConfigMenu = {
  size: number;
  profileLabel: string;
  login?: boolean;
  loginLabel: string;
  logo?: boolean;
  twitter?: boolean;
  items: MenuItem[];
  footeritems: FooterItem[];
};
