import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useGetCurrentUserQuery } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { AppState, useAppDispatch } from '~/Application/Root';
import { actions } from '~/reducers/calendar';
import { colors } from '~/shared/themes';
import { ellipsis, rgbAdjust } from '~/styles';
import { determineTimeFromY, placeholderShadow, taskShadow } from '../shared';

type Props = {
  isPlaceholderBeingEdited: boolean;
  timestamp: string;
  hoursDivRef?: React.MutableRefObject<HTMLDivElement | null>;
  y: number;
  timeFromY: number;
  placeholderHeight: number;
  categories: ClientModel['Category'][];
};

export const PlaceholderTask = ({
  isPlaceholderBeingEdited,
  timestamp,
  hoursDivRef,
  y,
  timeFromY,
  placeholderHeight,
  categories,
}: Props) => {
  const dispatch = useAppDispatch();
  const hoursAxis = useSelector((state: AppState) => state.calendar.hoursAxis);
  const taskBeingPrepared = useSelector((state: AppState) => state.calendar.taskBeingPrepared)!;
  const { data: currentUser } = useGetCurrentUserQuery(undefined);
  const [{ yFromTime, heightFromTime }, setYAndHeight] = useState({ yFromTime: y, heightFromTime: placeholderHeight });

  const colorId = categories.find((x) => x.name === taskBeingPrepared?.category)?.colorId;
  const accentColor = colorId ? colors[colorId] : undefined;

  function onPrepareNewTask() {
    const rounded = determineTimeFromY({ y, hoursDivRef, hoursAxis });
    dispatch(
      actions.prepareTask({
        name: '',
        category: '',
        timestamp,
        time: [rounded, rounded + 0.5],
        userId: currentUser!.userId,
      })
    );
  }

  useEffect(() => {
    isPlaceholderBeingEdited && updatePlaceholder();
  }, [taskBeingPrepared?.time]);

  function updatePlaceholder() {
    const yAlg = taskBeingPrepared.time[0] * (placeholderHeight * 2) - hoursAxis[0] * (placeholderHeight * 2);
    const heightAlg = (taskBeingPrepared.time[1] - taskBeingPrepared.time[0]) * placeholderHeight * 2;
    setYAndHeight({ yFromTime: yAlg, heightFromTime: heightAlg });
  }

  return (
    <PlaceholderTaskWrap
      isBeingPrepared={isPlaceholderBeingEdited}
      top={isPlaceholderBeingEdited ? yFromTime : y}
      height={isPlaceholderBeingEdited ? heightFromTime : placeholderHeight}
      onClick={onPrepareNewTask}
      accentColor={accentColor}
    >
      {taskBeingPrepared?.name}
      {!isPlaceholderBeingEdited && <TimeText>{timeFromY}</TimeText>}
    </PlaceholderTaskWrap>
  );
};

export const PlaceholderTaskWrap = styled.div<{
  theme: { bg: string; columnHoverBg: string; placeholderBorder: string };
  isBeingPrepared: boolean;
  top: number;
  height: number;
  accentColor?: string;
}>`
  display: ${(p) => (p.isBeingPrepared ? 'block' : 'none')};
  position: absolute;
  top: ${(p) => p.top}px;
  right: var(--size-xsm);
  left: var(--size-xsm);
  padding: 0 var(--size-xsm);
  height: ${(p) => p.height}px;
  color: ${(p) => (p.accentColor ? rgbAdjust(p.accentColor, -80) : '#444')};
  background-color: ${(p) => p.accentColor || p.theme.bg};
  border-radius: 1px;

  ${(p) =>
    !p.isBeingPrepared &&
    css`
      align-items: center;
      font-weight: 700;
    `};

  ${(p) =>
    !p.accentColor &&
    css`
      box-shadow: ${placeholderShadow(p.theme.columnHoverBg, p.theme.placeholderBorder)};
    `};

  ${(p) =>
    p.accentColor &&
    css`
      ${ellipsis()};
      ${taskShadow(p.theme.columnHoverBg)};
    `};

  .hour-slots:hover & {
    display: flex;
  }
`;

export const TimeText = styled.div`
  display: flex;
  height: var(--size-lg);
  align-content: center;
  pointer-events: none;
`;
