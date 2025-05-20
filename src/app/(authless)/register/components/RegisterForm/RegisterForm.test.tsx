import React from 'react';
import { render, screen } from '@testing-library/react';
import {RegisterForm} from './index';

describe('<RegisterForm />', () => {
  it('renders without crashing', () => {
    render(<RegisterForm />);
    expect(screen.getByText(/RegisterForm component/i)).toBeInTheDocument();
  });
});
