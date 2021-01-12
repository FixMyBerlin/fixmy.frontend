import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '~/components/Button';
import config from '~/pages/Reports/config';
import Link from '~/components/Link';

const CenteredButton = styled(Button)`
  margin: 0 auto;
  padding: 12px;
  display: block;
  font-size: 1em;
  font-weight: 600;
  font-family: '${config.baseFont}', sans-serif;
  line-height: 1.4;
  text-decoration: none;
  width: 17em;
  text-align: center;
  box-shadow: ${config.flatButtons
    ? 'initial'
    : '0 0 12px 0 rgba(0, 0, 0, 0.3)'};

  &:visited,
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

// const Note = styled.p`
//   max-width: 272px;
//   font-size: 14px;
//   font-weight: bold;
//   line-height: 1.4;
//   text-align: center;
//   margin: 1em auto 2em auto;
// `;

const JoinButton = ({ toUrl }) => (
  <>
    <Link to={toUrl}>
      <CenteredButton>{config.reports.landing.CTA}</CenteredButton>
    </Link>
    {/* {!config.reports.enabled && (
      <Note>
        Hinweis: Meldungen konnten bis zum 31. August 2020 eingereicht werden.
      </Note>
    )} */}
  </>
);

JoinButton.propTypes = {
  toUrl: PropTypes.string,
};

JoinButton.defaultProps = {
  toUrl: config.reports?.enabled
    ? config.routes.reports?.new
    : config.routes.reports?.map,
};

export default JoinButton;
