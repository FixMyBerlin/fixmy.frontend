import {
  ConfigMandatoryRoutes,
  mandatoryRoutes,
} from '../default/mandatoryRoutes';
import { ConfigRoutePath } from '../types/ConfigRoute';

type Props = ConfigMandatoryRoutes & {
  landing: ConfigRoutePath;
  cycleNetworkDevelopment: ConfigRoutePath;
};
export const routes: Props = {
  ...mandatoryRoutes,
  landing: '/forschungsprojekt',
  cycleNetworkDevelopment: '/radnetzentwicklung',
};
