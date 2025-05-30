import { Meta, StoryObj } from '@storybook/react';
import {ApplicationCard} from './index';

const meta: Meta<typeof ApplicationCard> = {
  title: 'dashboard/applications/ApplicationCard',
  component: ApplicationCard,
};

export default meta;

type Story = StoryObj<typeof ApplicationCard>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
