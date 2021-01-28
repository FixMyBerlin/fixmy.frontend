import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header } from '~/components2/Header';
import { getAppPath } from '~/utils/utils';

const Wappen = styled.img`
  width: 36px;
`;

const GastroHeader = ({ showInfoLink, district }) => {
  return (
    <Header
      to={getAppPath(district, 'gastro')}
      showInfoLink={showInfoLink}
      logo={
        <Wappen
          src={district.emblem.large}
          srcSet={`${district.emblem.small} 450w, ${district.emblem.large} 750w`}
          alt={`Wappen ${district.title}`}
        />
      }
    >
      Terrassen für {district.title}
    </Header>
  );
};

const mapStateToProps = ({ AppState }) => ({ district: AppState.district });

export default connect(mapStateToProps)(GastroHeader);
