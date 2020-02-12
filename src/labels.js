import React from 'react';
import config from '~/config';

export const districts = [
  'Charlottenburg-Wilmersdorf',
  'Friedrichshain-Kreuzberg',
  'Lichtenberg',
  'Marzahn-Hellersdorf',
  'Mitte',
  'Neukölln',
  'Pankow',
  'Reinickendorf',
  'Spandau',
  'Steglitz-Zehlendorf',
  'Tempelhof-Schöneberg',
  'Treptow-Köpenick'
];

export const homeLabels = {
  title: `Hi, das ist ${config.siteTitle}`,
  intro: (
    <>
      Nimm an unserer aktuellen Umfrage teil, dem Berliner Straßencheck. Hier
      kannst du uns sagen, wie die Berliner Straßen sicher für alle werden
      können.
    </>
  ),
  button: 'Worum geht es hier genau?',
  reportsButton: 'Jetzt Radbügel melden',
  mapButton: 'Gehe zur Planungskarte',
  katasterButton: 'Umfrage beginnen'
};

export const errorLabels = {
  'Unable to log in with provided credentials.': 'Ungültiges Passwort.'
};

export default {
  districts,
  homeLabels,
  errorLabels
};
