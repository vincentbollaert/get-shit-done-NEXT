import { ForwardedRef, forwardRef, memo, useState } from 'react';
import { ChangeHandler } from 'react-hook-form';
import { FieldError } from '../../error';
import { IconVariant } from '../../Icon/Icon';
import { Placeholder } from '../Placeholder/Placeholder.styled';
import { IconStyled, Input, Wrap } from '../shared.styled';

type Props = {
  shouldAutoFocus?: boolean;
  isInForm?: boolean;
  theme?: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  placeholder: string;
  iconVariant?: IconVariant;
  errorMessage?: string;
  className?: string;
  onChange: ChangeHandler;
};

const TextFieldUnmemoed = forwardRef(
  (
    {
      shouldAutoFocus,
      isInForm = false,
      theme,
      name,
      type = 'text',
      defaultValue,
      placeholder,
      iconVariant,
      errorMessage,
      className,
      onChange,
    }: Props,
    ref: ForwardedRef<any>
  ) => {
    const [value, setValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== '';
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onChange(event);
    };

    return (
      <Wrap isInForm={isInForm} theme={theme} className={className}>
        <Input
          autoFocus={shouldAutoFocus}
          defaultValue={defaultValue}
          name={name}
          type={type}
          isError={!!errorMessage}
          onChange={onChangeHandler}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={ref}
        />
        <Placeholder theme={theme} hasValue={hasValue || isFocused}>
          {placeholder}
        </Placeholder>
        {iconVariant && <IconStyled variant={iconVariant} />}
        <FieldError errorMessage={errorMessage} />
      </Wrap>
    );
  }
);

TextFieldUnmemoed.displayName = 'Field';

export const TextField = memo(TextFieldUnmemoed);
