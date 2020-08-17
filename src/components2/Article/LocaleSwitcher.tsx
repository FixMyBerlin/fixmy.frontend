import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Button from '~/components2/Button';
import { setLocale } from '~/AppState';

import Paragraph from './Typography/Paragraph';
import { RootState } from '~/store';

const LocaleSwitcher = () => {
  const dispatch = useDispatch();
  const activeLocale = useSelector((state: RootState) => state.AppState.locale);
  return (
    <Paragraph>
      <Button
        flat
        onClick={() => dispatch(setLocale('en'))}
        disabled={activeLocale === 'en'}
      >
        <FormattedMessage
          id="components.article.localeSwitcher.english"
          defaultMessage="Englisch"
        />
      </Button>
      <Button
        flat
        onClick={() => dispatch(setLocale('es'))}
        disabled={activeLocale === 'es'}
      >
        <FormattedMessage
          id="components.article.localeSwitcher.spanish"
          defaultMessage="Spanisch"
        />
      </Button>
      <Button
        flat
        onClick={() => dispatch(setLocale('de'))}
        disabled={activeLocale === 'de'}
      >
        <FormattedMessage
          id="components.article.localeSwitcher.german"
          defaultMessage="Deutsch"
        />
      </Button>
    </Paragraph>
  );
};

export default LocaleSwitcher;
