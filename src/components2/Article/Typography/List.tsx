import React from 'react';
import styled from 'styled-components';
import { media } from '~/styles/utils';

const StyledUl = styled.ul`
  max-width: 518px;
  margin: 1em auto;

  ${media.l`
    max-width: 598px;
  `}
`;

const StyledOl = styled.ol`
  max-width: 518px;
  margin: 1em auto;

  ${media.l`
    max-width: 598px;
  `}
`;

const ListItem = styled.li`
  margin-bottom: 0.5em;
`;

interface ListProps {
  children: React.ReactNode;
  ordered?: boolean;
  className?: string;
}

const List = ({ children, className, ordered }: ListProps) => {
  const Container = ordered ? StyledOl : StyledUl;
  return <Container className={className}>{children}</Container>;
};

List.Item = ListItem;

export default List;
