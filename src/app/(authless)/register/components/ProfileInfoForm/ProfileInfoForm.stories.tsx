import { Meta, StoryObj } from '@storybook/react';
import {ProfileInfoForm} from './index';

const meta: Meta<typeof ProfileInfoForm> = {
  title: '(authless)/register/ProfileInfoForm',
  component: ProfileInfoForm,
};

export default meta;

type Story = StoryObj<typeof ProfileInfoForm>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
