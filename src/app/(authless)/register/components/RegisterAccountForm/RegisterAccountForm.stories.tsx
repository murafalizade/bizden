import { Meta, StoryObj } from '@storybook/react';
import {RegisterAccountForm} from './index';

const meta: Meta<typeof RegisterAccountForm> = {
  title: '(authless)/register/RegisterAccountForm',
  component: RegisterAccountForm,
};

export default meta;

type Story = StoryObj<typeof RegisterAccountForm>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
