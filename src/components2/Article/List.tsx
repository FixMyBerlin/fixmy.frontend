import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  max-width: 520px;
  margin: 1em auto;
`;
const ListItem = styled.li`
  margin-bottom: 0.5em;
`;

interface ListProps {
  items: string[];
  as?: 'ul' | 'ol';
  className?: string;
}

export default ({ as = 'ul', items, className }: ListProps) => {
  return (
    <List as={as} className={className}>
      {items.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
};
