import styled from 'styled-components';
import { useGetCategoriesQuery, useRemoveCategoryMutation, useUpdateCategoryMutation } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { Colorpicker, Icon } from '~/shared/components';
import { colors } from '~/shared/constants';
import type { Color } from '~/shared/constants';
import { AddNewCategory } from './AddNewCategory/AddNewCategory';
import { Actions, SectionItemStyles, RemoveIconStyles } from '../../shared.styled';
import { ColorCircle } from '~/shared/components/Colorpicker/Colorpicker';

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
          <ColorpickerStyled
            selectedColorValue={colors[colorId]}
            label={name}
            setSelectedColor={(selectedColor) => onColorSelect(selectedColor, categoryId)}
          />
          <Actions>
            <RemoveIcon variant="delete" onClick={() => removeCategory(categoryId)} />
          </Actions>
        </Category>
      ))}
    </Wrap>
  );
};

 
export default Categories;

export const Wrap = styled.div`
  position: relative;
`;

export const Category = styled.div<{ key: string; color: string; children: React.ReactNode }>`
  ${SectionItemStyles};
  padding-left: 24px;
  color: ${(p) => p.color};

  &:hover {
    color: ${(p) => p.color};
  }
`;

const ColorpickerStyled = styled(Colorpicker)`
  ${ColorCircle} {
    position: absolute;
    left: 0;
  }
`;

export const RemoveIcon = styled(Icon)`
  ${RemoveIconStyles};

  ${Category}:hover & {
    display: block;
  }
`;
