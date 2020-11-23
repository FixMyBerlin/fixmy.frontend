import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Supporter from '~/images/spielstrassen/supporter.svg';
import SupporterCheck from '~/images/spielstrassen/supporter-check.svg';

type IconProps = { visible: boolean };

const SupportersReached = styled(SupporterCheck)<IconProps>`
  margin-left: -40%;
  margin-top: -5px;
  visibility: ${(props: IconProps) => (props.visible ? 'visible' : 'hidden')};
`;

const Wrapper = styled.span`
  display: flex;
  flex-shrink: 0;
  svg:first-child {
    width: 100%;
    height: 100%;
  }
`;

const SupporterIcon = ({ count, district }) => (
  <Wrapper>
    <Supporter />
    <SupportersReached
      visible={count >= district.apps.spielstrassen.supporterGoal}
    />
  </Wrapper>
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(SupporterIcon);
