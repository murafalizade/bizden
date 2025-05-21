import React from 'react';
import { render } from '@testing-library/react';
import {ProfileInfoForm} from './index';

describe('<ProfileInfoForm />', () => {
  it('renders without crashing', () => {
    const { container } = render(<ProfileInfoForm />);
    expect(container).toBeTruthy();
  });
});
