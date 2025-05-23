import { Meta, StoryObj } from '@storybook/react';
import {StudentInfoForm} from './index';

const meta: Meta<typeof StudentInfoForm> = {
  title: '(authless)/register/StudentInfoForm',
  component: StudentInfoForm,
};

export default meta;

type Story = StoryObj<typeof StudentInfoForm>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
