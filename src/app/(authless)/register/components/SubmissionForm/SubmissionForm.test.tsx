import React from 'react';
import { render } from '@testing-library/react';
import {SubmissionForm} from './index';

describe('<SubmissionForm />', () => {
  it('renders without crashing', () => {
    const { container } = render(<SubmissionForm />);
    expect(container).toBeTruthy();
  });
});
