import React, { ReactNode } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions
} from '@material-ui/core';

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
  className = null
}: Props) => (
  <Card raised className={className}>
    <CardHeader title={title} />
    <CardContent>{children}</CardContent>
    {onRetry && (
      <CardActions>
        <Button size="small" color="secondary" onClick={onRetry}>
          Nochmal versuchen
        </Button>
      </CardActions>
    )}
  </Card>
);

export default ApiNotice;
