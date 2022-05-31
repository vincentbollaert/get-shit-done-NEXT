import styled, { css } from 'styled-components';
import { STYLE_PLACEHOLDER_COLOR_DARK, STYLE_PLACEHOLDER_COLOR_LIGHT } from '../shared.styled';

export const Placeholder = styled.div<{ isError?: boolean; hasValue: boolean }>`
  position: absolute;
  top: 50%;
  left: var(--size-sm);
  color: ${(p) => (p.theme === 'light' ? STYLE_PLACEHOLDER_COLOR_LIGHT : STYLE_PLACEHOLDER_COLOR_DARK)};
  ${(p) => p.isError && 'color: var(--sunset-orange)'};
  pointer-events: none;
  transform: translateY(-50%);
  transition: top 0.1s ease-out, transform 0.1s ease-out, font-size 0.1s ease-out;

  ${(p) =>
    p.hasValue &&
    css`
      top: var(--size-xsm);
      font-size: var(--font-size-xsm);
      transform: translateY(0);
    `};
`;
