import React from 'react';
import { render } from '@testing-library/react';
import {Sidebar} from './index';

describe('<Sidebar />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Sidebar />);
    expect(container).toBeTruthy();
  });
});
