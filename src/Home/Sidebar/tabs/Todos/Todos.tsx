import styled from 'styled-components';
import { useAddTodoMutation, useGetTodosQuery, useRemoveTodoMutation, useUpdateTodoMutation } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { AsyncSvgButton, AsyncTextButton, Icon, SpinnerLoader, TextError } from '~/shared/components';
import { useUndoable } from '~/shared/hooks/useUndoable';
import { getAsyncStatus } from '~/shared/utils';
import { AddNewTodo } from './AddNewTodo/AddNewTodo';

const Todos = () => {
  const undoable = useUndoable();
  const getTodosState = useGetTodosQuery();
  const [updateTodo, updateTodoStatus] = useUpdateTodoMutation();
  const [removeTodo, removeTodoStatus] = useRemoveTodoMutation();
  const [addTodo] = useAddTodoMutation();

  const onRemoveTodo = (todoId: string) => {
    const promise = removeTodo(todoId);
    undoable({ promise, tags: ['Todo'] });
  };

  return (
    <>
      <AddNewTodo addNewTodo={(todo) => addTodo(todo)} />
      <TodosSpinner size={4} isLoading={getTodosState.isLoading} />
      <TextError errorMessage={getAsyncStatus(getTodosState)?.errorMessage} />

      {getTodosState.data?.map(({ todoId, todoName, isDone }: ClientModel['Todo']) => {
        const asyncStatusRemove = getAsyncStatus(removeTodoStatus, todoId);
        const asyncStatusUpdate = getAsyncStatus(updateTodoStatus, todoId);
        return (
          <Todo key={todoId} onClick={() => updateTodo({ todoId, isDone: !isDone })}>
            <AsyncTextButtonStyled
              showErrorIcon={false}
              showSpinner={false}
              isDone={isDone}
              asyncStatuses={[asyncStatusUpdate]}
              type="button"
            >
              {todoName}
            </AsyncTextButtonStyled>
            <Actions>
              <AsyncSvgButton asyncStatuses={[asyncStatusRemove]}>
                <RemoveIcon theme="light" variant="delete" onClick={() => onRemoveTodo(todoId)} />
              </AsyncSvgButton>
            </Actions>
          </Todo>
        );
      })}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Todos;

export const Todo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: var(--size-xsm);
  padding: var(--size-xsm) var(--size-lg) var(--size-xsm) 0;
  cursor: pointer;
  line-height: 1.5;
`;

const AsyncTextButtonStyled = styled(AsyncTextButton)<{ isDone?: boolean }>`
  ${Todo}:hover & {
    color: var(--quick-silver);
  }
  color: ${(p) => (p.isDone ? 'var(--rhythm) !important' : 'var(--isabelline)')};
`;

export const Actions = styled.div`
  position: absolute;
  right: 0;
  display: flex;
`;

export const RemoveIcon = styled(Icon)`
  display: none;
  margin-left: var(--size-lg);

  &:hover {
    color: var(--sunset-orange);
  }

  ${Todo}:hover & {
    display: block;
  }
`;

export const TodosSpinner = styled(SpinnerLoader)``;
