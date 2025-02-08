import { memo } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  isToday: boolean;
  hoursAxis: number[];
  placeholderHeight: number;
};

const HourMarkersUnMemoed = ({ isToday, hoursAxis, placeholderHeight }: Props) => {
  const shadow = hoursAxis.map((x, i, a) => {
    const hourHeight = (i + 1) * (placeholderHeight * 2);
    const commaOrBlank = i === a.length - 1 ? '' : ',';
    return `inset 0px ${hourHeight}px 0px 0px var(--cultured), inset 0px ${
      hourHeight + 1
    }px 0px 0px var(--arsenic)${commaOrBlank}`;
  });

  if (isToday) {
    return (
      <>
        <Wrap $isToday $shadow={shadow} />
        <Wrap $isTomorrow $shadow={shadow} />
      </>
    );
  }
  return <Wrap $isToday={false} $shadow={shadow} />;
};

function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.placeholderHeight !== 0 && prevProps.hoursAxis.length === nextProps.hoursAxis.length;
}

export const HourMarkers = memo(HourMarkersUnMemoed, areEqual);

export const Wrap = styled.div<{ $isToday?: boolean; $isTomorrow?: boolean; $shadow: string[] }>`
  position: absolute;
  top: 1.2rem;
  left: 0;
  bottom: 1.2rem;
  width: 1px;

  ${(p) =>
    p.$isToday || p.$isTomorrow
      ? css`
          top: 0;
          bottom: 0;
          border-top: 1.2rem solid var(--arsenic);
          border-bottom: 1.2rem solid var(--arsenic);
          box-shadow: inset 1px 0px 0px var(--arsenic);
        `
      : css`
          box-shadow: ${p.$shadow};
        `};

  ${(p) =>
    p.$isTomorrow &&
    css`
      left: auto;
      right: -1px;
      z-index: 1;
    `}
`;
