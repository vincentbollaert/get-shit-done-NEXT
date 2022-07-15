import { useState } from 'react';
import styled from 'styled-components';
import { Placeholder } from '../Placeholder/Placeholder.styled';
import { FieldIcon, Input, Wrap } from '../shared.styled';

export type DropdownItem = {
  id: string;
  name: string;
};

export type DropdownList = DropdownItem[];

export type DropdownProps = {
  isInForm?: boolean;
  activeItem?: DropdownItem;
  label: string;
  list: DropdownList;
  onSelect: (item: DropdownItem) => void;
};

export const Dropdown = ({ isInForm = false, activeItem, label, list, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function onItemSelect(selectItem: DropdownItem) {
    onSelect(selectItem);
    setIsOpen(false);
  }

  return (
    <Wrap isInForm={isInForm} tabIndex={0} onBlur={() => setIsOpen(false)}>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <Placeholder hasValue={!!activeItem?.id}>{label}</Placeholder>
        <Input as="div">{activeItem?.name}</Input>
        <FieldIcon variant="expand_more" />
      </Header>

      <List isOpen={isOpen}>
        {list.map((item) => (
          <Item isActive={item.id === activeItem?.id} onClick={() => onItemSelect(item)} key={item.id}>
            {item.name}
          </Item>
        ))}
      </List>
    </Wrap>
  );
};

export const Header = styled.div`
  width: 100%;
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

export const Item = styled.div<{ isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--size-xsm);
  color: ${(p) => (p.isActive ? 'var(--isabelline)' : 'red')};
  cursor: pointer;

  &:hover {
    color: 'var(--white)';
  }
`;
