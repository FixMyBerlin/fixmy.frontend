import { Form } from 'formik';
import styled from 'styled-components';

import config from '~/config';

const StyledForm = styled(Form)`
  padding-bottom: 2em;

  > div {
    margin-bottom: 1em;
  }

  .MuiInputLabel-root {
    font-style: italic;
  }

  .checkboxFieldGroup {
    margin: 2em 0;

    .MuiTypography-body1 {
      font-size: 0.75em;
      line-height: normal;
      color: ${config.colors.darkgrey};
    }

    label {
      align-items: center;
    }
  }
`;

export default StyledForm;
