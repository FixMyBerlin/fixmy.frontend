import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import SuggestionList from './SuggestionList';
import { fetchSuggestions } from './apiService';

class AutocompleteGeocoder extends PureComponent {
  static propTypes = {
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
    debounceTime: PropTypes.number
  }

  static defaultProps = {
    onInputFocus: () => { },
    onInputBlur: () => { },
    onSearchStart: () => { },
    searchStringMinLength: 3,
    debounceTime: 1000
  }

  state = {
    suggestions: []
  }

  clearSuggestions = () => this.setState({ suggestions: [] });

  geocodeSearchPhrase = (searchPhrase) => {
    this.clearSuggestions();
    fetchSuggestions(searchPhrase)
      .then(suggestions => this.setState({ suggestions }))
      .catch(this.handleError);
  }

  onSuggestionPick = ({ coords, address }) => {
    this.clearSuggestions();
    this.props.onLocationPick({ coords, address });
  }

  handleError = (error) => {
    this.clearSuggestions();
    console.error(`Error in AutocompleteGeocoder: ${error}`);
    this.props.onError('Service nicht erreichbar. Bitte versuch den Standort über die Karte zu finden.');
  }

  onEnterPress = () => {
    if (this.state.suggestions.length === 1) {
      this.takeFirstSuggestion();
    }
  }

  takeFirstSuggestion = () => {
    this.onSuggestionPick(this.state.suggestions[0]);
  }

  render() {
    return (
      <Fragment>
        <SearchBar
          onInputFocus={this.props.onInputFocus}
          onInputBlur={this.props.onInputBlur}
          onSearchEnter={this.geocodeSearchPhrase}
          onSearchStart={this.props.onSearchStart}
          onSearchReset={this.clearSuggestions}
          onEnterKeyPress={this.onEnterPress}
          searchStringMinLength={this.props.searchStringMinLength}
          debounceTime={this.props.debounceTime}
        />

        <SuggestionList
          suggestions={this.state.suggestions}
          onSuggestionPick={this.onSuggestionPick}
        />
      </Fragment>
    );
  }
}

export default AutocompleteGeocoder;
