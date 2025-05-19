import { Meta, StoryObj } from '@storybook/react';
import {Login} from './index';

const meta: Meta<typeof Login> = {
  title: '(authless)/login/Login',
  component: Login,
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
