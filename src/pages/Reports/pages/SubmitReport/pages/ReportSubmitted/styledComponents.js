import styled from 'styled-components';

import config from '~/pages/Reports/config';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import Button from '~/components/Button';

const StyledHeading = styled(Heading)`
  margin: 6px 0 8px 0;
`;

const Text = styled(Paragraph)`
  margin-top: 0;
  margin-bottom: 32px;
  line-height: 1.4;
`;

const ThanksImg = styled.img`
  width: 50%;
  margin: 20px auto;
  display: block;
`;

const SubmitButton = styled(Button)`
  margin-top: 32px;
  width: 168px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: ${config.flatButtons
    ? 'initial'
    : '0 0 12px 0 rgba(0, 0, 0, 0.2)'};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginExpand = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${config.colors.interaction};
  cursor: pointer;
`;

const FormWrapper = styled.div`
  margin-bottom: 16px;

  .formtype-checkbox {
    span {
      font-size: 12px;
    }

    input {
      width: auto;
    }
  }
`;

const ErrorLabel = styled.div`
  color: ${config.colors.error};
  font-weight: 700;
`;

export {
  ButtonWrapper,
  ErrorLabel,
  FormWrapper,
  LoginExpand,
  StyledHeading,
  SubmitButton,
  Text,
  ThanksImg,
};
