import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useSignoutMutation } from '~/api/requests';
import { Icon } from '~/shared/components';
import { useFullscreenToggle } from '~/shared/hooks/useFullscreenToggle';
import Settings from './tabs/Settings/Settings';
import { TabContentProps, TabContent } from './tabs/TabContent';
// const Todos = lazy(() => import('./Todos/Todos'));
// const Settings = lazy(() => import('./Settings/Settings'));
import Todos from './tabs/Todos/Todos';
import Categories from './tabs/Categories/Categories';
import { actions } from '~/reducers/app';
import { useAppDispatch } from '~/Application/Root';
import type { IconProps } from '../../shared/components/Icon/Icon';
import { Tabs, TabItemWrap } from '~/shared/components/Tabs/Tabs';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [isFullscreen, setIsFullscreen] = useFullscreenToggle(false);
  const [activeTabId, setActiveTab] = useState<string | null>(null);
  const [onSignout] = useSignoutMutation();
  const handleTabClick = (id: string) => {
    setActiveTab(id === activeTabId ? null : id);
    (!activeTabId || id === activeTabId) && dispatch(actions.toggleSidebar());
  };
  const { TabItems, ActiveTabContent } = Tabs<IconProps & React.JSX.IntrinsicAttributes, TabContentProps>({
    activeTabId: activeTabId,
    onTabSelect: handleTabClick,
    TabItemWrap: TabItemWrapStyled,
    TabContentInnerWrap: TabContent,
    tabs: [
      {
        id: 'todos',
        TabItem: Toggle,
        tabItemProps: { variant: 'list' },
        TabContent: Todos,
        tabContentProps: { title: 'Todos' },
      },
      {
        id: 'categories',
        TabItem: Toggle,
        tabItemProps: { variant: 'list' },
        TabContent: Categories,
        tabContentProps: { title: 'Categories' },
      },
      {
        id: 'settings',
        TabItem: Toggle,
        tabItemProps: { variant: 'settings' },
        TabContent: Settings,
        tabContentProps: { title: 'Settings' },
      },
    ],
  });
  return (
    <Wrap>
      {/* <Suspense fallback={<div />}> */}
      <InnerWrap>
        <Toggles>
          <Toggle isActive={isFullscreen} variant="fullscreen" onClick={setIsFullscreen} />
          <Toggle isActive={isFullscreen} variant="chevron_left" />
        </Toggles>

        <Toggles>
          <TabItems />
        </Toggles>

        <Toggles>
          {/* TODO: find out how to pass nothing to mutation */}
          <Toggle variant="logout" onClick={() => onSignout({})} />
        </Toggles>
      </InnerWrap>

      <ActiveTabContent />
      {/* </Suspense> */}
    </Wrap>
  );
};

const TabItemWrapStyled = styled(TabItemWrap)`
  box-shadow: ${(p) => (p.isActive ? ' 0px 0px 0 1px var(--independence)' : 'none')};
  background: ${(p) => (p.isActive ? '#3c404d' : 'inherit')};
  * {
    color: ${(p) => (p.isActive ? 'var(--isabelline)' : 'var(--sonic-silver)')};
  }
`;
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

const Toggle = styled(Icon)<IconProps & { isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 2.4rem;
  width: 5rem;
  height: 5rem;
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
