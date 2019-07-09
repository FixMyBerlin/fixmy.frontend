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
    onSearchStart: PropTypes.func,
    onLocationPick: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }

  static defaultProps = {
    onSearchStart: () => { }
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

  render() {
    return (
      <Fragment>
        <SearchBar
          onSearchEnter={this.geocodeSearchPhrase}
          onSearchStart={this.props.onSearchStart}
          onSearchReset={this.clearSuggestions}
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
