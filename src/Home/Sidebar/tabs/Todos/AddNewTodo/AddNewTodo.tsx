import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useGetCurrentUserQuery } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { TextField } from '~/shared/components';

type Props = {
  addNewTodo(data: Omit<ClientModel['Todo'], 'todoId'>): void;
};

const Group = ({ className }: { className?: string }) => <div className={className}>group</div>;

export const AddNewTodo = ({ addNewTodo }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: currentUser } = useGetCurrentUserQuery();
  const onSubmit = (data: Omit<ClientModel['Todo'], 'todoId' | 'userId'>) =>
    addNewTodo({ ...data, userId: currentUser!.userId });
  const errorMessage = (errors.todo || {}).type;

  return (
    // TODO: fix later
    <Form onSubmit={handleSubmit(onSubmit as any)}>
      <TextField
        theme="light"
        placeholder="add todo"
        errorMessage={errorMessage}
        ChildComponent={<GroupStyled />}
        {...register('todoName', { required: true })}
      />
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
  color:  #9fa3b2;
  border-radius: 2px;

  ${Form}:hover & {
    display: block;
  }
`;
