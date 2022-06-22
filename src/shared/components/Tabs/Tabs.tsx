import styled from 'styled-components';

type TabItemWrapProps = TabContentWrapProps & {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};
type TabsProps<I, C> = {
  activeTabId: string | null;
  TabItemWrap: React.FC<TabItemWrapProps>;
  TabContentInnerWrap: React.FC<C>;
  onTabSelect: (id: string) => void;
  tabs: {
    id: string;
    TabItem: React.FC<I>;
    tabItemProps: I;
    TabContent: React.FC;
    tabContentProps: C;
  }[];
};
type TabContentWrapProps = { isActive: boolean };

export const Tabs = <I, C>({ TabItemWrap, TabContentInnerWrap, tabs, activeTabId, onTabSelect }: TabsProps<I, C>) => {
  const TabItems = () => (
    <div>
      {tabs.map(({ id, TabItem, tabItemProps }) => (
        <TabItemWrap key={id} isActive={id === activeTabId} onClick={() => onTabSelect(id)}>
          <TabItem {...tabItemProps} />
        </TabItemWrap>
      ))}
    </div>
  );

  const ActiveTabContent = () => {
    const ActiveTab = tabs.find((tab) => tab.id === activeTabId);

    if (ActiveTab) {
      return (
        <TabContentWrap isActive>
          <TabContentInnerWrap {...ActiveTab.tabContentProps}>
            <ActiveTab.TabContent />
          </TabContentInnerWrap>
        </TabContentWrap>
      );
    }
    return null;
  };

  return {
    TabItems,
    ActiveTabContent,
  };
};

export const TabItemWrap = ({ isActive, onClick, children, className }: TabItemWrapProps) => (
  <TabItemWrapStyled isActive={isActive} onClick={onClick} className={className}>
    {children}
  </TabItemWrapStyled>
);
const TabItemWrapStyled = styled.div<{ isActive: boolean }>``;

export const TabContentWrap: React.FC<TabContentWrapProps> = ({ isActive, children }) => (
  <TabContentWrapStyled isActive={isActive}>{children}</TabContentWrapStyled>
);
export const TabContentWrapStyled = styled.div<{ isActive: boolean }>`
  display: ${(p) => (p.isActive ? 'block' : 'none')};
`;
