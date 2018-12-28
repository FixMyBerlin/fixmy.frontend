import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FaqItemWrapper = styled.div`

  padding-left: 8px;
  padding-right: 23px;

  h3 i.triangle {
    float: right;
    width: 0;
    height: 0;
    display: inline-block;
    border-style: solid;
    border-width: 12px 7.5px 0 7.5px; // triangle tip on the left
    border-color: #d8d8d8 transparent transparent transparent;
  }
  
  // collapsed state 
  &.collapsed {
 
    h3 i.triangle {
      transform: rotate(90deg);
      transition: transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.1s
    }
    
    p {
      height: 0; // TODO: use scale for better performance
      overflow: hidden;
      transition: height 2s
    }
 }
`;

const FaqItem = ({ heading, text, collapsed, onTab }) => {
  return (
    <FaqItemWrapper onClick={onTab} className={collapsed ? 'collapsed' : ''}>
      <h3>{heading}
        {text && <i className="triangle"/>}
      </h3>
      <hr/>
      <p>{text}</p>
    </FaqItemWrapper>
  );
};

FaqItem.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  collapsed: PropTypes.bool
};

FaqItem.defaultProps = {
  heading: 'Dieser Abschnitt hat noch keine Überschrift',
  text: 'Der Text zu diesem Abschnitt in Arbeit...',
  collapsed: false
};

export default FaqItem;
