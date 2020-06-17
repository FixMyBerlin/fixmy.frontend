import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Header from '~/components2/Header';
import Wappen1 from '~/images/gastro/wappen.png';
import Wappen2 from '~/images/gastro/wappen@2x.png';
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
          src={Wappen2}
          srcSet={`${Wappen1} 450w, ${Wappen2} 750w`}
          alt="Wappen Friedrichshain-Kreuzberg"
        />
      }
    >
      Terrassen für {district.title}
    </Header>
  );
};

const mapStateToProps = ({ AppState }) => ({ district: AppState.district });

export default connect(mapStateToProps)(GastroHeader);
