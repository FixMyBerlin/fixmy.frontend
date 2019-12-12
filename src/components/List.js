import styled from 'styled-components';

import Text from '~/components/Text';

export const ListComponent = styled.ul`
  padding: 0 0 0 22px;
  margin: 0 0 19px;
  list-style: none;
`;

export const ListItem = styled(Text).attrs(() => ({ as: 'li' }))`
  margin: 0;

  &:before {
    content: '•';
    color: white;
    display: block;
    width: 10.4px;
    background-color: #d8d8d6;
    height: 10.4px;
    border-radius: 11px;
    position: relative;
    right: 25px;
    top: 16px;
  }
`;

ListComponent.ListItem = ListItem;

export default ListComponent;
