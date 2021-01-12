import React, { ReactNode } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import styled from 'styled-components';
import config from '~/config';

const StyledCardHeader = styled(CardHeader)`
  & .MuiCardHeader-title {
    font-weight: bold;
    color: ${config.colors.white};
  }
  background-color: ${config.colors.change_4};
`;

type Props = {
  title?: string;
  children?: ReactNode;
  className?: string;
  onRetry?: () => any;
};

/**
 * ApiNotice is used for displaying messages about failed interactions with APIs
 * to the user
 */
const ApiNotice = ({
  children,
  title = 'Fehler',
  onRetry = null,
  className = null,
}: Props) => (
  <Card variant="outlined" className={className}>
    <StyledCardHeader title={title} />
    <CardContent>{children}</CardContent>
    {onRetry && (
      <CardActions>
        <Button startIcon={<ReplayIcon />} onClick={onRetry}>
          Nochmal versuchen
        </Button>
      </CardActions>
    )}
  </Card>
);

export default ApiNotice;
