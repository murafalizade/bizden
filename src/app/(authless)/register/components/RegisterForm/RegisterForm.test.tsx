import React from 'react';
import { render } from '@testing-library/react';
import {RegisterForm} from './index';

describe('<RegisterForm />', () => {
  it('renders without crashing', () => {
    const { container } = render(<RegisterForm />);
    expect(container).toBeTruthy();
  });
});
