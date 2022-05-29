import { memo, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAddTaskMutation, useGetCurrentUserQuery, useGetGroupsQuery } from '~/api/requests';
import { AppState, useAppDispatch } from '~/Application/Root';
import { actions } from '~/reducers/calendar';
import { AsyncButton, Dropdown, ModalFooter, TextField } from '~/shared/components';
import { colors } from '~/shared/themes';
import { TaskFormValues } from '../shared';

export const AddNewCalendarTask = memo(function AddNewCalendarTask() {
  const { data: groups = [] } = useGetGroupsQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [addNewTask, asyncStatusAdd] = useAddTaskMutation();
  const dispatch = useAppDispatch();
  const { taskBeingPrepared } = useSelector((state: AppState) => state.calendar);
  const { timestamp, time } = taskBeingPrepared!;
  const [selectedGroup, setSelectedGroup] = useState(groups.find((x) => x.name === 'improvement')!);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TaskFormValues>();
  const onSubmit: SubmitHandler<TaskFormValues> = ({ name, from, to }) => {
    // TODO: is coercing to number necessary here?
    addNewTask({
      name,
      time: [Number(from), Number(to)],
      timestamp,
      group: selectedGroup.name,
      userId: currentUser!.userId,
    });
  };
  const [name, from = time[0], to = time[1]] = watch(['name', 'from', 'to']);
  const accentColor = selectedGroup ? colors[selectedGroup.colorId] : undefined;

  useEffect(() => {
    if ([name, from, to].some((x) => x === undefined)) return;
    dispatch(
      actions.prepareTask({
        timestamp,
        name,
        time: [Number(from), Number(to)],
        group: selectedGroup?.name,
        userId: currentUser!.userId,
      })
    );
  }, [name, from, to, selectedGroup.name]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        shouldAutoFocus
        isInForm
        defaultValue=""
        theme="light"
        placeholder="name"
        errorMessage={errors.name?.type}
        {...register('name', { required: true, maxLength: 80 })}
      />
      <Dropdown
        isInForm
        theme="light"
        label="select group"
        activeGroup={selectedGroup}
        groups={groups}
        onSelect={(group) => setSelectedGroup(group)}
      />
      <TextField
        isInForm
        defaultValue={time[0]}
        theme="light"
        placeholder="time from"
        errorMessage={errors.from?.type}
        {...register('from', { required: true })}
      />
      <TextField
        isInForm
        defaultValue={time[1]}
        theme="light"
        placeholder="time to"
        errorMessage={errors.to?.type}
        {...register('to', { required: true })}
      />
      <ModalFooter>
        <AsyncButton
          isDisabled={Object.entries(errors).length > 0}
          accentColor={accentColor}
          type="submit"
          asyncStatuses={[asyncStatusAdd]}
        >
          Add new task
        </AsyncButton>
      </ModalFooter>
    </form>
  );
});
