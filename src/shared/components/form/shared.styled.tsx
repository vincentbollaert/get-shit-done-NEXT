import styled, { css } from 'styled-components';
import { Icon } from '../Icon/Icon';

export const STYLE_COLOR_LIGHT = 'var(--isabelline)';
export const STYLE_COLOR_DARK = 'red';

const STYLE_BOX_SHADOW_OFFSET = 'inset 0px -1px 0 0px';
export const STYLE_BORDER_COLOR = 'rgba(213, 213, 213, 0.62)';

export const SHADOW_LIGHT = 'inset 0 0px 0px 1px var(--independence)';
export const STYLE_UNDERLINE_HOVER_LIGHT = `${STYLE_BOX_SHADOW_OFFSET} var(--gainsboro)`;
export const STYLE_UNDERLINE_ERROR = `${STYLE_BOX_SHADOW_OFFSET} var(--sunset-orange)`;

export const STYLE_PLACEHOLDER_COLOR_DARK = 'rgba(0, 0, 0, 0.3)';
export const STYLE_PLACEHOLDER_COLOR_LIGHT = 'rgba(255, 255, 255, 0.6)';
export const STYLE_HEIGHT = '3.6rem';

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
  padding-top: var(--size-md);
  padding-left: var(--size-sm);
  width: 100%;
  height: ${STYLE_HEIGHT};
  background-color: #363a46;
  color: var(--isabelline);
  border-radius: 2px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  font-size: var(--font-size-md);
  ${(p) => p.isError && `box-shadow: ${STYLE_UNDERLINE_ERROR}`};

  &:focus {
    ${(p) => `box-shadow: ${p.isError ? STYLE_UNDERLINE_ERROR : STYLE_UNDERLINE_HOVER_LIGHT}`};
  }

  &:hover {
    ${(p) =>
      !p.isError &&
      css`
        box-shadow: ${STYLE_UNDERLINE_HOVER_LIGHT};
      `};
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
