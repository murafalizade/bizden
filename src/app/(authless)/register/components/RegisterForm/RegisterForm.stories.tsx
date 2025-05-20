import { Meta, StoryObj } from '@storybook/react';
import {RegisterForm} from './index';

const meta: Meta<typeof RegisterForm> = {
  title: '(authless)/register/RegisterForm',
  component: RegisterForm,
};

export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
