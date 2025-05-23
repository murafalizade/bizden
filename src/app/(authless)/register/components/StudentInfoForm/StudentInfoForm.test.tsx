import React from 'react';
import { render } from '@testing-library/react';
import {StudentInfoForm} from './index';

describe('<StudentInfoForm />', () => {
  it('renders without crashing', () => {
    const { container } = render(<StudentInfoForm />);
    expect(container).toBeTruthy();
  });
});
