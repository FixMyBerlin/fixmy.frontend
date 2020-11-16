import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';

import SearchBar from './SearchBar';
import SuggestionList from './SuggestionList';
import { fetchSuggestions } from './apiService';

const logger = debug('fmc:AutocompleteGeocoder');

class AutocompleteGeocoder extends PureComponent {
  static ERR_SERVICE_UNAVAILABLE =
    'Service nicht erreichbar. Bitte versuch den Standort über die Karte zu finden.';

  isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  clearSuggestions = () => this.setState({ suggestions: [] });

  geocodeSearchPhrase = (searchPhrase) => {
    this.clearSuggestions();
    fetchSuggestions(searchPhrase)
      .then((suggestions) => {
        if (!this.isMounted) return;
        this.setState({ suggestions });
      })
      .catch(this.handleError);
  };

  onSuggestionPick = ({ coords, address }) => {
    this.clearSuggestions();
    this.props.onLocationPick({ coords, address });
  };

  handleError = (error) => {
    this.clearSuggestions();
    logger(`Error in AutocompleteGeocoder: ${error}`);
    this.props.onError(AutocompleteGeocoder.ERR_SERVICE_UNAVAILABLE);
  };

  onEnterPress = () => {
    if (this.state.suggestions.length === 1) {
      this.takeFirstSuggestion();
    }
  };

  takeFirstSuggestion = () => {
    this.onSuggestionPick(this.state.suggestions[0]);
  };

  render() {
    return (
      <>
        <SearchBar
          onInputFocus={this.props.onInputFocus}
          onInputBlur={this.props.onInputBlur}
          onSearchEnter={this.geocodeSearchPhrase}
          onSearchStart={this.props.onSearchStart}
          onSearchReset={this.clearSuggestions}
          onEnterKeyPress={this.onEnterPress}
          searchStringMinLength={this.props.searchStringMinLength}
          debounceTime={this.props.debounceTime}
          label={this.props.label}
        />
        {this.state.suggestions.length && (
          <SuggestionList
            suggestions={this.state.suggestions}
            onSuggestionPick={this.onSuggestionPick}
          />
        )}
      </>
    );
  }
}

AutocompleteGeocoder.propTypes = {
  /**
   * Called when search Input gets Focus.
   */
  onInputFocus: PropTypes.func,
  /**
   *Called when search Input looses Focus.
   */
  onInputBlur: PropTypes.func,
  /**
   * Called when the first search String is compiled. Ment to set a flag in the consuming component,
   * e.g. to hide a Tooltip.
   */
  onSearchStart: PropTypes.func,
  /**
   * Called with the coordinates object {lat, lng} and address string of the picked location.
   */
  onLocationPick: PropTypes.func.isRequired,
  /**
   * Error callback.
   */
  onError: PropTypes.func.isRequired,
  /**
   * Minimum input length that triggers this.props.onSearchEnter()
   * e.g. to clear the results list.
   */
  searchStringMinLength: PropTypes.number,
  /**
   * Amount of milliseconds the invokation of this.props.onSearchEnter() isdelayed
   * since its last invocation.
   */
  debounceTime: PropTypes.number,

  label: PropTypes.string
};

AutocompleteGeocoder.defaultProps = {
  onInputFocus: () => {},
  onInputBlur: () => {},
  onSearchStart: () => {},
  searchStringMinLength: 3,
  debounceTime: 1000,
  label: null
};

export default AutocompleteGeocoder;
