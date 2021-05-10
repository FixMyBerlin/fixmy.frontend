import styled from 'styled-components';

import config from '~/config';

const NavItem = styled('a').attrs((props) => ({ href: props.href }))`
  display: flex;
  padding: 1.2rem 0;
  margin: 0 2rem;
  border-bottom: ${(props) =>
    props.border ? `1px solid ${config.colors.lightgrey}` : 'none'};
  font-size: 1rem;
  color: ${config.colors.darkgrey};
  text-decoration: none;
  align-items: center;

  svg {
    margin-right: 16px;
  }

  &:visited {
    color: ${config.colors.darkgrey};
  }
`;

NavItem.Label = styled.div``;

export default NavItem;
