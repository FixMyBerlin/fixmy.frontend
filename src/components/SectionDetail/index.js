import React, { PureComponent } from 'react';
import idx from 'idx';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const SectionDetailWrapper = styled.div`
  position: absolute;
  left: 0;
  top:0;
  width: 100%;
  height: 100%;
  z-index: 3000;
  background: white;
`;

const SectionClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${config.colors.white};
  border-radius: 50%;
  border: 1px solid ${config.colors.midgrey};
  cursor: pointer;
  font-size: 24px;
  color: ${config.colors.midgrey};
`;

class SectionDetail extends PureComponent {
  onClose = () => {
    this.props.history.push('/zustand');
  }

  render() {
    console.log(this.props);
    const id = idx(this.props.match, _ => _.params.id);

    return (
      <SectionDetailWrapper>
        <SectionClose onClick={this.onClose}>×</SectionClose>
        DETAILS {id}
      </SectionDetailWrapper>
    );
  }
}

export default withRouter(SectionDetail);
