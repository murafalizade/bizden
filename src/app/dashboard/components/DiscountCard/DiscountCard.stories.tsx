import { Meta, StoryObj } from '@storybook/react';
import {DiscountCard} from './index';

const meta: Meta<typeof DiscountCard> = {
  title: 'dashboard/components/DiscountCard',
  component: DiscountCard,
};

export default meta;

type Story = StoryObj<typeof DiscountCard>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
