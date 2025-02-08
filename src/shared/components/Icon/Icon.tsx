import clsx from 'clsx';
import React from 'react';
import styled, { css } from 'styled-components';

export type IconVariant =
  | 'delete'
  | 'expand_more'
  | 'chevron_left'
  | 'chevron_right'
  | 'close'
  | 'settings'
  | 'invert_colors'
  | 'error'
  | 'fullscreen'
  | 'list'
  | 'pending'
  | 'logout'
  | 'dark_mode'
  | 'light_mode';
export type IconProps = {
  isError?: boolean;
  themeVariant?: 'light' | 'dark';
  variant: IconVariant;
  size?: number;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
};

export const Icon = ({ isError = false, themeVariant = 'light', variant, size = 2, className, onClick }: IconProps) => {
  return (
    <Wrap
      isError={isError}
      size={size}
      themeVariant={themeVariant}
      className={clsx(className, 'material-icons-outlined')}
      onClick={onClick}
    >
      {variant}
    </Wrap>
  );
};

type WrapProps = React.HTMLAttributes<HTMLSpanElement> & {
  size: number;
  themeVariant: 'light' | 'dark';
  isError: boolean;
};

const Wrap = styled.span<WrapProps>`
  font-size: ${(p) => p.size}rem;
  color: ${(p) => (p.themeVariant === 'light' ? 'var(--sonic-silver)' : 'red')};
  cursor: pointer;

  /* TODO: remove theme here and do it properly */
  &:hover {
    fill: ${(p) => (p.themeVariant === 'light' ? 'var(--gainsboro)' : 'var(--jet)')};
  }

  ${(p) =>
    p.isError &&
    css`
      color: var(--sunset-orange) !important;

      &:hover {
        color: var(--sunset-orange) !important;
      }
    `}
`;
