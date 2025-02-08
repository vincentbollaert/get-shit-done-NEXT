import React, { memo, ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  isVisible: boolean;
  tooltipPosition?: 'left' | 'right';
  tooltipText?: string;
  children: ReactElement;
  className?: string;
}
export const Tooltip = memo(function Tooltip({
  isVisible,
  tooltipPosition = 'left',
  tooltipText,
  children,
  className,
}: Props) {
  // TODO: see if isVisible needs to be passed in
  return !isVisible ? null : (
    <Wrap className={className}>
      {tooltipText && (
        <TooltipText isError={false} tooltipPosition={tooltipPosition}>
          {tooltipText}
        </TooltipText>
      )}
      <Content>{children}</Content>
    </Wrap>
  );
});

export const Wrap = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: flex;
  /* position: absolute; */
  /* right: 0; */
  align-items: center;
  cursor: pointer;
`;

type TooltipTextProps = React.HTMLAttributes<HTMLDivElement> & {
  isError: boolean; tooltipPosition: 'left' | 'right'
}
export const TooltipText = styled.div<TooltipTextProps>`
  visibility: hidden;
  position: absolute;
  padding: 1rem var(--size-lg);
  line-height: 1.1;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  background-color: var(--sunset-orange);
  color: rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border-radius: 0.2rem;
  white-space: nowrap;

  &::before {
    content: '';
    position: absolute;
    border-style: solid;
    width: 0;
    height: 0;
    border-width: 0.6rem;
    border-color: transparent;
  }

  ${Wrap}:hover & {
    visibility: visible;
    transition: margin 0.2s ease-out, visibility 0.4s ease-out;
  }

  ${(p) =>
    p.tooltipPosition === 'left' &&
    css`
      right: 100%;
      border-right: 0.2rem solid var(--sunset-orange);
      margin-right: var(--size-md);

      ${Wrap}:hover & {
        margin-right: var(--size-lg);
      }

      &::before {
        left: 100%;
        border-right-width: 0;
        border-left-color: var(--sunset-orange);
      }
    `};

  ${(p) =>
    p.tooltipPosition === 'right' &&
    css`
      left: 100%;
      border-left: 0.2rem solid var(--sunset-orange);
      margin-left: var(--size-md);

      ${Wrap}:hover & {
        margin-left: var(--size-lg);
      }

      &::before {
        right: 100%;
        border-left-width: 0;
        border-right-color: var(--sunset-orange);
      }
    `};
`;

export const Content = styled.div``;
