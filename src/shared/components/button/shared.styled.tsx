import React from 'react';
import styled, { css } from 'styled-components';
import { rgbAdjust } from '~/styles';

type SvgButtonWrapProps = React.HTMLAttributes<HTMLButtonElement> & {
  isError?: boolean;
  type?: 'button' | 'submit' | 'reset';
};
export const SvgButtonWrap = styled.button<SvgButtonWrapProps>`
  position: relative;
  cursor: pointer;
  ${(p) =>
    p.isError &&
    css`
      * {
        fill: red;
      }
    `};
`;

// TODO: disabled and type shouldn't have to be typed
type ButtonStyledWrapProps = React.HTMLAttributes<HTMLButtonElement> & {
  isError?: boolean;
  accentColor?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};
export const ButtonStyledWrap = styled.button<ButtonStyledWrapProps>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 0 var(--size-lg);
  height: 3rem;
  border-radius: 1.5rem;
  background-color: var(--capri);
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--font-size-md);
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #58cbff;
    color: var(--white);
  }

  ${(p) =>
    p.accentColor &&
    css`
      background-color: ${p.accentColor};
      color: ${rgbAdjust(p.accentColor, -100)};

      &:hover {
        background-color: ${rgbAdjust(p.accentColor, -20)};
        color: ${rgbAdjust(p.accentColor, -120)};
      }
    `};

  ${(p) =>
    p.isError &&
    css`
      background-color: var(--sunset-orange);
      color: var(--charcoal);

      &:hover {
        background-color: var(--red-orange);
        color: var(--charcoal);
      }
    `};

  &:disabled {
    pointer-events: none;
    background-color: var(--independence);
    color: var(--lavender);
  }
`;
type TextButtonWrapProps = React.HTMLAttributes<HTMLButtonElement> & { isError?: boolean; disabled?: boolean };
export const TextButtonWrap = styled.button<TextButtonWrapProps>`
  display: flex;
  position: relative;
  cursor: pointer;

  &:hover {
    color: var(--white);
  }

  ${(p) =>
    p.isError &&
    css`
      color: var(--sunset-orange) !important;

      &:hover {
        color: var(--sunset-orange) !important;
      }
    `};

  &:disabled {
    pointer-events: none;
    color: var(--lavender);
  }
`;

type AsyncButtonContentProps = React.HTMLAttributes<HTMLDivElement> & { isShow: boolean };
export const AsyncButtonContent = styled.div<AsyncButtonContentProps>`
  opacity: ${(p) => (p.isShow ? 1 : 0)};
  visibility: ${(p) => (p.isShow ? 'visible' : 'hidden')};
`;
