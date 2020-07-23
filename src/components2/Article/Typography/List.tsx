import React from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
  max-width: 520px;
  margin: 1em auto;
`;

const ListItem = styled.li`
  margin-bottom: 0.5em;
`;

interface ListProps {
  children: React.ReactNode;
  as?: 'ul' | 'ol';
  className?: string;
}

const List = ({ as = 'ul', children, className }: ListProps) => (
  <StyledList as={as} className={className}>
    {children}
  </StyledList>
);

List.Item = ListItem;

export default List;
