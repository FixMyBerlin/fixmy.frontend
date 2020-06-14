import React from 'react';
import { render, fireEvent, act, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import AutocompleteGeocoder from '~/components/AutocompleteGeocoder';
import { fetchSuggestions } from '~/components/AutocompleteGeocoder/apiService';
import mockSuggesions from './mockSuggestions.json';

// intercept api requests, see https://kentcdodds.com/blog/stop-mocking-fetch
const SEARCH_STRING = 'Hauptstraße';
const server = setupServer(
  rest.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${SEARCH_STRING}.json`,
    (req, res, ctx) => {
      return res(ctx.json(mockSuggesions));
    }
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
    const { container, baseElement, debug } = render(
      <AutocompleteGeocoder {...props} />
    );

    const inputElement = container.querySelector('input');
    const enterValueInInput = (value) =>
      fireEvent.change(inputElement, { target: { value } });

    return {
      initProps: props,
      debug,
      container,
      baseElement,
      inputElement,
      enterValueInInput
    };
  };

  describe('basic event listeners', () => {
    it('invokes callbacks when being focused / blurred', () => {
      const { initProps, inputElement } = setup();
      expect(initProps.onInputFocus).toHaveBeenCalledTimes(0);
      expect(initProps.onInputBlur).toHaveBeenCalledTimes(0);
      // focus input
      act(() => inputElement.focus()); // await DOM processing, see https://github.com/testing-library/react-testing-library/issues/276#issuecomment-473392827
      expect(initProps.onInputFocus).toHaveBeenCalledTimes(1);
      // loose focus on input
      fireEvent.blur(inputElement);
      expect(initProps.onInputBlur).toHaveBeenCalledTimes(1);
    });
    it('invokes the onSearchStart handler once the first search string has been entered', () => {
      const { initProps, enterValueInInput } = setup();
      enterValueInInput('abc');
      enterValueInInput('');
      enterValueInInput('abc');
      expect(initProps.onSearchStart).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetching suggestions', () => {
    let componentProps;
    beforeAll(() => {
      const { enterValueInInput, initProps } = setup();
      componentProps = initProps;
      enterValueInInput(SEARCH_STRING);
    });
    it('suggests three addresses for a given search string', async () => {
      await waitFor(() => expect(fetchSuggestions).toHaveBeenCalledTimes(1), {
        timeout: 5000
      });
      const suggestions = await screen.findAllByText(SEARCH_STRING);
      expect(suggestions).toHaveLength(3);
    });
    it('invokes the onLocationPick handler if the user clicks/taps on a suggestion', async () => {
      const [firstSuggestion] = await screen.findAllByText(SEARCH_STRING);
      fireEvent.click(firstSuggestion);
      expect(componentProps.onLocationPick.toHaveBeenCalled());
    });
  });
});
