import {
  Card,
  CardActions,
  CardContent,
  Button,
  Link,
  makeStyles,
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import React from 'react';

const useStyles = makeStyles({
  content: {
    paddingBottom: 0,
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
});

const HotlineNotice = () => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.content}>
        <h3>Haben Sie noch Fragen?</h3>
        <p>
          Bitte nutzen Sie auch unsere telefonische Beratung:
          <br />
          Dienstag - Freitag, 9:30 Uhr - 11:30 Uhr
        </p>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          color="secondary"
          startIcon={<PhoneIcon />}
          href="tel:004930902984216"
        >
          030 - 90 298 4216
        </Button>
      </CardActions>
    </Card>
  );
};

export default HotlineNotice;
