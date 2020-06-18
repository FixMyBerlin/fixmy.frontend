import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import config from './config';
import LinkExternal from '~/images/spielstrassen/icon-external-link@2x.png';
import LinkInternal from '~/images/spielstrassen/icon-internal-link@2x.png';
import { setDistrict } from '~/AppState';
import { getAppPath } from '~/utils/utils';

import Routes from './routes';

const AppStyles = styled.div`
  font-size: 16px;
  line-height: 24px;

  h1 {
    font-family: ${config.titleFont};
    line-height: 1.25em;
  }

  h1 + .subline {
    margin-top: -1em;
  }

  h2 {
    font-size: 24px;
    line-height: 1.25em;
  }

  ol {
    padding-left: 1em;
  }

  li {
    margin-bottom: 0.5em;
  }

  a.internal,
  a.external,
  a.internal:link,
  a.external:link,
  a.internal:visited,
  a.external:visited,
  a.internal:active,
  a.external:active {
    color: ${config.colors.darkbg};
    text-decoration: none;
    border-bottom: 1px solid ${config.colors.interaction};
  }

  .external,
  .internal {
    background-size: 9px 9px;
    background-repeat: no-repeat;
    background-position: center left;
    padding-left: 15px;
  }

  .external {
    background-image: url(${LinkExternal});
  }

  .internal {
    background-image: url(${LinkInternal});
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: { main: config.colors.interaction },
    secondary: { main: config.colors.change_4 },
    error: { main: config.colors.error },
    info: { main: config.colors.interaction },
    success: { main: config.colors.label_01 }
  }
});

const Gastro = ({ districtName, district, dispatch }) => {
  useEffect(() => {
    dispatch(setDistrict(districtName));
  }, [districtName]);
  // Skip rendering until redux action has taken effect
  if (district == null) return null;
  return (
    <AppStyles>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AppStyles>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(Gastro);
