import React from 'react';
import { render } from '@testing-library/react';
import { Login } from './index';

describe('<Login />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Login />);
    expect(container).toBeTruthy();
  });
});
