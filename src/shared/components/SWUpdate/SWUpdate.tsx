import React, { memo, useState } from 'react';
import styled from 'styled-components';

// TODO: This component no longer works
export const SWUpdate = memo(function SWUpdate({ isUpdateAvailable }: { isUpdateAvailable: boolean }) {
  const [doNotUpdate, setDoNotUpdate] = useState(false);
  const onReload = () => window.location.reload();
  const onRemove = () => {
    setDoNotUpdate(true);
  };

  console.log('isUpdateAvailable?', isUpdateAvailable);
  return !isUpdateAvailable || doNotUpdate ? null : (
    <Wrap>
      <InnerWrap onClick={onRemove}>
        <Message>An update is available</Message>
      </InnerWrap>
      <Undo onClick={onReload}>Update</Undo>
    </Wrap>
  );
});

export const Wrap = styled.div`
  z-index: 1;
  position: absolute;
  left: 4.8rem;
  bottom: 2.4rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const InnerWrap = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  padding: var(--size-xlg);
  padding-right: 10rem;
  width: 100%;
  width: 26rem;
  line-height: 1.4;
  background: var(--charcoal);
  color: var(--white);
  border-radius: 2px;
  transition: opacity 0.2s ease-out;
  box-shadow: 0px -3px 6px -1px #ffc0c06b;

  &:hover {
    opacity: 0.8;
  }
`;

export const Message = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Undo = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  position: absolute;
  right: var(--size-lg);
  padding: var(--size-sm) var(--size-md);
  font-weight: bold;
  color: var(--charcoal);
  text-transform: uppercase;
  background-color: var(--white);
  font-size: var(--font-size-xsm);
  border-radius: 2.1rem;
`;
