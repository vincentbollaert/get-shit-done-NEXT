import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { AppState } from '~/Application/Root';
import { actions } from '~/reducers/calendar';
import { useFilterRange } from '~/shared/hooks/useFilterRange';
import { useSetCustomRangeLabels } from '~/shared/hooks/useSetCustomRangeLabels';
import { STYLE_COLUMN_MARGIN, STYLE_DAYS_HEIGHT_UNIT, STYLE_HOURS_WIDTH_UNIT } from '~/styles';

export const HourLabels = () => {
  const { hoursAxis } = useSelector((state: AppState) => state.calendar);
  const [{ isFiltered, isBeingFiltered, from }, onFilter] = useFilterRange({
    from: 0,
    to: 23,
    cb: actions.filterHours,
  });
  const [filteredRange, highlightFilteredRange] = useSetCustomRangeLabels({ isBeingFiltered, isFiltered, from });

  return (
    <Wrap>
      {hoursAxis.map((hour) => (
        <HourLabel
          $isBeingFiltered={isBeingFiltered}
          $isFiltered={isFiltered}
          $isActive={filteredRange.includes(hour)}
          key={hour}
          onMouseEnter={() => highlightFilteredRange(hour)}
          onClick={() => onFilter(hour)}
        >
          {hour}
        </HourLabel>
      ))}
    </Wrap>
  );
};

export const Wrap = styled.div<{ theme: { axisBg: string } }>`
  z-index: 2;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  flex-direction: column;
  margin-top: ${STYLE_DAYS_HEIGHT_UNIT}rem;
  padding: ${STYLE_COLUMN_MARGIN}rem 0;
  width: ${STYLE_HOURS_WIDTH_UNIT}rem;
  font-size: var(--font-size-md);
  background-color: ${(p) => p.theme.axisBg};
`;

export const HourLabel = styled.div<
  React.HTMLProps<HTMLDivElement> & {
    theme: { axisBg: string; axisBorder: string };
    $isFiltered: boolean;
    $isActive: boolean;
    $isBeingFiltered: boolean;
  }
>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border-right: 4px solid ${(p) => p.theme.axisBg};
  text-align: center;
  color: var(--pastel-gray);

  &:hover {
    background-color: ${(p) => (p.$isFiltered ? 'inherit' : 'var(--arsenic)')};
    cursor: ${(p) => (p.$isFiltered ? 'inherit' : 'pointer')};
  }

  ${(p) =>
    p.$isActive &&
    css`
      background-color: var(--arsenic);
      box-shadow:
        inset 4px 0 0 0px ${p.theme.axisBg},
        inset -4px 0 0 0px ${p.theme.axisBg};
    `};
`;
