import { Meta, StoryObj } from '@storybook/react';
import {LoginForm} from './index';

const meta: Meta<typeof LoginForm> = {
  title: '(authless)/login/LoginForm',
  component: LoginForm,
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
