import { waitFor } from '@testing-library/dom';
import { render, act, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import React from 'react';

import AutocompleteGeocoder from '~/components/AutocompleteGeocoder';
import * as apiService from '~/components/AutocompleteGeocoder/apiService';
import { parseSuggestion } from '~/components/AutocompleteGeocoder/apiService';

import mockedSuggestions from '../../../../jest/msw/mockData/mockLocationSuggestions.json';

import { mswServer } from '~/../jest/msw/mswServer';

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
      searchStringMinLength: 4,
      debounceTime: 1,
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
      inputElement,
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

  describe('fetching and picking suggestions', () => {
    const SEARCH_STRING = 'Hauptstraße'; // also used in the api response mock
    const waitForElementOptions = { timeout: 15000 };
    const selectorMatchOptions = { exact: false };
    const findAllBySearchString = async () =>
      screen.findAllByText(
        SEARCH_STRING,
        selectorMatchOptions,
        waitForElementOptions
      );

    const fetchSuggestionsSpy = jest.spyOn(apiService, 'fetchSuggestions');

    afterEach(() => {
      fetchSuggestionsSpy.mockClear();
    });

    it('renders the list of suggestions', async () => {
      const { inputElement } = setup();
      // simulate that the user initially types a search string
      userEvent.type(inputElement, SEARCH_STRING);
      // look for search result list by using its aria role, thereby being patient until it renders
      const suggestionList = await screen.findByRole('list');

      expect(suggestionList).toBeDefined();
    });
    it('suggests three addresses for a given search string', async () => {
      const { inputElement } = setup();
      userEvent.type(inputElement, SEARCH_STRING);
      const suggestionItems = await findAllBySearchString();

      expect(suggestionItems).toHaveLength(3);
    });
    it('invokes the onLocationPick handler with coords and address when the user clicks/taps on a suggestion', async () => {
      // extract properties from mock data which is also responded to the request
      const [mockedFirstSuggestion] = mockedSuggestions.features;
      // eslint-disable-next-line camelcase
      const { place_name_de, center } = mockedFirstSuggestion;
      const { address, coords } = parseSuggestion({ place_name_de, center });

      // get search results, then click first item
      const { inputElement, initProps } = setup();
      userEvent.type(inputElement, SEARCH_STRING);
      const [firstSuggestion] = await findAllBySearchString();
      fireEvent.click(firstSuggestion);

      // match displayed content with mock data entries
      expect(initProps.onLocationPick).toHaveBeenCalledWith({
        coords,
        address,
      });
    });
    it('buffers api calls (waits for the user to type, then fetches suggestions)', async () => {
      const { inputElement, initProps } = setup();

      /* simulate fast user input with not delay in between strokes */

      await userEvent.type(inputElement, 'abcd');
      // wait for async logic to kick in,
      // only a single a request should be fired once the user is done typing
      await waitFor(() => expect(fetchSuggestionsSpy).toHaveBeenCalledTimes(1));

      fetchSuggestionsSpy.mockClear();

      /* simulate slow user input */

      const slowInput = 'defg';
      await userEvent.type(inputElement, slowInput, {
        delay: initProps.debounceTime + 10,
      });

      // each stroke should have triggered a request
      await waitFor(() =>
        expect(fetchSuggestionsSpy).toHaveBeenCalledTimes(slowInput.length)
      );
    });
    it(
      'invokes the onLocationPick handler' +
        ' when the user presses enter if there is only one search result',
      async () => {
        // extract first suggested item from mock
        const [mockedFirstSuggestion] = mockedSuggestions.features;
        // eslint-disable-next-line camelcase
        const { place_name_de, center } = mockedFirstSuggestion;
        const { address, coords } = parseSuggestion({ place_name_de, center });

        // set up msw response to only return one feature
        const mockedResponse = { ...mockedSuggestions };
        mockedResponse.features = mockedResponse.features.slice(0, 1);
        mswServer.use(
          rest.get(
            new RegExp('^https://api.mapbox.com/geocoding/v5/mapbox.places'),
            (req, res, ctx) => {
              return res(ctx.json(mockedResponse));
            }
          )
        );

        // render, fetch suggestions
        const { inputElement, initProps } = setup();
        await userEvent.type(inputElement, SEARCH_STRING);
        await findAllBySearchString();

        // simulate that user presses enter
        await userEvent.type(inputElement, '{enter}');

        await waitFor(() =>
          expect(initProps.onLocationPick).toHaveBeenCalledWith({
            address,
            coords,
          })
        );

        // teardown: reset msw handler
        mswServer.resetHandlers();
      }
    );
  });

  describe('cancelling a search', () => {
    it('empties the search input and clears the result list on reset button press', async () => {
      const SEARCH_STRING = 'Hauptstraße';
      // get search results as usual
      const { inputElement } = setup();
      userEvent.type(inputElement, SEARCH_STRING);
      await screen.findByRole('list');

      // make sure our checks work
      expect(inputElement.value).toBe(SEARCH_STRING);
      expect(screen.queryByRole('list')).toBeInTheDocument();

      // reset UI by clicking the respective button
      const resetButton = screen.getByRole('button');
      userEvent.click(resetButton);

      expect(inputElement.value).toBe('');
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    beforeAll(() => {
      mswServer.use(
        rest.get(
          new RegExp('^https://api.mapbox.com/geocoding/v5/mapbox.places'),
          (req, res, ctx) => {
            return res(
              ctx.status(403),
              ctx.json({
                errorMessage: 'Not Authorized',
              })
            );
          }
        )
      );
    });

    it('invokes the onError callback if the API request fails', async () => {
      const SEARCH_STRING = 'Hauptstraße';
      // get search results as usual
      const { inputElement, initProps } = setup();
      userEvent.type(inputElement, SEARCH_STRING);

      await waitFor(() => {
        expect(initProps.onError).toHaveBeenCalledWith(
          AutocompleteGeocoder.ERR_SERVICE_UNAVAILABLE
        );
      });
    });

    afterEach(() => mswServer.resetHandlers());
  });
});
