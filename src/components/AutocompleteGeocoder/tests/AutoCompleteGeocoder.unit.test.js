import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AutocompleteGeocoder from '~/components/AutocompleteGeocoder';
import * as apiService from '~/components/AutocompleteGeocoder/apiService';

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

    return {
      initProps: props,
      debug,
      container,
      baseElement,
      inputElement
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
    it('invokes the onSearchStart handler once the first search string has been entered', async () => {
      const { initProps, inputElement } = setup();
      // simulate that user is typing fast
      await userEvent.type(inputElement, '1');
      await userEvent.type(inputElement, '2');

      expect(initProps.onSearchStart).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetching suggestions', () => {
    const SEARCH_STRING = 'Hauptstraße'; // also used in the api response mock
    it('renders the list of suggestions', async () => {
      const { inputElement } = setup();
      // simulate that the user initially types a search string
      userEvent.type(inputElement, SEARCH_STRING);
      const suggestionList = await screen.findByTestId(
        'autocomplete-geocoder-suggestion-list',
        {},
        { timeout: 15000 } // FIXME: find out why the timeout is needed → msw should resolve immediately
      );
      expect(suggestionList).toBeDefined();
    });
    it('suggests three addresses for a given search string', async () => {
      const { inputElement } = setup();
      userEvent.type(inputElement, SEARCH_STRING);

      const suggestionItems = await screen.findAllByText(SEARCH_STRING, {
        exact: false
      }, { timeout: 15000 });

      expect(suggestionItems).toHaveLength(3);
    });
    it('invokes the onLocationPick handler if the user clicks/taps on a suggestion', async () => {
      const { inputElement, initProps } = setup();
      userEvent.type(inputElement, SEARCH_STRING);
      const [firstSuggestion] = await screen.findAllByText(SEARCH_STRING, {
        exact: false
      }, { timeout: 15000 });
      fireEvent.click(firstSuggestion);

      expect(initProps.onLocationPick).toHaveBeenCalled();
    });
    it('buffers api calls (waits for the user to type, then fetches suggestions)', async () => {
      const fetchSuggestionsSpy = jest.spyOn(apiService, 'fetchSuggestions');
      const { inputElement } = setup();

      /* simulate fast user input with not delay in between strokes */
      userEvent.type(inputElement, 'abcd');
      // wait for suggestions to render
      await screen.findAllByText(SEARCH_STRING, {
        exact: false
      }, { timeout: 15000 });

      // only a single a request should be fired once the user is done typing
      expect(fetchSuggestionsSpy).toHaveBeenCalledTimes(1);

      fetchSuggestionsSpy.mockClear();

      /* simulate slow user input */

      const slowInput = 'defg';
      await userEvent.type(inputElement, slowInput, {
        delay: 2000
      });

      // FIXME: since the last stroke goes through async processing (debouncing) we can't exect right away, the last request does not get unnoticed

      // each stroke should have triggered a request
      expect(fetchSuggestionsSpy).toHaveBeenCalledTimes(slowInput.length);

      fetchSuggestionsSpy.mockClear();
    });
  });
});
