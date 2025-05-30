import React from 'react';
import { render } from '@testing-library/react';
import {DiscountsList} from './index';

describe('<DiscountsList />', () => {
  it('renders without crashing', () => {
    const { container } = render(<DiscountsList />);
    expect(container).toBeTruthy();
  });
});
