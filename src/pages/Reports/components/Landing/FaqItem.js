import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// TODO: use https://www.npmjs.com/package/react-collapsible
// TODO: Refactor (Split up in single components#
// TODO: Follow convenventions on how styled components are used elsewhere)
// TODO: check of styled-components can do autoprefixing to un-bloat styles

const FaqItemWrapper = styled.div`

  padding: 0 23px 8px 8px;

  &:hover {
    cursor: pointer;
  }
  
  h3 {
    line-height: 1.33;
    margin-bottom: 13px;
  }
  
  hr {
    margin: 0;
  }
   
  p {
    padding: 8px 0 24px 0;
    margin: 0;
     -webkit-transform: scaleY(1);
    -ms-transform: scaleY(1);
    -o-transform: scaleY(1); 
    transform: scaleY(1);
    -webkit-transform-origin: top;
    -ms-transform-origin: top;
    -o-transform-origin: top; 
    transform-origin: top;
    transition: transform 0.26s ease; 
    max-height: 1000px;
  }

  h3 i.triangle {
    float: right;
    width: 0;
    height: 0;
    display: inline-block;
    border-style: solid;
    border-width: 12px 7.5px 0 7.5px; // triangle tip on the left
    border-color: #d8d8d8 transparent transparent transparent;
    margin-top: 6px;
    -webkit-transform: rotate(0);
    -ms-transform: rotate(0);
    -o-transform: rotate(0); 
    transform: rotate(0);
    transition: transform 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  
  // collapsed state 
  &.collapsed {
  
    h3 i.triangle { 
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg); 
      transform: rotate(90deg); 
      transition: transform 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    
    p {
      -webkit-transform:  scaleY(0);
      -ms-transform:  scaleY(0);
      -o-transform:  scaleY(0); 
      transform: scaleY(0);
      -webkit-transform-origin: top;
      -ms-transform-origin: top;
      -o-transform-origin: top; 
      transform-origin: top;
      transition: all 0.26s ease; 
      max-height: 2em;
      //transition:  max-height 200ms cubic-bezier(0.215, 0.61, 0.355, 1) 50ms;
    }
 }
`;

const StyledHr = styled.hr`
  width: 100%;
  border: 0.5px solid ${config.colors.inactivegrey};
`;

const FaqItem = ({ heading, text, collapsed, onTab }) => (
  <FaqItemWrapper onClick={onTab} className={collapsed && 'collapsed'}>
    <h3>{heading}
      {
        // only show arrow if there is text to show/hide
        text && <i className="triangle" />
      }
    </h3>
    <p>{text}</p>
    {!collapsed && (<StyledHr />)}
  </FaqItemWrapper>
);


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
