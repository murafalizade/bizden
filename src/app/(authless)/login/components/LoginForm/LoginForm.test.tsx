import React from 'react';
import { render, screen } from '@testing-library/react';
import {LoginForm} from './index';

describe('<LoginForm />', () => {
  it('renders without crashing', () => {
    render(<LoginForm />);
    expect(screen.getByText(/LoginForm component/i)).toBeInTheDocument();
  });
});
