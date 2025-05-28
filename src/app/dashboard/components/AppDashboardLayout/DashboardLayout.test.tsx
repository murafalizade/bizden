import React from 'react';
import { render } from '@testing-library/react';
import { AppDashboardLayout } from './index';

describe('<DashboardLayout />', () => {
  it('renders without crashing', () => {
    const { container } = render(<AppDashboardLayout />);
    expect(container).toBeTruthy();
  });
});
