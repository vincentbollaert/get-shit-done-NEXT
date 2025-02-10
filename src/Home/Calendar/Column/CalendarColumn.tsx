import { memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useGetCategoriesQuery } from '~/api/requests';
import { AppState } from '~/Application/Root';
import { TaskWithMeta } from '~/reducers/calendar';
import { determinePlaceholderHeight } from '~/shared/utils';
import { STYLE_COLUMN_MARGIN } from '~/styles';
import { CurrentTime } from '../CurrentTime/CurrentTime';
import { PlaceholderTask } from '../PlaceholderTask/PlaceholderTask';
import { CN_COLUMN, CN_HOUR_SLOTS, determineTimeFromY } from '../shared';
import { Task } from '../Task/Task';
import { HourMarkers } from './HourMarkers/HourMarkers';

type Props = {
  timestamp: string;
  isCurrentDay: boolean;
  tasksFiltered: TaskWithMeta[];
};

export const CalendarColumn = memo(function CalendarColumn({ timestamp, isCurrentDay, tasksFiltered = [] }: Props) {
  const { data: categories = [] } = useGetCategoriesQuery();
  const hoursAxis = useSelector((state: AppState) => state.calendar.hoursAxis);
  const taskBeingEdited = useSelector((state: AppState) => state.calendar.taskBeingEdited);
  const taskBeingPrepared = useSelector((state: AppState) => state.calendar.taskBeingPrepared);
  // console.log('COMP: CalendarColumn')

  const [y, setY] = useState(0);
  const [showPlaceholder, setPlaceholderShow] = useState(false);
  const [timeFromY, setTimeFromY] = useState(0);
  const hoursDivRef = useRef<HTMLDivElement>(null);
  const isPlaceholderBeingEdited = taskBeingPrepared?.timestamp === timestamp;
  // TODO: move to memoized hook
  const placeholderHeight = determinePlaceholderHeight({ wrapRef: hoursDivRef, hoursAxis });

  function updatePlaceholderTask(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const hoursHeight = hoursDivRef?.current?.getBoundingClientRect().height || 0;
    const columnTopPx = event.currentTarget.getBoundingClientRect().top;
    const placeholderY = event.clientY - columnTopPx - placeholderHeight / 4;
    if (placeholderY < 0 || placeholderY > hoursHeight) {
      return;
    }
    const newY = Math.floor(placeholderY / (placeholderHeight / 2)) * (placeholderHeight / 2);
    const isNewNearest = newY !== y;
    if (isNewNearest) {
      const rounded = determineTimeFromY({ y: newY, hoursDivRef, hoursAxis });
      setY(newY);
      setTimeFromY(rounded);
    }
  }

  return (
    <Wrap
      $isCurrentDay={isCurrentDay}
      className={CN_COLUMN}
      $isDayBeingEdited={tasksFiltered.find((x) => x.taskId === (taskBeingEdited || {}).taskId) !== undefined}
    >
      <HourMarkers isToday={isCurrentDay} hoursAxis={hoursAxis} placeholderHeight={placeholderHeight} />
      {isCurrentDay && <CurrentTime />}

      <HourSlotsWrap>
        <HourSlots
          ref={hoursDivRef}
          onMouseMove={updatePlaceholderTask}
          onMouseEnter={() => setPlaceholderShow(true)}
          onMouseLeave={() => setPlaceholderShow(false)}
          className={CN_HOUR_SLOTS}
          data-testid="hour-slots"
        >
          {tasksFiltered.map((task) => (
            <Task
              key={task.taskId || 'new-task'}
              task={task}
              isBeingEdited={taskBeingEdited?.taskId === task.taskId}
              categories={categories}
            />
          ))}
          {(showPlaceholder || isPlaceholderBeingEdited) && (
            <PlaceholderTask
              isPlaceholderBeingEdited={isPlaceholderBeingEdited}
              timestamp={timestamp}
              hoursDivRef={hoursDivRef}
              y={y}
              timeFromY={timeFromY}
              placeholderHeight={placeholderHeight}
              categories={categories}
            />
          )}
        </HourSlots>
      </HourSlotsWrap>
    </Wrap>
  );
});

type StyledWrap = {
  theme: { columnBorder: string };
  $isCurrentDay: boolean;
  $isDayBeingEdited: boolean;
  children: React.ReactNode;
  className?: string;
};

export const Wrap = styled.div<StyledWrap>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  width: 0;

  ${(p) =>
    p.$isCurrentDay &&
    css`
      flex-grow: 2;
    `}

  ${(p) =>
    p.$isDayBeingEdited &&
    css`
      background-color: ${p.theme.columnHoverBg};
    `};

  &:hover {
    background-color: ${(p) => p.theme.columnHoverBg};
  }
`;

export const HourSlotsWrap = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: ${STYLE_COLUMN_MARGIN}rem 0;
`;

interface HourSlotsProps {
  ref: React.RefObject<HTMLDivElement | null>;
  onMouseMove: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  className: string;
  children: React.ReactNode;
}

export const HourSlots = styled.div<HourSlotsProps>`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
