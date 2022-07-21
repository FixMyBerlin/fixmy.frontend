import {
  ConfigMandatoryRoutes,
  mandatoryRoutes,
} from '../default/mandatoryRoutes';
import { ConfigRoutePage } from '../types/ConfigRoute';

type Props = ConfigMandatoryRoutes & {
  reports: ConfigRoutePage;
};

export const routes: Props = {
  ...mandatoryRoutes,
  reports: {
    index: '/',
    landing: '/meldungen',
    map: '/meldungen/karte',
    new: '/meldungen/neu',
  },
};
