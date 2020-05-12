import styled from 'styled-components';
import { Form } from 'formik';

import config from '~/config';
import { media } from '~/styles/utils';

const StyledForm = styled(Form)`
  padding-bottom: 2em;

  > div {
    margin-bottom: 1em;
  }

  .tosFieldGroup {
    margin: 2em 0;

    .MuiTypography-body1 {
      font-size: 0.75em;
      line-height: normal;
      color: ${config.colors.darkgrey};
    }

    label {
      align-items: flex-start;
    }
  }

  button {
    width: 100%;

    ${media.s`
      width: initial;
    `}
  }
`;

export default StyledForm;
