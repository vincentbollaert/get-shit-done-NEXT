import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useGetCurrentUserQuery } from '~/api/requests';
import { Todo } from '~/api/types';
import { TextField } from '~/shared/components';

type Props = {
  addNewTodo(data: Omit<Todo, 'todoId'>): void;
};

export const AddNewTodo = ({ addNewTodo }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: currentUser } = useGetCurrentUserQuery();
  const onSubmit = (data: Omit<Todo, 'todoId' | 'userId'>) => addNewTodo({ ...data, userId: currentUser!.userId });
  const errorMessage = (errors.todo || {}).type;

  return (
    // TODO: fix later
    <Form onSubmit={handleSubmit(onSubmit as any)}>
      <TextField
        theme="light"
        placeholder="add todo"
        errorMessage={errorMessage}
        {...register('todoName', { required: true })}
      />
    </Form>
  );
};

export const Form = styled.form`
  margin-bottom: var(--size-md);
`;
