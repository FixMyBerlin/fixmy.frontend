
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ListItem = styled.li`
  cursor: pointer;
  list-style-type: none;
  padding: 1em;
`;

const Suggestion = ({ address, onSuggestionPick }) => {
  const addressParts = address.split(`${config.map.geocoderHighlightSeperator}`)
    .map((val, i) => (i % 2 ?
      (<b key={`highlight-${val}`}>{val}</b>) :
      (<span key={`addresspart-${val}`}>{val}</span>)));

  return (
    <ListItem onClick={onSuggestionPick}>{addressParts}</ListItem>
  );
};

Suggestion.propTypes = {
  address: PropTypes.string.isRequired, // e.g. Deutschland, <b>Berl</b>in, <b>Berl</b>in, 10117, <b>Berl</b>in, <b>Pariser</b> Platz <b>1</b>,
  onSuggestionPick: PropTypes.func.isRequired
};


export default Suggestion;
