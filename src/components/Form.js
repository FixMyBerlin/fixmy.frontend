import styled from 'styled-components';

export default styled.form`
  width: 100%;

  label,
  input,
  select {
    display: block;
    width: 100%;
  }

  label {
    margin-bottom: .25em;
  }

  input,
  select {
    background: white;
    padding: 5px 10px;
    border:1px solid #ddd;
    color: #222;
    font-family: 'Open Sans', sans-serif;
  }
`;
