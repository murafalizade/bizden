import { Meta, StoryObj } from '@storybook/react';
import {BusinessInfoForm} from './index';

const meta: Meta<typeof BusinessInfoForm> = {
  title: '(authless)/register/BusinessInfoForm',
  component: BusinessInfoForm,
};

export default meta;

type Story = StoryObj<typeof BusinessInfoForm>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
