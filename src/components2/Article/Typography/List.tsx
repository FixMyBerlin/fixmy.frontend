import React from 'react';
import styled from 'styled-components';
import { media } from '~/styles/utils';

const StyledUl = styled.ul`
  max-width: 518px;
  margin: 1em auto;
  padding-left: 1em;

  ${media.m`
    padding-left: 2em;
  `}

  ${media.l`
    max-width: 598px;
  `}
`;

const StyledOl = styled.ol`
  max-width: 518px;
  margin: 1em auto;
  padding-left: 1em;

  ${media.m`
    padding-left: 2em;
  `}

  ${media.l`
    max-width: 598px;
  `}
`;

const ListItem = styled.li`
  margin-bottom: 0.8em;
  line-height: 1.3;
  padding-left: 1em;

  ${media.m`
    padding-left: .5em;
  `}
`;

type Props = React.FC<{
  ordered?: boolean;
  className?: string;
  children: React.ReactNode;
}> & { Item: React.FC };

export const List: Props = ({ className, ordered, children }) => {
  const Container = ordered ? StyledOl : StyledUl;
  return <Container className={className}>{children}</Container>;
};

List.Item = ListItem;
