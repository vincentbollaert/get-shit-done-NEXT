import { isNull, isUndefined } from 'lodash';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAddTaskMutation, useGetCategoriesQuery, useGetCurrentUserQuery } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { AppState, useAppDispatch } from '~/Application/Root';
import { actions } from '~/reducers/calendar';
import { DropdownItem, DropdownList } from '~/shared/components/form/Dropdown/Dropdown';
import { TaskFormValues } from '../shared';

export const useAddNewCalendarTask = () => {
  const [selectedCategory, setSelectedCategory] = useState<ClientModel['Category'] | null>(null);
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [addNewTask, asyncStatus] = useAddTaskMutation();
  const dispatch = useAppDispatch();
  const { taskBeingPrepared } = useSelector((state: AppState) => state.calendar);
  const formControl = useForm<TaskFormValues>();

  // TODO: find out way to not fight with TS like this everyehre
  const { timestamp, time } = taskBeingPrepared!;

  const onSubmitHandler: SubmitHandler<TaskFormValues> = ({ name, from, to }) => {
    if (isNull(selectedCategory) || isUndefined(currentUser)) return;

    addNewTask({
      name,
      time: [Number(from), Number(to)],
      timestamp,
      category: selectedCategory.name,
      userId: currentUser.userId,
    });
  };

  const onSelectHandler = (item: DropdownItem) => {
    const category = categories.find((c) => c.categoryId === item.id);
    category && setSelectedCategory(category);
  };

  const watchedFields = formControl.watch(['name', 'from', 'to']);
  const categoriesMappedForSelect: DropdownList = categories.map((category) => ({
    id: category.categoryId,
    name: category.name,
  }));

  useEffect(() => {
    const [name, from = time[0], to = time[1]] = watchedFields;
    if (watchedFields.some((field) => isUndefined(field))) return;
    if (isNull(selectedCategory) || isUndefined(currentUser)) return;

    dispatch(
      actions.prepareTask({
        timestamp,
        name,
        time: [Number(from), Number(to)],
        category: selectedCategory.name,
        userId: currentUser.userId,
      })
    );
  }, [watchedFields, timestamp, time, selectedCategory, currentUser, dispatch]);

  return {
    asyncStatus,
    formControl,
    categoriesMappedForSelect,
    watchedFields,
    selectedCategory,
    onSelectHandler,
    onSubmitHandler,
  };
};
