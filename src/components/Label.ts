import styled from 'styled-components';

type Props = {
  bold: boolean;
  margin: number;
  light: boolean;
  uppercase: boolean;
  children: any;
};

export default styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 10px;
  font-weight: ${(props: Props) => (props.bold ? 700 : 500)};
  line-height: 1.2;
  letter-spacing: 0.2px;
  margin: ${(props: Props) => props.margin || 0};
  color: ${(props: Props) =>
    props.light ? config.colors.midgrey : config.colors.darkgrey};
  text-transform: ${(props: Props) => (props.uppercase ? 'uppercase' : 'none')};
`;
