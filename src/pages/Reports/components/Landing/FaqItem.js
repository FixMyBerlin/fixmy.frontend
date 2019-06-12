import React from 'react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import PropTypes from 'prop-types';

// TODO: find a good solution to re-append the <hr /> to opened collapsibles. must be done animated to look good

// helper to customize collapsible,
// following https://github.com/glennflanagan/react-collapsible/blob/develop/example/_src/sass/components/_Collapsible.scss
const CollapsibleWrapper = styled.div`
  .Collapsible__contentInner {
    p {
      font-size: 16px;
      line-height: 1.37;
      color: ${config.colors.darkgrey};
    }
  }

  //The link which when clicked opens the collapsable area
  .Collapsible__trigger {
    display: block;
    font-size: 16px;
    font-weight: bold;
    position: relative;
    line-height: 2.5;
    color: ${config.colors.black};

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
  <CollapsibleWrapper>
    <Collapsible trigger={heading} open={open}>
      <p dangerouslySetInnerHTML={{ __html: text }} />
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
