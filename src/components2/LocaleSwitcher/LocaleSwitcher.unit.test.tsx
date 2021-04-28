import React from 'react';

import { LocaleCode } from '~/types';
import { render } from '~/utils/test-utils';

import { LocaleSwitcher } from '.';

describe('<LocaleSwitcher />', () => {
  it('renders', () => {
    const locales: LocaleCode[] = ['en'];
    render(<LocaleSwitcher locales={locales} />);
  });
  it.todo('lets users switch the locale');
});
