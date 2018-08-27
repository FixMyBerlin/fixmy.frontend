import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import idx from 'idx';
import styled from 'styled-components';
import withRouter from 'react-router/withRouter';
import fetch from 'unfetch';

import { media } from '~/style-utils';
import Store from '~/redux/store';
import { setView } from '~/modules/MapView/MapState';
import { getCenterFromGeom } from '~/modules/MapView/map-utils';
import PinIcon from '~/images/pin.svg';
import Label from '~/components/styled/Label';

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

const InfoWrapper = styled.div`
  font-weight: 700;
  text-align: center;
  margin-top: 1rem;
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

    onDataLoaded = (data) => {
      const { geometry = null } = data;
      const center = getCenterFromGeom(geometry);

      if (center) {
        Store.dispatch(setView({ center, zoom: 16, animate: true, pitch: 40, show3dBuildings: true, dim: true }));
      }

      this.setState({
        data,
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

      fetch(dataUrl)
        .then(r => r.json())
        .then(this.onDataLoaded)
        .catch(this.onDataError);
    }

    // we only show the shadow if there is no switch button
    isShadowVisible(data) {
      if (!data) {
        return false;
      }

      if (this.props.activeView === 'zustand') {
        return false;
      } else if (
        this.props.activeView === 'planungen' &&
        (data.plannings && data.plannings.length > 1 && (data.plannings[0].url !== data.plannings[1].url))
      ) {
        return false;
      }

      return true;
    }

    render() {
      const { isLoading, isError, data } = this.state;
      const showShadow = this.isShadowVisible(data);

      if (isLoading) {
        return (
          <DetailWrapper>
            <InfoWrapper>Daten werden geladen ...</InfoWrapper>
          </DetailWrapper>
        );
      }

      if (isError) {
        return (
          <DetailWrapper>
            <DetailHeader>
              <div>
                <DetailTitle>
                  Ein Fehler ist aufgetreten.
                </DetailTitle>
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
              <Label uppercase>Abschnitt 1</Label>
            </div>
            <Close onClick={this.onClose}>×</Close>
          </DetailHeader>
          {showShadow ? <Shadow /> : null}
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
