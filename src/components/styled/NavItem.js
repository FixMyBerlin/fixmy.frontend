import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavItem = styled(NavLink).attrs({
  to: props => props.to
})`
  display: block;
  padding: 1.2rem 0;
  border-bottom: 1px solid ${config.colors.lightgrey};
  font-size: 1rem;
  color: ${config.colors.darkgrey};
  text-decoration: none;

  &:visited {
    color: ${config.colors.darkgrey};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default NavItem;
