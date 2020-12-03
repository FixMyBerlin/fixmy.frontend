import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ReportPin from '.';
import utils from '../../utils';

describe('<ReportPin />', () => {
  utils.REPORT_STATUSES.forEach((status) => {
    it(`it renders with status ${status}`, () => {
      const { getByRole } = render(<ReportPin status={status} />);
      expect(getByRole('img')).toBeInTheDocument();
      cleanup();
    });
  });
});
