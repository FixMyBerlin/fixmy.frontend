import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { MenuList, MenuItem, Collapse } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { setLocale } from '~/AppState';
import { LocaleCode } from '~/types';

type Props = {
  open: boolean;
  onSelection: () => any;
};

type OptionProps = {
  isActive: boolean;
};

const Wrapper = styled.div`
  text-align: right;
`;

const LocaleMenuLabel = styled.h2`
  font-size: 1rem;
  padding: 0 1rem;
`;

const LocaleMenuOption = styled(MenuItem)`
  && {
    justify-content: flex-end;
    font-weight: ${(props: OptionProps) =>
      props.isActive ? 'bold' : 'initial'};
  }
`;

const LocaleMenu = (props: Props) => {
  const dispatch = useDispatch();
  const activeLocale = useSelector((state: RootState) => state.AppState.locale);
  const handleClick = (locale: LocaleCode) => {
    props.onSelection();
    if (locale !== activeLocale) dispatch(setLocale(locale));
  };
  return (
    <Collapse in={props.open}>
      <Wrapper>
        <LocaleMenuLabel id="localeMenuLabel">
          <FormattedMessage
            id="components.article.localeSwitcher.label"
            defaultMessage="andere Sprache wählen"
          />
          :
        </LocaleMenuLabel>
        <MenuList aria-labelledby="localeMenuLabel">
          <LocaleMenuOption
            onClick={() => handleClick('de')}
            isActive={activeLocale === 'de'}
          >
            <FormattedMessage
              id="components.article.localeSwitcher.german"
              defaultMessage="Deutsch"
            />
          </LocaleMenuOption>
          <LocaleMenuOption
            onClick={() => handleClick('en')}
            isActive={activeLocale === 'en'}
          >
            <FormattedMessage
              id="components.article.localeSwitcher.english"
              defaultMessage="Englisch"
            />
          </LocaleMenuOption>
          <LocaleMenuOption
            onClick={() => handleClick('es')}
            isActive={activeLocale === 'es'}
          >
            <FormattedMessage
              id="components.article.localeSwitcher.spanish"
              defaultMessage="Spanisch"
            />
          </LocaleMenuOption>
        </MenuList>
      </Wrapper>
    </Collapse>
  );
};

export default LocaleMenu;
