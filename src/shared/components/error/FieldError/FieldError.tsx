import React from 'react';
import styled from 'styled-components';

export const CN_ERROR_FIELD = 'error-field';

type Props = {
  errorMessage?: string;
  className?: string;
};

export const FieldError = ({ errorMessage, className }: Props) => {
  return !errorMessage ? null : <Wrap className={`${className} ${CN_ERROR_FIELD}`}>{errorMessage}</Wrap>;
};

type WrapProps = React.HTMLAttributes<HTMLDivElement> & { $isInfoVariant?: boolean };
export const Wrap = styled.div<WrapProps>`
  position: absolute;
  right: var(--size-xsm);
  bottom: var(--size-xsm);
  font-size: var(--font-size-xxsm);
  color: ${(props) => (props.$isInfoVariant ? 'var(--very-light-tangelo)' : 'var(--sunset-orange)')};
`;
