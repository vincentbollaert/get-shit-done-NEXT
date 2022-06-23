import styled from 'styled-components';
import { useGetTodosQuery, useRemoveTodoMutation, useUpdateTodoMutation } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { AsyncSvgButton, AsyncTextButton, Icon, SpinnerLoader, TextError } from '~/shared/components';
import { useUndoable } from '~/shared/hooks/useUndoable';
import { getAsyncStatus } from '~/shared/utils';
import { Actions, SectionItemStyles, RemoveIconStyles } from '../../shared.styled';
import { AddNewTodo } from './AddNewTodo/AddNewTodo';

const Todos = () => {
  const undoable = useUndoable();
  const getTodosState = useGetTodosQuery();
  const [updateTodo, updateTodoStatus] = useUpdateTodoMutation();
  const [removeTodo, removeTodoStatus] = useRemoveTodoMutation();

  const onRemoveTodo = (todoId: string) => {
    const promise = removeTodo(todoId);
    undoable({ promise, tags: ['Todo'] });
  };

  return (
    <>
      <AddNewTodo />
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
                <RemoveIcon variant="delete" onClick={() => onRemoveTodo(todoId)} />
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
  ${SectionItemStyles};
`;

const AsyncTextButtonStyled = styled(AsyncTextButton)<{ isDone?: boolean }>`
  ${Todo}:hover & {
    color: var(--quick-silver);
  }
  color: ${(p) => (p.isDone ? 'var(--rhythm) !important' : 'var(--isabelline)')};
`;

export const RemoveIcon = styled(Icon)`
  ${RemoveIconStyles};

  ${Todo}:hover & {
    display: block;
  }
`;

export const TodosSpinner = styled(SpinnerLoader)``;
