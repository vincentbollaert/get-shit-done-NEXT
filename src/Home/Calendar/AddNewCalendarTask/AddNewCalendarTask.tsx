import { isNull } from 'lodash';
import { memo } from 'react';
import { AsyncButton, Dropdown, ModalFooter, TextField } from '~/shared/components';
import { useAddNewCalendarTask } from './useAddNewCalendarTask';

export const AddNewCalendarTask = memo(function AddNewCalendarTask() {
  const {
    asyncStatus,
    formControl,
    categoriesMappedForSelect,
    selectedCategory,
    watchedFields,
    onSelectHandler,
    onSubmitHandler,
  } = useAddNewCalendarTask();
  const { formState, register } = formControl;

  return (
    <form onSubmit={formControl.handleSubmit(onSubmitHandler)}>
      <TextField
        shouldAutoFocus
        isInForm
        placeholder="name"
        errorMessage={formState.errors.name?.type}
        {...register('name', { required: true, maxLength: 80 })}
      />
      <Dropdown
        isInForm
        label="select category"
        activeItem={
          !isNull(selectedCategory) ? { id: selectedCategory.categoryId, name: selectedCategory.name } : undefined
        }
        list={categoriesMappedForSelect}
        onSelect={onSelectHandler}
      />
      <TextField
        isInForm
        defaultValue={watchedFields[1]}
        placeholder="time from"
        errorMessage={formState.errors.from?.type}
        {...register('from', { required: true })}
      />
      <TextField
        isInForm
        defaultValue={watchedFields[2]}
        placeholder="time to"
        errorMessage={formState.errors.to?.type}
        {...register('to', { required: true })}
      />
      <ModalFooter>
        <AsyncButton
          isDisabled={Object.entries(formState.errors).length > 0}
          accentColor={selectedCategory ? colors[selectedCategory.colorId] : undefined}
          type="submit"
          asyncStatuses={[asyncStatus]}
        >
          Add new task
        </AsyncButton>
      </ModalFooter>
    </form>
  );
});
