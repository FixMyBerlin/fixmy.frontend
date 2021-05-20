import styled from 'styled-components';

import config from '~/config';

export default styled.form`
  width: 100%;

  label,
  input,
  select,
  textarea {
    display: block;
    width: 100%;
  }

  label {
    margin-bottom: 0.25em;
  }

  input,
  select,
  textarea {
    background: white;
    padding: 5px 10px;
    border: 1px solid #ddd;
    color: ${config.colors.darkbg};
  }

  textarea {
    padding: 5px 10px;
    height: 200px;
    resize: vertical;
  }
`;
