import { Meta, StoryObj } from '@storybook/react';
import {SearchForm} from './index';

const meta: Meta<typeof SearchForm> = {
  title: 'dashboard/search/SearchForm',
  component: SearchForm,
};

export default meta;

type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
