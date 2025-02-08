import { ForwardedRef, forwardRef, memo, useState } from 'react';
import { ChangeHandler } from 'react-hook-form';
import { FieldError } from '../../error';
import { Placeholder } from '../Placeholder/Placeholder.styled';
import { Input, Wrap } from '../shared.styled';

type Props = {
  shouldAutoFocus?: boolean;
  isInForm?: boolean;
  theme?: 'light' | 'dark';
  name: string;
  type?: string;
  defaultValue?: string | number;
  placeholder: string;
  children?: React.ReactNode;
  errorMessage?: string;
  className?: string;
  onChange: ChangeHandler;
};

const TextFieldUnmemoed = forwardRef(
  (
    {
      shouldAutoFocus,
      isInForm = false,
      theme = 'light',
      name,
      type = 'text',
      defaultValue = '',
      placeholder,
      children,
      errorMessage,
      className,
      onChange,
    }: Props,
    ref: ForwardedRef<any>,
  ) => {
    const [value, setValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== '';
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onChange(event);
    };

    return (
      <Wrap $isInForm={isInForm} $themeVariant={theme} className={className}>
        <Input
          autoFocus={shouldAutoFocus}
          defaultValue={defaultValue}
          name={name}
          type={type}
          $isError={!!errorMessage}
          onChange={onChangeHandler}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete="off"
          ref={ref}
        />
        <Placeholder $themeVariant={theme} $hasValue={hasValue || isFocused}>
          {placeholder}
        </Placeholder>
        {children && children}
        <FieldError errorMessage={errorMessage} />
      </Wrap>
    );
  },
);

TextFieldUnmemoed.displayName = 'Field';

export const TextField = memo(TextFieldUnmemoed);
