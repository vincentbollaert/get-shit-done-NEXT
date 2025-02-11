import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { tasksApi, useRemoveTaskMutation, useSaveTaskMutation } from '~/api/requests';
import { ClientModel, Requests, ValueOf } from '~/api/types';
import { AppState, useAppDispatch } from '~/Application/Root';
import { actions, TaskWithMeta } from '~/reducers/calendar';
import { useUndoable } from '~/shared/hooks/useUndoable';


export const useTaskManagement = () => {
  const dispatch = useAppDispatch();
  const [updateTask, updateStatus] = useSaveTaskMutation();
  const [removeTask, removeStatus] = useRemoveTaskMutation();
  const taskBeingEdited = useSelector((state: AppState) => state.calendar.taskBeingEdited);
  const taskBeingEditedClone = useSelector((state: AppState) => state.calendar.taskBeingEditedClone);
  const taskBeingPrepared = useSelector((state: AppState) => state.calendar.taskBeingPrepared);

  const handleTaskEdit = useCallback((task: TaskWithMeta) => {
    dispatch(actions.editTaskPrepare(task));
  }, []);

  const undoable = useUndoable();
  
  const handleTaskRemove = useCallback((task: Requests['RemoveTask']) => {
    const promise = removeTask(task);
    undoable({ promise, tags: ['Task'] });
  }, []);

  const handleTaskUpdate = useCallback((taskData: Requests['SaveTask']) => {
    return updateTask(taskData);
  }, []);

  const handleTaskEditCancel = useCallback(() => {
    dispatch(actions.editTaskCancel());
    
    if (taskBeingEditedClone) {
      dispatch(
        tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
          const taskToUpdate = draft[taskBeingEditedClone.timestamp].tasks.find(
            (task) => task.taskId === taskBeingEditedClone.taskId
          ) as Record<keyof ClientModel['Task'], ValueOf<ClientModel['Task']>>;
          
          if (taskToUpdate) {
            for (const key in taskToUpdate) {
              const taskKey = key as keyof ClientModel['Task'];
              taskToUpdate[taskKey] = taskBeingEditedClone[taskKey];
            }
          }
        })
      );
    }
  }, [taskBeingEditedClone]);

  const handleRemovePreparedTask = useCallback(() => {
    dispatch(actions.removePreparedTask());
  }, []);

  return {
    taskBeingEdited,
    taskBeingPrepared,
    handleTaskEdit,
    handleTaskRemove,
    handleTaskUpdate,
    handleTaskEditCancel,
    handleRemovePreparedTask,
    asyncStatuses: {
      update: updateStatus,
      remove: removeStatus
    }
  };
};
