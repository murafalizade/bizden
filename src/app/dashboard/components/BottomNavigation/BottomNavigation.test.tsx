import React from 'react';
import { render } from '@testing-library/react';
import {BottomNavigation} from './index';

describe('<BottomNavigation />', () => {
  it('renders without crashing', () => {
    const { container } = render(<BottomNavigation />);
    expect(container).toBeTruthy();
  });
});
