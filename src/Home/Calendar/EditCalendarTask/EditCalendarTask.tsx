import { memo, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { tasksApi, useGetCategoriesQuery } from '~/api/requests';
import { ClientModel, ValueOf } from '~/api/types';
import { useAppDispatch } from '~/Application/Root';
import { actions } from '~/reducers/calendar';
import { AsyncButton, AsyncSvgButton, Dropdown, Icon, ModalFooter, TextField } from '~/shared/components';
import { colors } from '~/shared/constants';
import { useTaskManagement } from '~/shared/hooks/useTaskManagement';
import { TaskFormValues } from '../shared';

// TODO: timestamp should come from taskBeingEdited
export const EditCalendarTask = memo(function EditCalendarTask() {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { taskBeingEdited, handleTaskUpdate, handleTaskRemove, asyncStatuses } = useTaskManagement();
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState(
    categories.find((x) => x.name === taskBeingEdited!.category)!
  );
  const { userId, taskId, time, name, timestamp } = taskBeingEdited!;
  const accentColor = selectedCategory ? colors[selectedCategory.colorId] : undefined;

  const onSubmit: SubmitHandler<TaskFormValues> = (data) => {
    const { name, from, to } = data;
    return handleTaskUpdate({
      taskId,
      name,
      category: selectedCategory.name,
      time: [Number(from), Number(to)],
      timestamp,
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TaskFormValues>();
  const watchedFields = watch();
  const hasValidationErrors = Object.entries(errors).length > 0;

  useEffect(() => {
    if (Object.values(watchedFields).every((x) => !x)) return;

    const formfieldsMapped: ClientModel['Task'] = {
      userId,
      taskId,
      timestamp,
      name: watchedFields.name,
      category: selectedCategory.name,
      time: [Number(watchedFields.from), Number(watchedFields.to)],
    };

    dispatch(
      tasksApi.util.updateQueryData('getTasks', undefined, (draft) => {
        const taskToUpdate = draft[timestamp].tasks.find((task) => task.taskId === taskId) as Record<
          keyof ClientModel['Task'],
          ValueOf<ClientModel['Task']>
        >;
        for (const x in taskToUpdate) {
          const key = x as keyof ClientModel['Task'];
          taskToUpdate[key] = formfieldsMapped[key];
        }
      })
    );
    dispatch(actions.updateEditedTask(formfieldsMapped));
  }, [watchedFields.name, watchedFields.from, selectedCategory.name, watchedFields.to]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        shouldAutoFocus
        isInForm
        defaultValue={name}
        placeholder="name"
        errorMessage={errors.name?.type}
        ariaLabel="name"
        {...register('name', { required: true })}
      />

      <Dropdown
        isInForm
        label="select category"
        activeCategory={selectedCategory}
        categories={categories}
        onSelect={(category) => setSelectedCategory(category)}
      />
      <TextField
        isInForm
        defaultValue={time[0]}
        placeholder="time from"
        errorMessage={errors.from?.type}
        ariaLabel="time-from"
        {...register('from', { required: true })}
      />
      <TextField
        isInForm
        defaultValue={time[1]}
        placeholder="time to"
        errorMessage={errors.to?.type}
        ariaLabel="time-to"
        {...register('to', { required: true })}
      />
      <ModalFooter>
        <AsyncButton
          isDisabled={hasValidationErrors}
          accentColor={accentColor}
          type="submit"
          asyncStatuses={[asyncStatuses.update]}
          ariaLabel="save-task"
        >
          Save task
        </AsyncButton>

        <RemoveButton tooltipPosition="right" asyncStatuses={[asyncStatuses.remove]} ariaLabel="remove-task">
          <Icon 
            isError 
            variant="delete" 
            onClick={() => handleTaskRemove({ taskId, timestamp })} 
          />
        </RemoveButton>
      </ModalFooter>
    </form>
  );
});

export const RemoveButton = styled(AsyncSvgButton)`
  margin-left: var(--size-xlg);
`;
