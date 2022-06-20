/* eslint class-methods-use-this: 0 */
import debug from 'debug';
import ky from 'ky';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';

import { setView } from '~/apps/Map/MapState';
import { getCenterFromGeom } from '~/apps/Map/map-utils';
import { IconButton } from '~/components2/Button';
import Label from '~/components2/Label';
import config from '~/config';
import PinIcon from '~/images/pin.svg';
import Store from '~/store';
import { media } from '~/styles/utils';

const logger = debug('fmc:Reports:detailWrapped');

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

const Close = styled(IconButton.Close)`
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
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        isLoading: true,
        isError: false,
      };
    }

    componentDidMount() {
      this.loadData();
    }

    componentDidUpdate(prevProps) {
      const currId = this.props.match.params.id;
      const prevId = prevProps.match.params.id;

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
            dim: true,
          })
        );
      }

      this.setState({
        data,
        isLoading: false,
        isError: false,
      });
    };

    onClose = () => {
      this.props.history.push(this.props.onCloseRoute);
      this.props.onClose();
    };

    loadData = async () => {
      const { id } = this.props.match.params;

      this.setState({ isLoading: true });

      const dataUrl = `${config.apiUrl}/${this.props.apiEndpoint}/${id}`;

      try {
        const data = await ky.get(dataUrl).json();
        this.onDataLoaded(data);
      } catch (error) {
        logger('error loading report details', error);
        this.setState({
          isLoading: false,
          isError: true,
        });
      }
    };

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
      // we only show the shadow if there is no switch button
      const showShadow = data != null && this.props.activeView === 'planungen';
      const borough = this.state.data?.borough;

      if (isLoading) {
        return this.renderLoading();
      }

      if (isError) {
        return this.renderError();
      }

      return (
        <DetailWrapper data-cy="map-details-wrapper">
          <DetailHeader>
            <StyledPinIcon />
            <div>
              <DetailTitle data-cy="map-details-header-title">
                {this.renderName(data)}
              </DetailTitle>
              <Label uppercase data-cy="map-details-header-subtitle">
                {subtitle || borough}
              </Label>
            </div>
            <Close
              onClick={this.onClose}
              data-cy="map-details-header-close-button"
            />
          </DetailHeader>
          {showShadow ? <Shadow /> : null}
          <DetailBody>
            <Component data={data} {...this.props} />
          </DetailBody>
        </DetailWrapper>
      );
    }
  }

  DetailWrapperComp.propTypes = {
    activeView: PropTypes.string,
    apiEndpoint: PropTypes.string.isRequired,
    onCloseRoute: PropTypes.string,
    onClose: PropTypes.func,
    subtitle: PropTypes.string,
    history: ReactRouterPropTypes.history.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  DetailWrapperComp.defaultProps = {
    activeView: 'planungen',
    onCloseRoute: '/',
    onClose: () => {},
    subtitle: null,
  };

  return withRouter(DetailWrapperComp);
}

export default detailWrapped;
