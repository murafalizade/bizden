import React from 'react';
import { render } from '@testing-library/react';
import {BusinessInfoForm} from './index';

describe('<BusinessInfoForm />', () => {
  it('renders without crashing', () => {
    const { container } = render(<BusinessInfoForm />);
    expect(container).toBeTruthy();
  });
});
