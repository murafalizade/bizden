import React from 'react';
import { render } from '@testing-library/react';
import {VeteranInfoForm} from './index';

describe('<VeteranInfoForm />', () => {
  it('renders without crashing', () => {
    const { container } = render(<VeteranInfoForm />);
    expect(container).toBeTruthy();
  });
});
