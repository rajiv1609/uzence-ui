import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';
import React from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Form/InputField',
  component: InputField,
  args: {
    label: 'Label',
    placeholder: 'Type here...',
    variant: 'outlined',
    size: 'md'
  },
  parameters: { layout: 'centered' }
};
export default meta;

export const Default: StoryObj<typeof InputField> = {};
export const Filled: StoryObj<typeof InputField> = { args: { variant: 'filled' } };
export const Ghost: StoryObj<typeof InputField> = { args: { variant: 'ghost' } };
export const Disabled: StoryObj<typeof InputField> = { args: { disabled: true } };
export const Invalid: StoryObj<typeof InputField> = {
  args: { invalid: true, errorMessage: 'This field is required.' }
};
export const Loading: StoryObj<typeof InputField> = { args: { loading: true } };
export const WithHelper: StoryObj<typeof InputField> = { args: { helperText: 'Helpful hint.' } };
export const PasswordToggle: StoryObj<typeof InputField> = {
  args: { type: 'password', passwordToggle: true }
};
export const Clearable: StoryObj<typeof InputField> = {
  render: (args) => {
    const [val, setVal] = React.useState('Hello');
    return <InputField {...args} value={val} onChange={(e) => setVal(e.currentTarget.value)} clearable />;
  }
};
