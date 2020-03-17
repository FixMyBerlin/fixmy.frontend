import styled from 'styled-components';
import MenuButton from '~/components/MenuButton';
import config from '~/pages/Reports/config';

const ReportsMenuButton = styled(MenuButton)`
  padding: 8px;
  background-color: ${config.colors.darkbg};
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`;

export default ReportsMenuButton;
