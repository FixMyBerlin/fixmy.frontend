import { MenuList, MenuItem, Collapse } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setLocale } from '~/AppState';
import messages from '~/lang/common';
import { useTypedSelector } from '~/store';
import { LocaleCode } from '~/types';

type Props = {
  locales: LocaleCode[];
  open: boolean;
  onSelection: () => any;
};

const Wrapper = styled.div`
  text-align: right;
`;

const LocaleMenuLabel = styled.h2`
  font-size: 1rem;
  padding: 0 1rem;
`;

const LocaleMenuOption = styled(({ isActive, ...props }) => (
  <MenuItem {...props} />
))`
  && {
    justify-content: flex-end;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'initial')};
  }
`;

const LocaleMenu = (props: Props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const activeLocale = useTypedSelector((state) => state.AppState.locale);
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
          {props.locales.map((l) => (
            <LocaleMenuOption
              key={l}
              onClick={() => handleClick(l)}
              isActive={activeLocale === l}
            >
              {intl.formatMessage(messages[`localeSwitcher-${l}`])}
            </LocaleMenuOption>
          ))}
        </MenuList>
      </Wrapper>
    </Collapse>
  );
};

export default LocaleMenu;
