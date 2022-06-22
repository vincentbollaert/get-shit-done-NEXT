import styled from 'styled-components';
import { useGetCategoriesQuery, useRemoveCategoryMutation, useUpdateCategoryMutation } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { Colorpicker, Icon } from '~/shared/components';
import { colors } from '~/shared/constants';
import type { Color } from '~/shared/constants';
import { AddNewCategory } from './AddNewCategory/AddNewCategory';

const Categories = () => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const [updateCategory] = useUpdateCategoryMutation();
  const [removeCategory] = useRemoveCategoryMutation();
  const onColorSelect = (selectedColor: Color, categoryId: ClientModel['Category']['categoryId']) => {
    updateCategory({ categoryId, colorId: selectedColor.colorId });
  };

  return (
    <Wrap>
      <AddNewCategory />

      {categories.map(({ categoryId, name, colorId }) => (
        <Category key={categoryId} color={colors[colorId]}>
          <Colorpicker
            selectedColorValue={colors[colorId]}
            label={name}
            setSelectedColor={(selectedColor) => onColorSelect(selectedColor, categoryId)}
          />
          <Actions>
            <RemoveIcon theme="light" variant="delete" onClick={() => removeCategory(categoryId)} />
          </Actions>
        </Category>
      ))}
    </Wrap>
  );
};

// eslint-disable-next-line import/no-default-export
export default Categories;

export const Wrap = styled.div`
  position: relative;
`;

export const Category = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  padding-bottom: var(--size-xsm);
  cursor: pointer;

  &::first-child {
    padding-top: var(--size-xsm);
  }

  &:hover {
    font-weight: bold;
    color: ${(p) => p.color};
  }
`;

export const Actions = styled.div`
  position: absolute;
  right: 0;
  display: flex;
`;

export const RemoveIcon = styled(Icon)`
  display: none;
  margin-left: var(--size-lg);

  &:hover {
    color: var(--sunset-orange);
  }

  ${Category}:hover & {
    display: block;
  }
`;
