import styled, { css } from 'styled-components';
import { rgbAdjust } from '~/styles';

export const SvgButtonWrap = styled.button<{ isError?: boolean }>`
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

export const ButtonStyledWrap = styled.button<{ isError?: boolean; accentColor?: string }>`
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
export const TextButtonWrap = styled.button<{ isError?: boolean }>`
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

export const AsyncButtonContent = styled.div<{ isShow: boolean }>`
  opacity: ${(p) => (p.isShow ? 1 : 0)};
  visibility: ${(p) => (p.isShow ? 'visible' : 'hidden')};
`;
