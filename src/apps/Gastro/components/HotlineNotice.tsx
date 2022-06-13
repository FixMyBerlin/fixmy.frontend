import {
  Card,
  CardActions,
  CardContent,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import React from 'react';
import { Link } from '~/components2/Link';

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
          Auf der{' '}
          <a
            className="external"
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.berlin.de/ba-friedrichshain-kreuzberg/politik-und-verwaltung/aemter/strassen-und-gruenflaechenamt/artikel.988770.php"
          >
            Infoseite des Bezirksamts
          </a>{' '}
          werden die häufigsten Fragen beantwortet.
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
      <CardContent>
        <Typography>
          Kontaktieren Sie{' '}
          <Link href="mailto:gastro@ba-fk.berlin.de">
            gastro@ba-fk.berlin.de
          </Link>{' '}
          für Rückfragen.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HotlineNotice;
