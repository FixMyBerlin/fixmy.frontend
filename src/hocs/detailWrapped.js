import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import idx from 'idx';
import styled from 'styled-components';
import withRouter from 'react-router/withRouter';
import Axios from 'axios';

import { media } from '~/style-utils';

import PinIcon from '~/images/pin.svg';
import { resetMap } from '~/modules/MapView/map-utils';

const DetailWrapper = styled.div`
  position: absolute;
  left: 0;
  top:0;
  width: 100%;
  height: 100%;
  z-index: 3000;
  background: white;
  display: flex;
  flex-direction: column;

  ${media.m`
    left: auto;
    right: 0;
    width: 400px;
    box-shadow: -1px 0 6px 1px rgba(0,0,0,.3);
  `}
`;

const StyledPinIcon = styled(PinIcon)`
  margin-right: 10px;
`;

const DetailHeader = styled.div`
  display: flex;
  background: ${config.colors.lightbg};
  padding: 10px;
  color: ${config.colors.darkgrey};
  font-size: 12px;
  line-height: 1.5;
  align-items: center;
  z-index: 3;
`;

const Shadow = styled.div`
  box-shadow: 0 0px 8px 2px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 2;
`;

const DetailTitle = styled.div`
  text-transform: uppercase;
  font-weight: 600;
`;

const DetailSubtitle = styled.div`
  text-transform: uppercase;
`;

const DetailBody = styled.div`
  overflow-y: auto;
  height: 100%;
`;

const Close = styled.button`
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  height: 36px;
  justify-content: center;
  font-size: 24px;
  color: ${config.colors.midgrey};
  width: 36px;
  margin-left: auto;
`;

function detailWrapped(Component) {
  class DetailWrapperComp extends PureComponent {
    static propTypes = {
      apiEndpoint: PropTypes.string.isRequired,
      onCloseRoute: PropTypes.string
    }

    static defaultProps = {
      onCloseRoute: '/'
    }

    state = {
      data: null,
      isLoading: true,
      isError: false
    }

    componentDidMount() {
      this.loadData();
    }

    componentDidUpdate(prevProps) {
      const currId = idx(this.props.match, _ => _.params.id);
      const prevId = idx(prevProps.match, _ => _.params.id);

      if (currId !== prevId) {
        this.loadData();
      }
    }

    onDataLoaded = (res) => {
      this.setState({
        data: res.data,
        isLoading: false,
        isError: false
      });
    }

    onDataError = () => {
      this.setState({
        isLoading: false,
        isError: true
      });
    }

    onClose = () => {
      this.props.history.push(this.props.onCloseRoute);
      resetMap();
    }

    getJSONFallbackPath() {
      const file = this.props.apiEndpoint === 'planungen' ? 'planning-sections-example.json' : 'plannings-example.json';
      return `/data/${file}`;
    }

    loadData = () => {
      const id = idx(this.props.match, _ => _.params.id);

      this.setState({ isLoading: true });

      const dataUrl = config.offlineMode ?
        this.getJSONFallbackPath() :
        `${config.apiUrl}/${this.props.apiEndpoint}/${id}`;

      Axios
        .get(dataUrl)
        .then(this.onDataLoaded)
        .catch(this.onDataError);
    }

    render() {
      const { isLoading, isError, data } = this.state;
      if (isLoading) {
        return <DetailWrapper>Daten werden geladen ...</DetailWrapper>;
      }

      if (isError) {
        return (
          <DetailWrapper>
            <DetailHeader>
              <div>
                <DetailTitle>Ein Fehler ist aufgetreten.</DetailTitle>
              </div>
              <Close onClick={this.onClose}>×</Close>
            </DetailHeader>
          </DetailWrapper>
        );
      }

      return (
        <DetailWrapper>
          <DetailHeader>
            <StyledPinIcon />
            <div>
              <DetailTitle>{data.name || 'Abschnittsname'}</DetailTitle>
              <DetailSubtitle>Abschnitt 1</DetailSubtitle>
            </div>
            <Close onClick={this.onClose}>×</Close>
          </DetailHeader>
          <Shadow />
          <DetailBody>
            <Component
              data={data}
              {...this.props}
            />
          </DetailBody>
        </DetailWrapper>
      );
    }
  }

  return withRouter(DetailWrapperComp);
}

export default detailWrapped;
