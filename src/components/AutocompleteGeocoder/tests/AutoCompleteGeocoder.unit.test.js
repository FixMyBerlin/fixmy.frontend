import AutocompleteGeocoder from '..';
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

describe('<AutoCompleteGeocoder />', () => {
  // use setup method described as best practice in
  // https://medium.com/@noahpeden/react-testing-library-rtl-set-up-and-best-practices-96dcf3be54
  const setup = () => {
    const props = {
      onLocationPick: jest.fn(),
      onError: jest.fn(),
      onInputFocus: jest.fn(),
      onSearchStart: jest.fn(),
      onInputBlur: jest.fn(),
      searchStringMinLength: 4
    };
    const {
      getByText,
      getByPlaceholderText,
      container,
      baseElement,
      debug
    } = render(<AutocompleteGeocoder {...props} />);

    return {
      initProps: props,
      queries: {
        getByText,
        getByPlaceholderText,
      },
      debug,
      container,
      baseElement
    };
  };

  it('invokes callbacks when being focused / blurred', () => {
    const { initProps, container } = setup();
    expect(initProps.onInputFocus).toHaveBeenCalledTimes(0);
    expect(initProps.onInputBlur).toHaveBeenCalledTimes(0);
    const input = container.querySelector('input');
    // focus input
    act(() => input.focus()); // await DOM processing, see https://github.com/testing-library/react-testing-library/issues/276#issuecomment-473392827
    expect(initProps.onInputFocus).toHaveBeenCalledTimes(1);
    // loose focus on input
    fireEvent.blur(input);
    expect(initProps.onInputBlur).toHaveBeenCalledTimes(1);
  });
  it('shows a list of addresses for a given search string', () => {
    const { initProps, queries, container } = setup();
    // TODO: mock apiService -> get fixtures
  });
});