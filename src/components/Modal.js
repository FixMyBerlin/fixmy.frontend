import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  padding: 1em;
  z-index: 9000;
  background: rgba(0,0,0,.25);
`;

const ModalScroll = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const ModalInner = styled.div`
  background: white;
  box-shadow: 0px 1px 2px 2px rgba(0,0,0,.15);
  padding: 1em;
  height: 100%;
  position: relative;
`;

const closeSize = 30;

const Close = styled.div`
  position: absolute;
  right:-${closeSize / 2}px;
  top:-${closeSize / 2}px;
  padding: 1em;
  border-radius: 50%;
  width: ${closeSize / 2}px;
  height: ${closeSize / 2}px;
  background: #ddd;
  color: #555;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  font-weight: 700;
  font-size: 20px;
  cursor:pointer;
  box-shadow: 0 1px 2px 3px rgba(0, 0, 0, 0.12);

  &:hover {
    background: #eee;
  }
`;

class Modal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {
    isOpen: false,
    onClose: () => {},
    children: ''
  };

  render() {
    if (!this.props.isOpen) {
      return null;
    }

    return (
      <ModalWrapper>
        <ModalInner>
          <ModalScroll>
            <Close onClick={this.props.onClose}>×</Close>
            {this.props.children}
          </ModalScroll>
        </ModalInner>
      </ModalWrapper>
    );
  }
}

export default Modal;
