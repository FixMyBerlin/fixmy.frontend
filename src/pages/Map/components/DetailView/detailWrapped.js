/* eslint class-methods-use-this: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import idx from 'idx';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import ky from 'ky';

import { media } from '~/styles/utils';
import Store from '~/store';
import { setView } from '~/pages/Map/MapState';
import { getCenterFromGeom } from '~/pages/Map/map-utils';
import PinIcon from '~/images/pin.svg';
import Label from '~/components/Label';
import NewCloseButton from '~/components/NewCloseButton';

const DetailWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
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

const Close = styled(NewCloseButton)`
  margin-left: auto;
`;

/**
 * Removes zipcode and city
 * @param {string} address
 * @returns {string} Only street and number
 */
function formatAddressString(address) {
  return address
    .replace('Berlin', '')
    .replace(/\b\d{5}\b/g, '')
    .replace(',', '')
    .trim();
}

function detailWrapped(Component) {
  class DetailWrapperComp extends PureComponent {
    static propTypes = {
      apiEndpoint: PropTypes.string.isRequired,
      onCloseRoute: PropTypes.string,
      onClose: PropTypes.func
    };

    static defaultProps = {
      onCloseRoute: '/',
      onClose: () => {}
    };

    state = {
      data: null,
      isLoading: true,
      isError: false
    };

    componentDidMount() {
      this.loadData();
    }

    componentDidUpdate(prevProps) {
      const currId = idx(this.props.match, (_) => _.params.id);
      const prevId = idx(prevProps.match, (_) => _.params.id);

      if (currId !== prevId) {
        this.loadData();
      }
    }

    onDataLoaded = (data) => {
      const { geometry = null } = data;
      const center = getCenterFromGeom(geometry);

      if (center) {
        Store.dispatch(
          setView({
            center,
            zoom: 16,
            animate: true,
            pitch: 40,
            show3dBuildings: true,
            dim: true
          })
        );
      }

      this.setState({
        data,
        isLoading: false,
        isError: false
      });
    };

    onDataError = () => {
      this.setState({
        isLoading: false,
        isError: true
      });
    };

    onClose = () => {
      this.props.history.push(this.props.onCloseRoute);
      this.props.onClose();
    };

    getJSONFallbackPath() {
      const file =
        this.props.apiEndpoint === 'planungen'
          ? 'planning-sections-example.json'
          : 'plannings-example.json';
      return `/data/${file}`;
    }

    loadData = async () => {
      const id = idx(this.props.match, (_) => _.params.id);

      this.setState({ isLoading: true });

      const dataUrl = config.offlineMode
        ? this.getJSONFallbackPath()
        : `${config.apiUrl}/${this.props.apiEndpoint}/${id}`;

      try {
        const data = await ky.get(dataUrl).json();
        this.onDataLoaded(data);
      } catch (error) {
        this.onDataError(error);
      }
    };

    // we only show the shadow if there is no switch button
    isShadowVisible(data) {
      if (!data || this.props.activeView === 'zustand') {
        return false;
      }

      if (
        this.props.activeView === 'planungen' &&
        (data.plannings &&
          data.plannings.length > 1 &&
          data.plannings[0].url !== data.plannings[1].url)
      ) {
        return false;
      }

      return true;
    }

    renderName(data) {
      if (data.street_name) {
        return data.street_name;
      }

      if (data.address) {
        return formatAddressString(data.address);
      }

      return 'Abschnittsname';
    }

    renderLoading() {
      return (
        <DetailWrapper>
          <InfoWrapper>Daten werden geladen ...</InfoWrapper>
        </DetailWrapper>
      );
    }

    renderError() {
      return (
        <DetailWrapper>
          <DetailHeader>
            <div>
              <DetailTitle>Ein Fehler ist aufgetreten.</DetailTitle>
            </div>
            <Close onClick={this.onClose} />
          </DetailHeader>
        </DetailWrapper>
      );
    }

    render() {
      const { subtitle } = this.props;
      const { isLoading, isError, data } = this.state;
      const showShadow = this.isShadowVisible(data);

      if (isLoading) {
        return this.renderLoading();
      }

      if (isError) {
        return this.renderError();
      }

      return (
        <DetailWrapper>
          <DetailHeader>
            <StyledPinIcon />
            <div>
              <DetailTitle>{this.renderName(data)}</DetailTitle>
              <Label uppercase>{subtitle || 'Abschnitt 1'}</Label>
            </div>
            <Close onClick={this.onClose} />
          </DetailHeader>
          {showShadow ? <Shadow /> : null}
          <DetailBody>
            <Component data={data} {...this.props} />
          </DetailBody>
        </DetailWrapper>
      );
    }
  }

  return withRouter(DetailWrapperComp);
}

export default detailWrapped;
