import '~/utils/polyfills';

import React from 'react';

import { render } from '~/utils/test-utils';

import { Example } from './Article.stories';

describe('Article example', () => {
  it('renders', () => {
    const { getByRole, getAllByRole } = render(<Example />);
    expect(getByRole('banner')).toBeInTheDocument();
    expect(getAllByRole('button', { name: 'Menü öffnen' })).toHaveLength(1);
    expect(getAllByRole('heading')).toHaveLength(4);
  });
});
