import React from 'react';
import { render } from '@testing-library/react';
import {SearchForm} from './index';

describe('<SearchForm />', () => {
  it('renders without crashing', () => {
    const { container } = render(<SearchForm />);
    expect(container).toBeTruthy();
  });
});
