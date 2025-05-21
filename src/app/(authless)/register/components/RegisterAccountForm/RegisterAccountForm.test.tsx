import React from 'react';
import { render } from '@testing-library/react';
import {RegisterAccountForm} from './index';

describe('<RegisterAccountForm />', () => {
  it('renders without crashing', () => {
    const { container } = render(<RegisterAccountForm />);
    expect(container).toBeTruthy();
  });
});
