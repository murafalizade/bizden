import React from 'react';
import { render } from '@testing-library/react';
import {ApplicationCard} from './index';

describe('<ApplicationCard />', () => {
  it('renders without crashing', () => {
    const { container } = render(<ApplicationCard />);
    expect(container).toBeTruthy();
  });
});
