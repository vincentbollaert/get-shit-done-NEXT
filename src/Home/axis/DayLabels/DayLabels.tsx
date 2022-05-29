import format from 'date-fns/format';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import isToday from 'date-fns/isToday';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { AppState } from '~/Application/Root';
import { actions } from '~/reducers/calendar';
import { useFilterRange } from '~/shared/hooks/useFilterRange';
import { useSetCustomRangeLabels } from '~/shared/hooks/useSetCustomRangeLabels';
import { STYLE_COLUMN_MARGIN, STYLE_DAYS_HEIGHT_UNIT, STYLE_HOURS_WIDTH_UNIT } from '~/styles';

export const DayLabels = () => {
  const { daysAxis, focusedTimestamp } = useSelector((state: AppState) => state.calendar);
  const [{ isFiltered, isBeingFiltered, from }, onFilter] = useFilterRange({
    from: 1,
    to: getDaysInMonth(new Date()),
    cb: actions.filterDays,
  });
  const [filteredRange, highlightFilteredRange] = useSetCustomRangeLabels({ isBeingFiltered, isFiltered, from });

  return (
    <Wrap>
      {daysAxis.map((timestamp) => {
        const date = new Date(timestamp);
        const day = Number(format(date, 'd'));
        const dayOfWeek = format(date, 'EEEEE');
        const isCurrentDay = isToday(date);
        const isFocusedTimestamp = timestamp === focusedTimestamp;

        return (
          <DayLabel
            key={day}
            isCurrentDay={isCurrentDay}
            isFiltered={isFiltered}
            isBeingFiltered={isBeingFiltered}
            isActive={filteredRange.includes(day)}
            isFocusedTimestamp={isFocusedTimestamp}
            onMouseEnter={() => highlightFilteredRange(day)}
            onClick={() => onFilter(day)}
          >
            {day} {dayOfWeek}
          </DayLabel>
        );
      })}
    </Wrap>
  );
};

export const Wrap = styled.div<{ theme: { axisBg: string } }>`
  position: absolute;
  top: 0;
  right: 0;
  left: ${STYLE_HOURS_WIDTH_UNIT}rem;
  z-index: 2;
  display: flex;
  padding: 0 ${STYLE_COLUMN_MARGIN}rem;
  height: ${STYLE_DAYS_HEIGHT_UNIT}rem;
  font-size: var(--font-size-md);
  color: var(--gray-x11);
  background-color: var(--cultured);
`;

// TODO: Go over this, there must be a better way
export const DayLabel = styled.div<{
  theme: { axisBg: string; axisBorder: string };
  isBeingFiltered: boolean;
  isCurrentWeek?: boolean;
  isCurrentDay: boolean;
  isActive: boolean;
  isFiltered: boolean;
  isFocusedTimestamp: boolean;
}>`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  justify-content: center;
  position: relative;
  align-items: center;
  cursor: pointer;

  ${(p) =>
    p.isBeingFiltered &&
    css`
      padding-top: 0;
      &::before {
        display: none !important;
      }
    `};

  ${(p) =>
    p.isCurrentWeek &&
    css`
      flex-grow: 2;
    `};

  ${(p) =>
    p.isCurrentDay &&
    css`
      flex-grow: 2;
      box-shadow: inset 1px 0 0 0 var(--arsenic), 1px 0 0 0 var(--arsenic);
      background-color: var(--white);
      color: ${p.theme.axisBg};
    `};

  ${(p) =>
    p.isFocusedTimestamp &&
    css`
      background-color: var(--white);
      color: ${p.theme.axisBg};
    `};

  &:hover {
    color: var(--isabelline);
    background-color: var(--arsenic);

    ${(p) =>
      p.isFiltered &&
      css`
        background-color: inherit;
        color: inherit;
        cursor: inherit;
      `};
  }

  ${(p) =>
    p.isActive &&
    css`
      background-color: var(--arsenic);
      color: var(--isabelline);
    `};
`;
