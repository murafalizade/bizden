import { Meta, StoryObj } from '@storybook/react';
import {Sidebar} from './index';

const meta: Meta<typeof Sidebar> = {
  title: 'dashboard/Sidebar',
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
