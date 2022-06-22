import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useRemoveTaskMutation } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { useAppDispatch } from '~/Application/Root';
import { actions, TaskWithMeta } from '~/reducers/calendar';
import { useUndoable } from '~/shared/hooks/useUndoable';
import { makeHoursAxis } from '~/shared/selectors';
import { colors } from '~/shared/constants';
import { ellipsis, rgbAdjust } from '~/styles';
import { CN_COLUMN, CN_TASK_GAP, taskShadow, taskShadowBeingEdited } from '../shared';

type Props = {
  task: TaskWithMeta;
  isBeingEdited: boolean;
  categories: ClientModel['Category'][];
};
export const Task = memo(function Task({ task, categories = [], isBeingEdited }: Props) {
  const undoable = useUndoable();
  const [removeTask] = useRemoveTaskMutation();
  const dispatch = useAppDispatch();

  const { category, name, gapBefore, gapAfter, heightInFlex } = task;
  const hoursAxis = useSelector(makeHoursAxis);
  const { colorId } = categories.find((x) => x.name === category) || {};
  const accentColor = colorId ? colors[colorId] : '000';

  const onRemoveTask = (task: TaskWithMeta) => {
    const promise = removeTask(task);
    undoable({ promise, tags: ['Task'] });
  };

  return (
    <>
      {!!gapBefore && <CellGap className={CN_TASK_GAP} flex={gapBefore} />}
      {!!heightInFlex && (
        <Cell
          flex={heightInFlex}
          accentColor={accentColor}
          isSmall={hoursAxis.length > 16 && heightInFlex <= 0.25}
          isBeingEdited={isBeingEdited}
          onClick={() => dispatch(actions.editTaskPrepare(task))}
          onAuxClick={() => onRemoveTask(task)}
        >
          {name}
        </Cell>
      )}
      {!!gapAfter && <CellGap className={CN_TASK_GAP} flex={gapAfter} />}
    </>
  );
});

type CellProps = {
  theme: { bg: string };
  isBeingEdited: boolean;
  flex: number;
  accentColor: string;
  isSmall: boolean;
};

export const Cell = styled.div<CellProps>`
  ${ellipsis()};
  z-index: 1;
  position: relative;
  display: flex;
  flex-grow: ${(p) => p.flex};
  justify-content: center;
  flex-shrink: 0;
  flex-basis: 0;
  margin: 0 var(--size-xsm);
  align-items: center;
  border-radius: 1px;
  ${(p) => taskShadow(p.theme.bg)}
  background-color: ${(p) => p.accentColor};
  display: block;
  padding: 0 var(--size-sm);
  line-height: 1.5;
  color: ${(p) => rgbAdjust(p.accentColor, -80)};
  cursor: pointer;

  &:hover {
    background-color: ${(p) => rgbAdjust(p.accentColor, -10)};
  }

  .${CN_COLUMN}:hover & {
    ${(p) => taskShadow(p.theme.columnHoverBg)};
  }

  ${(p) =>
    p.isBeingEdited &&
    css`
      background-color: ${rgbAdjust(p.accentColor, -10)};
      ${taskShadowBeingEdited(p.theme.columnHoverBg)};
    `};

  ${(p) =>
    p.isSmall &&
    css`
      line-height: 0.8;
      font-size: var(--font-size-sm);
    `};
`;

export const CellGap = styled.div<{ flex: number }>`
  z-index: 0;
  display: flex;
  flex-grow: ${(p) => p.flex};
  flex-shrink: 0;
  flex-basis: 0;
  border-radius: 1px;
`;
