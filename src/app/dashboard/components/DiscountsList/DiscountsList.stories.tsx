import { Meta, StoryObj } from '@storybook/react';
import {DiscountsList} from './index';

const meta: Meta<typeof DiscountsList> = {
  title: 'dashboard/DiscountsList',
  component: DiscountsList,
};

export default meta;

type Story = StoryObj<typeof DiscountsList>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
