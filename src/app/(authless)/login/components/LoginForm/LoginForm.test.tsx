import React from 'react';
import { render } from '@testing-library/react';
import {LoginForm} from './index';

describe('<LoginForm />', () => {
  it('renders without crashing', () => {
    const { container } = render(<LoginForm />);
    expect(container).toBeTruthy();
  });
});
