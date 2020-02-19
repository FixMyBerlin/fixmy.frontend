import React from 'react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import PropTypes from 'prop-types';

import config from '~/pages/Reports/config';
import Text from '~/components/Text';

const StyledText = styled(Text)`
  font-size: 16px;
  border-bottom: 0.5px solid ${config.colors.lightgrey};
  padding-bottom: 1em;
`;

// helper to customize collapsible,
// following https://github.com/glennflanagan/react-collapsible/blob/develop/example/_src/sass/components/_Collapsible.scss
const CollapsibleWrapper = styled.div`
  //The link which when clicked opens the collapsable area
  .Collapsible__trigger {
    display: block;
    font-size: 16px;
    font-weight: bold;
    position: relative;
    line-height: 2.5;
    text-align: center;
    color: ${config.colors.black};
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    &:after {
      font-family: 'Open Sans', sans-serif;
      content: '';
      border-style: solid;
      border-width: 12px 7.5px 0 7.5px; // triangle
      transform: rotateZ(90deg);
      border-color: #d8d8d8 transparent transparent transparent;
      position: absolute;
      right: 0;
      top: 15px;
      display: block;
      transition: transform 300ms;
    }

    &.is-open {
      &:after {
        transform: rotateZ(0);
      }
    }

    &.is-disabled {
      opacity: 0.5;
      background-color: grey;
    }
  }
`;

const FaqItem = ({ heading, text, open }) => (
  <CollapsibleWrapper data-cy="reports-landing-faq-item">
    <Collapsible trigger={heading} open={open}>
      <StyledText dangerouslySetInnerHTML={{ __html: text }} />
    </Collapsible>
  </CollapsibleWrapper>
);

FaqItem.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  open: PropTypes.bool
};

FaqItem.defaultProps = {
  heading: 'Dieser Abschnitt hat noch keine Überschrift',
  text: 'Der Text zu diesem Abschnitt in Arbeit...',
  open: false
};

export default FaqItem;
