import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAddTodoMutation, useGetCurrentUserQuery } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { TextField } from '~/shared/components';

type FormFields = Pick<ClientModel['Todo'], 'todoName'>;

const Group = ({ className }: { className?: string }) => <div className={className}>group</div>;

export const AddNewTodo = () => {
  const [addTodo] = useAddTodoMutation();
  const { register, handleSubmit, formState } = useForm<FormFields>();
  const { data: currentUser } = useGetCurrentUserQuery();

  const errorMessage = (formState.errors.todoName || {}).type;
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    addTodo({ ...data, userId: currentUser!.userId });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        theme="light"
        placeholder="add todo"
        errorMessage={errorMessage}
        {...register('todoName', { required: true })}
      >
        <GroupStyled />
      </TextField>
    </Form>
  );
};

export const Form = styled.form`
  margin-bottom: var(--size-lg);
`;

// TODO: extract
const GroupStyled = styled(Group)`
  display: none;
  position: absolute;
  right: 0;
  bottom: 6px;
  padding: 1px 5px 4px; // stupid fucking font
  background: #4b5063;
  color: #9fa3b2;
  border-radius: 2px;

  ${Form}:hover & {
    display: block;
  }
`;
