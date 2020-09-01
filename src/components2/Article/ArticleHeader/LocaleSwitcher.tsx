import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import config from '~/config';
import { RootState } from '~/store';
import { LocaleCode } from '~/types';
import { setLocale } from '~/AppState';
import { media } from '~/styles/utils';
import messages from '~/lang/common';

import ChatTranslate from './icons/chat-translate.svg';
import ChevronDown from './icons/chevron-down.svg';

const ChatTranslateIcon = styled(({ isOpen, ...props }) => (
  <ChatTranslate {...props} />
))`
  width: 24px;
  height: 24px;
  path {
    fill: ${({ isOpen }) => (isOpen ? config.colors.interaction : 'initial')};
  }
`;

const FormWrapper = styled(FormControl)`
  && {
    display: none;
    position: absolute;
    top: 0;
    right: 0;

    // Replaced by the locale switcher in the header bar for small screens
    ${media.m`
      display: block;
    `}
  }
`;

const StyledSelect = styled(Select)`
  && {
    :before {
      border-bottom: none;
    }
    margin: 0 1.5rem;

    .MuiSelect-root {
      padding-right: 2rem;
    }

    // These values are specific to the icon used
    .MuiSelect-icon {
      top: calc(50% - 4px);
      right: 0.5rem;
    }
  }
`;

const CurrentLocale = styled.div`
  margin-left: 5px;
`;

const ValueWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0 1rem 0.5rem;
`;

interface Props {
  locales: LocaleCode[];
}

const LocaleSwitcher = ({ locales }: Props) => {
  const intl = useIntl();
  const [isLocaleMenuOpen, setLocaleMenu] = useState(false);
  const activeLocale = useSelector((state: RootState) => state.AppState.locale);

  const dispatch = useDispatch();
  const handleChange = async (ev: React.ChangeEvent<{ value: LocaleCode }>) => {
    if (ev.target.value !== activeLocale) dispatch(setLocale(ev.target.value));
  };
  return (
    <FormWrapper>
      <StyledSelect
        labelId="locale-switcher-label"
        value={activeLocale}
        onChange={handleChange}
        onOpen={() => setLocaleMenu(true)}
        onClose={() => setLocaleMenu(false)}
        IconComponent={ChevronDown}
        renderValue={() => (
          <ValueWrapper>
            <ChatTranslateIcon isOpen={isLocaleMenuOpen} />{' '}
            <CurrentLocale id="locale-switcher-label">
              {intl.formatMessage(messages[`localeSwitcher-${activeLocale}`])}
            </CurrentLocale>
          </ValueWrapper>
        )}
      >
        {locales.map((l) => (
          <MenuItem value={l} key={l}>
            {intl.formatMessage(messages[`localeSwitcher-${l}`])}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormWrapper>
  );
};

export default LocaleSwitcher;
