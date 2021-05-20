import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import config from '~/config';

const ListItem = styled.li`
  cursor: pointer;
  list-style-type: none;
  padding: 1em;

  &:hover {
    background: #f2f2f2;
  }
`;

const Suggestion = ({ address, onSuggestionPick }) => {
  const addressParts = address
    .split(`${config.apps.map.geocoderHighlightSeperator}`)
    .map((val, i) =>
      i % 2 ? (
        <b key={`highlight-${val}`}>{val}</b>
      ) : (
        <span key={`addresspart-${val}`}>{val}</span>
      )
    );

  return (
    <ListItem data-cy="map-address-suggestion" onClick={onSuggestionPick}>
      {addressParts}
    </ListItem>
  );
};

Suggestion.propTypes = {
  address: PropTypes.string.isRequired, // e.g. Deutschland, <b>Berl</b>in, <b>Berl</b>in, 10117, <b>Berl</b>in, <b>Pariser</b> Platz <b>1</b>,
  onSuggestionPick: PropTypes.func.isRequired,
};

export default Suggestion;
