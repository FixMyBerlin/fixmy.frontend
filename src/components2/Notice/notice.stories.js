import { Container } from '@material-ui/core';
// Disabled storybook for now
// eslint-disable-next-line import/no-unresolved
import { action } from '@storybook/addon-actions';
import React from 'react';

import { ApiNotice as ApiNoticeComponent, Notice } from '.';

export default {
  title: 'Generic / Notice',
  decorators: [(fn) => <Container maxWidth="md">{fn()}</Container>],
  component: Notice,
};

export const Plain = () => <Notice>Dies ist ein Hinweis</Notice>;

export const ApiNotice = () => (
  <ApiNoticeComponent>
    Dies ist ein Hinweis für eine fehlgeschlagene API-Abfrage
  </ApiNoticeComponent>
);

export const ApiNoticeRetry = () => (
  <ApiNoticeComponent onRetry={action('clicked retry')}>
    Dies ist ein Hinweis für eine fehlgeschlagene API-Abfrage
  </ApiNoticeComponent>
);
