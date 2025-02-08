import styled, { css } from 'styled-components';
import { STYLE_PLACEHOLDER_COLOR_DARK, STYLE_PLACEHOLDER_COLOR_LIGHT } from '../shared.styled';
import React from 'react';

type PlaceholderProps = React.HTMLAttributes<HTMLDivElement> & {
  $isError?: boolean;
  $hasValue: boolean;
  $themeVariant: 'light' | 'dark';
};
export const Placeholder = styled.div<PlaceholderProps>`
  position: absolute;
  top: 50%;
  left: 0;
  color: ${(p) => (p.$themeVariant === 'light' ? STYLE_PLACEHOLDER_COLOR_LIGHT : STYLE_PLACEHOLDER_COLOR_DARK)};
  ${(p) => p.$isError && 'color: var(--sunset-orange)'};
  pointer-events: none;
  transform: translateY(-50%);
  transition:
    top 0.1s ease-out,
    transform 0.1s ease-out,
    font-size 0.1s ease-out;

  ${(p) =>
    p.$hasValue &&
    css`
      top: 0;
      font-size: var(--font-size-xsm);
      transform: translateY(0);
    `};
`;
