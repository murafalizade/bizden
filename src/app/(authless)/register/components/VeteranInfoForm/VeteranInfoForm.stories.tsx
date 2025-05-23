import { Meta, StoryObj } from '@storybook/react';
import {VeteranInfoForm} from './index';

const meta: Meta<typeof VeteranInfoForm> = {
  title: '(authless)/register/VeteranInfoForm',
  component: VeteranInfoForm,
};

export default meta;

type Story = StoryObj<typeof VeteranInfoForm>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
