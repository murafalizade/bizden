import { Meta, StoryObj } from '@storybook/react';
import {BottomNavigation} from './index';

const meta: Meta<typeof BottomNavigation> = {
  title: 'dashboard/BottomNavigation',
  component: BottomNavigation,
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
