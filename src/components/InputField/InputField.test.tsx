import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputField } from './InputField';
import React from 'react';

describe('InputField', () => {
  it('renders label and helper text', () => {
    render(<InputField label="Email" helperText="We keep it private" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('We keep it private')).toBeInTheDocument();
  });

  it('shows error message when invalid', () => {
    render(<InputField label="Email" invalid errorMessage="Required" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    render(<InputField label="Password" type="password" passwordToggle />);
    const toggle = screen.getByRole('button', { name: /show password/i });
    await user.click(toggle);
    const input = screen.getByLabelText('Password') as HTMLInputElement;
    expect(input.type).toBe('text');
  });
});
