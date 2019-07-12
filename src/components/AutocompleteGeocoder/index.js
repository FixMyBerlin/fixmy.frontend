import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';
import SuggestionList from './SuggestionList';
import Error from './Error';
import { getCoordinatesByLocationId, fetchSuggestions } from './api';
import { addError } from '~/pages/Reports/ReportsState';

class AutocompleteGeocoder extends PureComponent {
  static propTypes = {
     /**
     * Called when the first search String is compiled. Ment to set a flag in the consuming component,
     * e.g. to hide a Tooltip.
     */
    onSearchStart: PropTypes.func,
     /**
     * Called with the coordinates object {lat, lng} of the picked location.
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
    onSearchStart: () => { },
    searchStringMinLength: 3,
    debounceTime: 1000
  }

  state = {
    error: null,
    suggestions: []
  }

  clearSuggestions = () => this.setState({ suggestions: [] });

  geocodeSearchPhrase = (searchPhrase) => {
    this.clearSuggestions();
    fetchSuggestions(searchPhrase)
      .then(({ suggestions }) => this.setState({ suggestions }))
      .catch(this.handleError);
  }

  onSuggestionPick = ({ locationId }) => {
    this.clearSuggestions();
    getCoordinatesByLocationId(locationId)
      .then(this.props.onLocationPick)
      .catch(this.handleError);
  }

  handleError = (error) => {
    this.clearSuggestions();
    this.setState({ error });
    this.props.onError(error);
  }

  onEnterPress = () => {
    if (this.state.suggestions.length === 1) {
      this.takeFirstSuggestion();
    }
  }

  takeFirstSuggestion = () => {
    const { locationId } = this.state.suggestions[0];
    this.onSuggestionPick({ locationId });
  }

  render() {
    return (
      <Fragment>
        <SearchBar
          onSearchEnter={this.geocodeSearchPhrase}
          onSearchStart={this.props.onSearchStart}
          onSearchReset={this.clearSuggestions}
          onEnterKeyPress={this.onEnterPress}
          searchStringMinLength={this.props.searchStringMinLength}
          debounceTime={this.props.debounceTime}
        />

        {this.state.error && (
          <Error message={this.state.error.message} />
        )}

        <SuggestionList
          suggestions={this.state.suggestions}
          onSuggestionPick={this.onSuggestionPick}
        />
      </Fragment>
    );
  }
}

export default connect(null, {
  onError: addError
})(AutocompleteGeocoder);
