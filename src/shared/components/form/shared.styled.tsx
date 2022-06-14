import styled, { css } from 'styled-components';
import { Icon } from '../Icon/Icon';

export const STYLE_COLOR_LIGHT = 'var(--isabelline)';
export const STYLE_COLOR_DARK = 'red';

export const STYLE_BORDER_COLOR = 'rgba(213, 213, 213, 0.62)';

export const COLOR_UNDERLINE = 'var(--independence)';
export const COLOR_UNDERLINE_HOVER_LIGHT = 'var(--gainsboro)';
export const COLOR_UNDERLINE_ERROR = 'var(--sunset-orange)';

export const STYLE_PLACEHOLDER_COLOR_DARK = 'rgba(0, 0, 0, 0.3)';
export const STYLE_PLACEHOLDER_COLOR_LIGHT = 'rgba(255, 255, 255, 0.6)';
export const HEIGHT = '3.2rem';

export const Wrap = styled.div<{ isInForm: boolean }>`
  display: flex;
  position: relative;
  color: ${(p) => (p.theme === 'light' ? STYLE_COLOR_LIGHT : STYLE_COLOR_DARK)};
  outline: none;

  ${(p) =>
    p.isInForm &&
    css`
      margin-top: var(--size-sm);

      &:first-child {
        margin-top: 0;
      }
    `};
`;

export const Input = styled.input<{ isError?: boolean }>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(p) => (p.isError ? COLOR_UNDERLINE_ERROR : COLOR_UNDERLINE)};
  padding: 0;
  padding-top: var(--size-sm);
  width: 100%;
  height: ${HEIGHT};
  background-color: transparent;
  color: var(--isabelline);
  font-size: var(--font-size-md);

  &:focus {
    border-color: ${(p) => p.isError ? COLOR_UNDERLINE_ERROR : COLOR_UNDERLINE_HOVER_LIGHT};
  }

  &:hover {
    border-color: ${(p) => (p.isError ? 'red' : COLOR_UNDERLINE_HOVER_LIGHT)};
  }
`;

export const IconStyled = styled(Icon)`
  position: absolute;
  right: var(--size-xsm);
  transform: translate(0, -50%);
  top: 50%;
  width: 1.2rem;
  height: 1.2rem;

  ${Wrap}:hover & {
    color: var(--gainsboro);
  } ;
`;
