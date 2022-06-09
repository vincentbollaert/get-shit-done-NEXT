import { useState } from 'react';
import styled from 'styled-components';
import { ClientModel } from '~/api/types';
import { colors } from '~/shared/themes';
import { Placeholder } from '../Placeholder/Placeholder.styled';
import { IconStyled, Input, Wrap } from '../shared.styled';

type Props = {
  theme: string;
  isInForm?: boolean;
  activeGroup?: ClientModel['Group'];
  label: string;
  groups: ClientModel['Group'][];
  onSelect(item: ClientModel['Group']): void;
};

// TODO: rename this into group dd
export const Dropdown = ({ theme, isInForm = false, activeGroup, label, groups, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const accentColor = activeGroup?.colorId ? colors[activeGroup.colorId] : '000';

  function onItemSelect(selectItem: ClientModel['Group']) {
    onSelect(selectItem);
    setIsOpen(false);
  }

  return (
    <Wrap theme={theme} isInForm={isInForm} tabIndex={0} onBlur={() => setIsOpen(false)}>
      <Header color={accentColor} onClick={() => setIsOpen(!isOpen)}>
        <Placeholder theme={theme} hasValue={!!activeGroup?.groupId}>
          {label}
        </Placeholder>
        <Input as="div">{activeGroup?.name}</Input>
        <IconStyled theme="light" variant="expand_more" />
      </Header>
      <List isOpen={isOpen}>
        {groups.map((group) => (
          <Item
            isActive={group.groupId === activeGroup?.groupId}
            color={accentColor}
            onClick={() => onItemSelect(group)}
            key={group.groupId}
          >
            {group.name}
            <GroupColor color={colors[group.colorId]} />
          </Item>
        ))}
      </List>
    </Wrap>
  );
};

export const Header = styled.div<{ color: string }>`
  width: 100%;
  color: ${(p) => p.color};
`;

export const List = styled.div<{ isOpen: boolean }>`
  display: ${(p) => (p.isOpen ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  background-color: #525769;
  padding: var(--size-sm);
  z-index: 1;
  top: 0;
  left: -(var(--size-md));
  right: -(var(--size-md));
  border-radius: 2px;
  box-shadow: 3px 3px 8px -5px #343742;
`;

export const Item = styled.div<{ isActive: boolean; color: string }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--size-xsm);
  color: ${(p) => (p.isActive ? p.color : 'var(--isabelline)')};
  cursor: pointer;

  &:hover {
    color: ${(p) => (p.isActive ? p.color : 'var(--white)')};
  }
`;

export const GroupColor = styled.div<{ color: string }>`
  width: var(--size-lg);
  height: var(--size-lg);
  background: ${(p) => p.color};
  border-radius: 50%;
  position: absolute;
  right: 0;
`;
