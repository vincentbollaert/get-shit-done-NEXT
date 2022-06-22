import { useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '~/shared/constants';
import type { Color } from '../../constants';

type Props = {
  selectedColorValue: string;
  label: string;
  setSelectedColor(color: Color): void;
};

export const Colorpicker = ({ selectedColorValue, label, setSelectedColor }: Props) => {
  const [isOpen, toggleIsOpen] = useState(false);

  function handleClick(color: Color) {
    setSelectedColor(color);
    toggleIsOpen(false);
  }
  return (
    <Wrap>
      <Toggle onClick={() => toggleIsOpen(!isOpen)}>
        <ColorCircle isOpen={isOpen} color={selectedColorValue} />
        <Label>{label}</Label>
      </Toggle>
      <ColorOptions isOpen={isOpen}>
        {Object.entries(colors).map(([colorId, colorValue]) => (
          <ColorOption
            isActive={colorValue === selectedColorValue}
            color={colorValue}
            key={colorId}
            onClick={() => handleClick({ colorId, colorValue })}
          />
        ))}
      </ColorOptions>
    </Wrap>
  );
};

export const Wrap = styled.div`
  flex-grow: 1;
`;

export const Toggle = styled.div`
  display: flex;
  align-items: center;
`;

export const ColorCircle = styled.div<{ isOpen: boolean; color: string }>`
  position: relative;
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

export const Label = styled.div`
  margin-left: var(--size-sm);
  /* flex-grow: 1; */
`;

export const ColorOptions = styled.div<{ isOpen: boolean }>`
  z-index: 1;
  display: ${(p) => (p.isOpen ? 'flex' : 'none')};
  width: 20.8rem;
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

export const ColorOption = styled.div<{ isActive: boolean; color: string }>`
  width: 4rem;
  height: 4rem;
  background-color: ${(p) => p.color};

  ${(p) =>
    p.isActive &&
    css`
      z-index: 1;
      box-shadow: 0 0 0 1px var(--charcoal);
    `};

  &:hover {
    z-index: 1;
    box-shadow: 0 0 0 1px var(--charcoal);
  }
`;
