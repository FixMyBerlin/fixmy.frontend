import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import faker from 'faker';

import FaqItem from '../FaqItem';

describe('an FAQ item', () => {
  // use a shared setup method,
  // see https://medium.com/@noahpeden/react-testing-library-rtl-set-up-and-best-practices-96dcf3be54
  const setupItem = (initAsOpen = false) => {
    const heading = faker.random.word();
    const text = faker.random.word();
    const props = {
      heading,
      text,
      open: initAsOpen
    };

    const { getByText } = render(<FaqItem {...props} />);

    return {
      heading,
      text,
      getByText
    };
  };

  it('toggles the collapsed state when clicked', () => {
    const { heading, text, getByText } = setupItem(false);
    const headingEl = getByText(heading);
    const textEl = getByText(text);

    expect(headingEl).toBeVisible();
    expect(textEl).not.toBeVisible(); // FIXME: this fails since the element is visible

    fireEvent.click(headingEl);
    expect(textEl).toBeVisible();

    fireEvent.click(headingEl);
    expect(textEl).not.toBeVisible();
  });
});
