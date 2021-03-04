/* eslint class-methods-use-this: 0 */
import debug from 'debug';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { FetchState, HBIData, loadHBIData, setView } from '~/apps/Map/MapState';
import { getCenterFromGeom } from '~/apps/Map/map-utils';
import { IconButton } from '~/components2/Button';
import Label from '~/components2/Label';
import config from '~/config';
import PinIcon from '~/images/pin.svg';
import Store, { useTypedSelector } from '~/store';
import { media } from '~/styles/utils';
import { SectionPin } from '../SectionPin';
import Loader from '~/components/Loader';
import { DotLoader } from '~/components2/Loaders';

const logger = debug('fmc:map:detailWrapped');

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

const StyledPinIcon = styled(SectionPin)`
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

const Name = (data: HBIData) => {
  if (data.street_name) {
    return data.street_name;
  }

  // todo: is this ever accessed?
  if ((data as any).address) {
    return formatAddressString((data as any).address);
  }

  return 'Abschnittsname';
};

const Error = ({ onClose }) => (
  <DetailWrapper>
    <DetailHeader>
      <div>
        <DetailTitle>Ein Fehler ist aufgetreten.</DetailTitle>
      </div>
      <Close onClick={onClose} />
    </DetailHeader>
  </DetailWrapper>
);

const DetailPanel = ({ children, subtitle = null, onClose = () => null }) => {
  const data = useTypedSelector<HBIData>(({ MapState }) => MapState.hbiData);
  const fetchState = useTypedSelector<FetchState>(
    ({ MapState }) => MapState.hbiDataFetchState
  );
  const error = useTypedSelector<string | null>(
    ({ MapState }) => MapState.error
  );
  const history = useHistory();
  const sectionId = useTypedSelector<number | null>(
    ({ MapState }) => MapState.activeSection
  );
  const [prevId, setPrevId] = useState<number | null>(null);

  useEffect(() => {
    if (sectionId !== prevId) {
      Store.dispatch<any>(loadHBIData());
      setPrevId(sectionId);
    }
  }, [sectionId]);

  useEffect(() => {
    if (data == null) return;
    const { geometry = null } = data;
    const center = getCenterFromGeom(geometry);

    logger('Loaded project for detail view', data);

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
  }, [data]);

  const handleClose = () => {
    history.push(config.routes.map.hbiIndex);
    onClose();
  };

  if (error != null) return <Error onClose={handleClose} />;

  const isLoading = fetchState === 'pending' || fetchState === 'waiting';

  return (
    <DetailWrapper data-cy="map-details-wrapper">
      <DetailHeader>
        <StyledPinIcon isRoad={data && data.is_road} />
        <div>
          <DetailTitle data-cy="map-details-header-title">
            {isLoading ? 'Wird geladen...' : <Name {...data} />}
          </DetailTitle>
          <Label uppercase data-cy="map-details-header-subtitle">
            {isLoading ? '' : subtitle || data?.borough}
          </Label>
        </div>
        <Close
          onClick={handleClose}
          data-cy="map-details-header-close-button"
        />
      </DetailHeader>
      {isLoading ? <DotLoader /> : <DetailBody>{children}</DetailBody>}
    </DetailWrapper>
  );
};

export default DetailPanel;
