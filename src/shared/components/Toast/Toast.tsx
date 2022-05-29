import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState, useAppDispatch } from '~/Application/Root';
import { actions } from '~/reducers/toast';

export const Toast = memo(function Toast() {
  const timeoutIdRef = useRef<undefined | number>();
  const timeRemainingRef = useRef<null | number>(null);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const { message, messagePrefix } = useSelector((state: AppState) => state.toast.toast);
  const dispatch = useAppDispatch();
  timeRemainingRef.current = timeRemaining;

  const onRemove = () => {
    dispatch(actions.removeToast());
  };
  const onUndo = () => {
    dispatch(actions.undo());
    onRemove();
  };
  const onUpdateTimer = () => {
    setTimeRemaining((t) => t - 1);
    if (timeRemainingRef.current === 0) {
      onRemove();
    }
  };

  useEffect(() => {
    if (message) {
      timeoutIdRef.current = window.setInterval(() => onUpdateTimer(), 1000);
    }

    return () => {
      clearTimeout(timeoutIdRef.current);
      setTimeRemaining(5);
    };
  }, [message]);

  return !message ? null : (
    <Wrap>
      <InnerWrap onClick={onRemove}>
        <Message>
          <Prefix>{messagePrefix}</Prefix>
          {message}
        </Message>
      </InnerWrap>
      <Undo onClick={onUndo}>
        undo
        <TimeRemaining>{timeRemaining}</TimeRemaining>
      </Undo>
    </Wrap>
  );
});

export const Wrap = styled.div`
  z-index: 1;
  position: absolute;
  right: 2.4rem;
  bottom: 2.4rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const InnerWrap = styled.div`
  padding: var(--size-xlg);
  padding-right: 10rem;
  width: 100%;
  width: 32rem;
  line-height: 1.4;
  background: var(--sunset-orange);
  color: var(--white);
  border-radius: 2px;
  transition: opacity 0.2s ease-out;
  box-shadow: 0px -3px 6px -1px #ffc0c06b;

  &:hover {
    opacity: 0.8;
  }
`;

export const Prefix = styled.span`
  margin-right: var(--size-sm);
  border-right: 1px solid #ffffff5e;
  padding-right: var(--size-sm);
  font-size: var(--font-size-lg);
  font-weight: bold;
`;

export const Message = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Undo = styled.div`
  position: absolute;
  right: var(--size-lg);
  padding: var(--size-sm) var(--size-lg);
  font-weight: bold;
  color: var(--sunset-orange);
  text-transform: uppercase;
  background-color: var(--white);
  border-radius: 21px;
`;

export const TimeRemaining = styled.span`
  margin-left: var(--size-xsm);
  font-weight: bold;
`;
