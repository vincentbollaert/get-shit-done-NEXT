import React, { useState } from 'react';
import styled from 'styled-components';
import { ClientModel } from '~/api/types';
import { colors } from '~/shared/constants';
import { Placeholder } from '../Placeholder/Placeholder.styled';
import { FieldIcon, Input, Wrap } from '../shared.styled';

type Props = {
  theme?: 'light' | 'dark';
  isInForm?: boolean;
  activeCategory: ClientModel['Category'] | null;
  label: string;
  categories: ClientModel['Category'][];
  onSelect(item: ClientModel['Category']): void;
};

// TODO: rename this into category dd
export const Dropdown = ({ theme = 'light', isInForm = false, activeCategory, label, categories, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const accentColor = activeCategory?.colorId ? colors[activeCategory.colorId] : '000';

  function onItemSelect(selectItem: ClientModel['Category']) {
    onSelect(selectItem);
    setIsOpen(false);
  }

  return (
    <Wrap themeVariant={theme} isInForm={isInForm} tabIndex={0} onBlur={() => setIsOpen(false)}>
      <Header color={accentColor} onClick={() => setIsOpen(!isOpen)}>
        <Placeholder themeVariant={theme} hasValue={!!activeCategory?.categoryId}>
          {label}
        </Placeholder>
        <Input as="div">{activeCategory?.name}</Input>
        <FieldIcon themeVariant={theme} variant="expand_more" />
      </Header>
      <List isOpen={isOpen}>
        {categories.map((category) => (
          <Item
            isActive={category.categoryId === activeCategory?.categoryId}
            color={accentColor}
            onClick={() => onItemSelect(category)}
            key={category.categoryId}
          >
            {category.name}
            <CategoryColor color={colors[category.colorId]} />
          </Item>
        ))}
      </List>
    </Wrap>
  );
};

type HeaderProps = React.HTMLAttributes<HTMLDivElement> & { color: string };
export const Header = styled.div<HeaderProps>`
  width: 100%;
  color: ${(p) => p.color};
`;

type ListProps = React.HTMLAttributes<HTMLDivElement> & { isOpen: boolean };
export const List = styled.div<ListProps>`
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

type ItemProps = React.HTMLAttributes<HTMLDivElement> & { isActive: boolean; color: string };
export const Item = styled.div<ItemProps>`
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

export const CategoryColor = styled.div<{ color: string }>`
  width: var(--size-lg);
  height: var(--size-lg);
  background: ${(p) => p.color};
  border-radius: 50%;
  position: absolute;
  right: 0;
`;
