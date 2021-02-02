import React from 'react';
import { render } from '~/utils/test-utils';
import { LocaleSwitcher } from '.';
import { LocaleCode } from '~/types';

describe('<LocaleSwitcher />', () => {
  it('renders', () => {
    const locales: LocaleCode[] = ['en'];
    render(<LocaleSwitcher locales={locales} />);
  });
  it.todo('lets users switch the locale');
});
