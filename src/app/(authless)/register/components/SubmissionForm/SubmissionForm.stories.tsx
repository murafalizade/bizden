import { Meta, StoryObj } from '@storybook/react';
import {SubmissionForm} from './index';

const meta: Meta<typeof SubmissionForm> = {
  title: '(authless)/register/SubmissionForm',
  component: SubmissionForm,
};

export default meta;

type Story = StoryObj<typeof SubmissionForm>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
