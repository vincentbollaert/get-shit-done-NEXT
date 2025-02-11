import { isToday } from 'date-fns/isToday';
import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGetTasksQuery } from '~/api/requests';
import { AppState } from '~/Application/Root';
import { CN_LOADER, Modal, SpinnerLoader } from '~/shared/components';
import { useTaskManagement } from '~/shared/hooks/useTaskManagement';
import { mapTasksByDay } from '~/shared/utils';
import { AddNewCalendarTask } from './AddNewCalendarTask/AddNewCalendarTask';
import { CalendarColumn } from './Column/CalendarColumn';
import { EditCalendarTask } from './EditCalendarTask/EditCalendarTask';

const CalendarColumns = () => {
  const { data: allTasksByDay } = useGetTasksQuery();
  const daysAxis = useSelector((state: AppState) => state.calendar.daysAxis);
  const hoursAxis = useSelector((state: AppState) => state.calendar.hoursAxis);
  const allTasksByDayMapped = useMemo(() => mapTasksByDay(hoursAxis, allTasksByDay), [hoursAxis, allTasksByDay]);

  return (
    <>
      {daysAxis.map((timestamp) => (
        <CalendarColumn
          key={timestamp}
          isCurrentDay={isToday(new Date(timestamp))}
          timestamp={timestamp}
          tasksFiltered={allTasksByDayMapped[timestamp]?.tasks}
        />
      ))}
    </>
  );
};

export const Calendar = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useGetTasksQuery();
  const {
    taskBeingEdited,
    taskBeingPrepared,
    handleTaskEditCancel,
    handleRemovePreparedTask
  } = useTaskManagement();

  return (
    <Wrap ref={wrapRef}>
      <CalendarLoader size={10} isLoading={isLoading} />
      <CalendarColumns />

      <Modal isVisible={!!taskBeingEdited} title="task details" width={17} onOverlayToggle={handleTaskEditCancel}>
        <EditCalendarTask />
      </Modal>

      <Modal isVisible={!!taskBeingPrepared} title="task details" width={17} onOverlayToggle={handleRemovePreparedTask}>
        <AddNewCalendarTask />
      </Modal>
    </Wrap>
  );
};

export const Wrap = styled.main<{ ref: React.RefObject<HTMLDivElement | null>; children: React.ReactNode }>`
  position: relative;
  display: flex;
  flex-grow: 1;
`;

export const CalendarLoader = styled(SpinnerLoader)`
  .${CN_LOADER} {
    padding: var(--size-sm);
    border: 1px solid #eee;
    border-radius: 50%;
    background-color: #fff;
  }
`;
