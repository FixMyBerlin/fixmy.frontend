import React from 'react';
import { Container } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import Notice, { ApiNotice as ApiNoticeComponent } from '.';

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
