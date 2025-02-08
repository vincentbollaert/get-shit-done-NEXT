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
  theme?: string;
  variant: IconVariant;
  size?: number;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
};

export const Icon = ({ isError = false, theme = 'light', variant, size = 2, className, onClick }: IconProps) => {
  return (
    <Wrap
      isError={isError}
      size={size}
      theme={theme}
      className={clsx(className, 'material-icons-outlined')}
      onClick={onClick}
    >
      {variant}
    </Wrap>
  );
};

const Wrap = styled.span<React.HTMLAttributes<HTMLSpanElement> & { size: number; theme: string; isError: boolean }>`
  font-size: ${(p) => p.size}rem;
  color: ${(p) => (p.theme === 'light' ? 'var(--sonic-silver)' : 'red')};
  cursor: pointer;

  /* TODO: remove theme here and do it properly */
  &:hover {
    fill: ${(p) => (p.theme === 'light' ? 'var(--gainsboro)' : 'var(--jet)')};
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
