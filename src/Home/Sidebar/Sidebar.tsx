import sub from 'date-fns/sub';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useSignoutMutation } from '~/api/requests';
import { Icon, IconVariant } from '~/shared/components';
import { useFullscreenToggle } from '~/shared/hooks/useFullscreenToggle';
import { STYLE_SIDEBAR_WIDTH_UNIT } from '~/styles';
import Settings from './Settings/Settings';
import { TabHOC } from './TabHOC/TabHOC';
// const Todos = lazy(() => import('./Todos/Todos'));
// const Settings = lazy(() => import('./Settings/Settings'));
import Todos from './Todos/Todos';

type Props = {
  isOpen: boolean;
  setIsOpen: (openState: boolean) => void;
};

export const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  const [isFullscreen, setIsFullscreen] = useFullscreenToggle(false);
  const [activeTabId, setActiveTab] = useState<string | null>(null);
  const [onSignout] = useSignoutMutation();
  const tabs = [
    {
      id: 'todos',
      Component: TabHOC(Todos),
      iconVariant: 'list',
    },
    {
      id: 'settings',
      Component: TabHOC(Settings),
      iconVariant: 'settings',
    },
  ];
  const handleTabClick = (id: string) => {
    setActiveTab(id === activeTabId ? null : id);
    setIsOpen(!activeTabId || activeTabId !== id);
  };
  const handleMonthClick = () => {
    const updatedDate = sub(new Date(), { months: 1 });
    // TODO: add mutate to get tasks
    // onGetTasks(updatedDate)
  };

  return (
    <Wrap>
      {/* <Suspense fallback={<div />}> */}
        <InnerWrap>
          <Toggles>
            <Toggle isActive={isFullscreen} variant="fullscreen" onClick={setIsFullscreen} />
            <Toggle isActive={isFullscreen} variant="chevron_left" onClick={handleMonthClick} />
          </Toggles>

          <Toggles>
            {tabs.map(({ id, iconVariant }) => (
              <Toggle
                key={id}
                isActive={id === activeTabId}
                onClick={() => handleTabClick(id)}
                variant={iconVariant as IconVariant}
              />
            ))}
          </Toggles>

          <Toggles>
            {/* TODO: find out how to pass nothing to mutation */}
            <Toggle variant="logout" onClick={() => onSignout({})} />
          </Toggles>
        </InnerWrap>

        <Content isOpen={isOpen}>
          {tabs.map(({ id, Component }) => (
            <Component key={id} isActive={id === activeTabId} title={id} />
          ))}
        </Content>
      {/* </Suspense> */}
    </Wrap>
  );
};

const Wrap = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  font-size: 1.3rem;
  color: var(--lavender);
`;

const InnerWrap = styled.div`
  z-index: 1;
  height: 100%;
  background-color: var(--charcoal);
  padding: var(--size-sm) 0;
  width: 5rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const Toggles = styled.div``;

const Toggle = styled(Icon)<{ isActive?: boolean }>`
  display: block;
  margin: 0 auto;
  font-size: 2.4rem;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    color: var(--isabelline);
  }

  ${(p) =>
    p.isActive &&
    css`
      color: var(--isabelline);
    `};
`;

const Content = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 100%;
  bottom: 0;
  flex-direction: column;
  padding: var(--size-xlg);
  width: ${STYLE_SIDEBAR_WIDTH_UNIT}rem;
  color: var(--isabelline);
  background-color: var(--charcoal);
  box-shadow: inset -1px 0 0 0px var(--independence);
  transform: translateX(100%);

  ${(p) =>
    p.isOpen &&
    css`
      transform: translateX(0);
    `};
`;
