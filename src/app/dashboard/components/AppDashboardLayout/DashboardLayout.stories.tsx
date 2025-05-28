import { Meta, StoryObj } from '@storybook/react';
import { AppDashboardLayout } from './index';

const meta: Meta<typeof AppDashboardLayout> = {
  title: 'dashboard/DashboardLayout',
  component: AppDashboardLayout,
};

export default meta;

type Story = StoryObj<typeof AppDashboardLayout>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
