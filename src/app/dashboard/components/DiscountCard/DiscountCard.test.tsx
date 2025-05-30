import React from 'react';
import { render } from '@testing-library/react';
import {DiscountCard} from './index';

describe('<DiscountCard />', () => {
  it('renders without crashing', () => {
    const { container } = render(<DiscountCard />);
    expect(container).toBeTruthy();
  });
});
