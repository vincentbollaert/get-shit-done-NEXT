import React from 'react';
import isToday from 'date-fns/isToday';
import { useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { tasksApi, useGetTasksQuery } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { AppState, useAppDispatch } from '~/Application/Root';
import { actions } from '~/reducers/calendar';
import { CN_LOADER, Modal, SpinnerLoader } from '~/shared/components';
import { makeDaysAxis, makeHoursAxis } from '~/shared/selectors';
import { mapTasksByDay } from '~/shared/utils';
import { AddNewCalendarTask } from './AddNewCalendarTask/AddNewCalendarTask';
import { CalendarColumn } from './Column/CalendarColumn';
import { EditCalendarTask } from './EditCalendarTask/EditCalendarTask';
import { ValueOf } from '~/api/types';

const CalendarColumns = () => {
  const { data: allTasksByDay } = useGetTasksQuery();
  const daysAxis = useSelector(makeDaysAxis);
  const hoursAxis = useSelector(makeHoursAxis);
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
  const dispatch = useAppDispatch();
  const { isLoading } = useGetTasksQuery();
  const taskBeingEdited = useSelector((state: AppState) => state.calendar.taskBeingEdited);
  const taskBeingEditedClone = useSelector((state: AppState) => state.calendar.taskBeingEditedClone);
  const taskBeingPrepared = useSelector((state: AppState) => state.calendar.taskBeingPrepared);

  const onRemovePreparedTask = useCallback(() => {
    dispatch(actions.removePreparedTask());
  }, []);
  const onEditTaskCancel = useCallback(() => {
    dispatch(actions.editTaskCancel());

    // TODO: create util out of this as its common
    dispatch(
      tasksApi.util.updateQueryResult('getTasks', undefined, (draft) => {
        const taskToUpdate = draft[taskBeingEditedClone!.timestamp].tasks.find(
          (task) => task.taskId === taskBeingEditedClone!.taskId
        ) as Record<keyof ClientModel['Task'], ValueOf<ClientModel['Task']>>;
        for (const task in taskToUpdate) {
          const key = task as keyof ClientModel['Task'];
          taskToUpdate[key] = taskBeingEditedClone![key];
        }
      })
    );
  }, [taskBeingEditedClone]);

  return (
    <Wrap ref={wrapRef}>
      <CalendarLoader size={10} isLoading={isLoading} />
      <CalendarColumns />

      <Modal isVisible={!!taskBeingEdited} title="task details" width={17} onOverlayToggle={onEditTaskCancel}>
        <EditCalendarTask />
      </Modal>

      <Modal isVisible={!!taskBeingPrepared} title="task details" width={17} onOverlayToggle={onRemovePreparedTask}>
        <AddNewCalendarTask />
      </Modal>
    </Wrap>
  );
};

export const Wrap = styled.div<{ ref: React.RefObject<HTMLDivElement | null>; children: React.ReactNode }>`
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
