import { Card, CardContent, makeStyles } from '@material-ui/core';
import debug from 'debug';
import React, { useEffect, useState } from 'react';

import { useTypedSelector } from '~/store';
import { DistrictConfig } from '~/types';

import api from '../api';
import config from '../config';
import { EventListing } from '../types';
import { eventDate } from '../utils';

const logger = debug('fmc:Gastro:EventCalendar');

const useStyles = makeStyles({
  root: {
    'margin-top': '1em',
    '&:nth-of-type(1)': {
      'margin-top': '0',
    },
  },
  infoline: {
    color: config.colors.darkgrey,
  },
});

const Listing = (data: EventListing) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <p className={classes.infoline}>
          {/* // @ts-ignore */}
          Am {eventDate(data)} von {data.event_start.slice(0, -3)} Uhr bis{' '}
          {data.event_end.slice(0, -3)} Uhr. <br />
          {data.area_category === 'park'
            ? 'Veranstaltung im Park: '
            : 'Veranstaltung auf Parkflächen: '}
          {data.location}
        </p>
      </CardContent>
    </Card>
  );
};

export const EventCalendar = () => {
  const [eventList, setEventList] = useState<EventListing[]>(null);
  const districtConfig: DistrictConfig = useTypedSelector(
    ({ AppState }) => AppState.district
  );

  if (!districtConfig) return null;

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        setEventList(await api.getEvents(districtConfig));
      } catch (err) {
        logger(err);
        setEventList([]);
      }
    };
    asyncEffect();
  }, []);

  if (eventList == null) return <p>Lade Veranstaltungen...</p>;

  return (
    <div>
      <h2>Nächste Veranstaltungen</h2>
      {eventList.length === 0 && <p>Noch keine Veranstaltungen geplant</p>}
      {eventList.slice(0, 5).map((data) => (
        <Listing key={`listing-${data.id}`} {...data} />
      ))}
    </div>
  );
};
