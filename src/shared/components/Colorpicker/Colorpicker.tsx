import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '~/shared/constants';
import { rgbAdjust } from '~/styles';
import type { Color } from '../../constants';
import { Icon, type IconProps } from '../Icon/Icon';

type Props = {
  selectedColorValue?: string;
  label?: string;
  setSelectedColor(color: Color): void;
  className?: string;
};

export const Colorpicker = ({ selectedColorValue, label, setSelectedColor, className }: Props) => {
  const [isOpen, toggleIsOpen] = useState(false);

  function handleClick(color: Color) {
    setSelectedColor(color);
    toggleIsOpen(false);
  }
  return (
    <Wrap className={className}>
      <Toggle onClick={() => toggleIsOpen(!isOpen)}>
        <ColorCircle isOpen={isOpen} color={selectedColorValue} />
        {label && <Label>{label}</Label>}
      </Toggle>
      <ColorOptions isOpen={isOpen}>
        {Object.entries(colors).map(([colorId, colorValue]) => {
          const colorAdjusted = rgbAdjust(colorValue, -80);

          return (
            <ColorOption
              isActive={colorValue === selectedColorValue}
              color={colorValue}
              colorAdjusted={colorAdjusted}
              key={colorId}
              onClick={() => handleClick({ colorId, colorValue })}
            >
              <IconStyled
                isActive={colorValue === selectedColorValue}
                variant="invert_colors"
                color={colorValue}
                colorAdjusted={colorAdjusted}
              />
            </ColorOption>
          );
        })}
      </ColorOptions>
    </Wrap>
  );
};

type WrapProps = React.HTMLAttributes<HTMLDivElement>;
export const Wrap = styled.div<WrapProps>`
  flex-grow: 1;
`;

type ToggleProps = React.HTMLAttributes<HTMLDivElement>;
export const Toggle = styled.div<ToggleProps>`
  display: flex;
  align-items: center;
`;

type ColorCircleProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  color?: string;
};
export const ColorCircle = styled.div<ColorCircleProps>`
  width: 16px;
  height: 16px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
  }

  &::before {
    background-color: transparent;
    scale: 1;
    transition: scale 0.1s ease-out;
  }

  &::after {
    background-color: ${(p) => p.color || '#eee'};
    box-shadow: 1px 1px 2px var(--charcoal);
  }

  ${(p) =>
    p.isOpen &&
    css`
      &::before {
        background-color: #5b5e69;
        scale: 1.8;
      }
    `};
`;

export const Label = styled.div``;

type ColorOptionsProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
};
export const ColorOptions = styled.div<ColorOptionsProps>`
  z-index: 1;
  display: ${(p) => (p.isOpen ? 'flex' : 'none')};
  width: 40.8rem;
  background-color: var(--charcoal);
  position: absolute;
  top: 0;
  right: 100%;
  flex-wrap: wrap;
  padding: var(--size-xsm);
  margin-right: 3.6rem;
  background: var(--charcoal);
  box-shadow: 3px 3px 8px -5px var(--charcoal);
`;

type ColorOptionProps = React.HTMLAttributes<HTMLDivElement> & {
  isActive: boolean;
  color: string;
  colorAdjusted: string;
};
export const ColorOption = styled.div<ColorOptionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color: ${(p) => p.color};
  border: 1px solid #fff
    ${(p) =>
      p.isActive &&
      css`
        z-index: 1;
        border: 0;
        box-shadow: 0 0 0 4px ${p.color}, 0px 0 0px 5px ${p.colorAdjusted};
        transition: box-shadow 0.1s ease-out;
      `};

  &:hover {
    z-index: 1;
    border: 0;
    box-shadow: 0 0 0 4px ${(p) => p.color}, 0px 0 0px 5px ${(p) => p.colorAdjusted};
    transition: box-shadow 0.1s ease-out;
  }
`;

type IconStyledProps = IconProps & {
  isActive: boolean;
  color: string;
  colorAdjusted: string;
};
const IconStyled = styled(Icon)<IconStyledProps>`
  display: none;
  color: ${(p) => p.colorAdjusted};

  ${ColorOption}:hover & {
    display: block;
  }

  ${(p) =>
    p.isActive &&
    css`
      display: block;
    `}
`;
