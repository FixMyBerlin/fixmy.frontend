import { render, cleanup } from '@testing-library/react';
import React from 'react';

import utils from '../../utils';

import ReportPin from '.';

describe('<ReportPin />', () => {
  utils.REPORT_STATUSES.forEach((status) => {
    it(`it renders with status ${status}`, () => {
      const { getByRole } = render(<ReportPin status={status} />);
      expect(getByRole('img')).toBeInTheDocument();
      cleanup();
    });
  });
});
