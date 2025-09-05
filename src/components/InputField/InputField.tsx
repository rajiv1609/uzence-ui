import React from 'react';
import { cx } from '../../lib/cx';

export type InputVariant = 'filled' | 'outlined' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputFieldProps {
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  type?: React.HTMLInputTypeAttribute;
  clearable?: boolean;
  passwordToggle?: boolean;
  className?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      value,
      defaultValue,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled,
      invalid,
      loading,
      variant = 'outlined',
      size = 'md',
      type = 'text',
      clearable,
      passwordToggle,
      className
    },
    ref
  ) => {
    const inputId = React.useId();
    const describedById = React.useId();
    const mergedId = id ?? inputId;

    const [showPassword, setShowPassword] = React.useState(false);

    const sizeClasses: Record<InputSize, string> = {
      sm: 'h-9 text-sm px-3',
      md: 'h-10 text-base px-3.5',
      lg: 'h-12 text-base px-4'
    };

    const variantClasses: Record<InputVariant, string> = {
      outlined:
        'border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
      filled:
        'border border-transparent bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent',
      ghost:
        'border border-transparent bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-transparent'
    };

    const invalidClasses = invalid
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : '';
    const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : '';

    const inputType = passwordToggle ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className={cx('w-full', className)}>
        {label && (
          <label htmlFor={mergedId} className="mb-1 block text-sm font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={mergedId}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={helperText || errorMessage ? describedById : undefined}
            type={inputType}
            className={cx(
              'w-full rounded-md outline-none transition-colors',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
              sizeClasses[size],
              variantClasses[variant],
              invalidClasses,
              disabledClasses
            )}
          />

          {/* Clear button */}
          {clearable && !disabled && value && (
            <button
              type="button"
              aria-label="Clear input"
              onClick={(e) => {
                if (onChange) {
                  const target = e.currentTarget;
                  const input = document.getElementById(mergedId) as HTMLInputElement | null;
                  if (input) {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                      window.HTMLInputElement.prototype,
                      'value'
                    )?.set;
                    nativeInputValueSetter?.call(input, '');
                    const ev = new Event('input', { bubbles: true });
                    input.dispatchEvent(ev);
                  }
                }
              }}
              className="absolute inset-y-0 right-2 my-auto h-7 rounded px-2 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              ×
            </button>
          )}

          {/* Password toggle */}
          {passwordToggle && (
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-2 my-auto h-7 rounded px-2 text-xs text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          )}

          {/* Loading indicator */}
          {loading && (
            <span className="pointer-events-none absolute inset-y-0 right-2 my-auto inline-flex h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
          )}
        </div>

        {(helperText || (invalid && errorMessage)) && (
          <p id={describedById} className={cx('mt-1 text-xs', invalid ? 'text-red-600' : 'text-gray-500') }>
            {invalid ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
