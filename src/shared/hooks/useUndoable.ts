import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { tasksApi } from '~/api/requests';
import { AppState, useAppDispatch } from '~/Application/Root';

export const useUndoable = () => {
  const dispatch = useAppDispatch();
  const undoId = useSelector((state: AppState) => state.toast.undoId);
  const [undoParams, setUndoParams] = useState<any>();

  const undoable = (params: { tags: string[]; promise: any }) => {
    setUndoParams(params);
  };

  useEffect(() => {
    if (!undoId || !undoParams) return;
    console.log(undoParams);
    undoParams.promise.abort();
    dispatch(tasksApi.util.invalidateTags(undoParams.tags as any));
  }, [undoId]);

  return undoable;
};
