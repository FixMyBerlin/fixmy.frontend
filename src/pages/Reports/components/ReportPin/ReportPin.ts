import styled from 'styled-components';
import utils from '~/pages/Reports/utils';
import { ENTRY_STATUS } from '~/pages/Reports/types';

// statuses for which marker images are small
const smallMarkers = [
  'report_verification',
  'report_accepted',
  'report_rejected',
  'report_inactive',
  // deprecated
  'verification',
  'accepted',
  'rejected',
];

const isSmall = (status: ENTRY_STATUS) => smallMarkers.indexOf(status) > -1;

interface Props {
  status: ENTRY_STATUS;
  className?: string;
}

const ReportPin = styled.img.attrs((props: Props) => ({
  src: utils.getMarkerSrc({ status: props.status }),
  alt: `Pin für einen Eintrag mit dem Status ${props.status}`,
  small: smallMarkers.indexOf(props.status) > -1,
}))<Props>`
  margin-left: auto;
  width: ${(props) => (isSmall(props.status) ? '20px' : '40px')};
  height: ${(props) => (isSmall(props.status) ? '20px' : '50px')};
`;

export default ReportPin;
