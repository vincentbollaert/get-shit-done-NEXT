import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  useAddCategoryMutation,
  useGetCurrentUserQuery,
  useGetCategoriesQuery,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
} from '~/api/requests';
import { ClientModel } from '~/api/types';
import { Colorpicker, Icon } from '~/shared/components';
import { colors } from '~/shared/themes';
import { Color } from '~/shared/types';
import { Section, SectionHeader } from '../../shared.styled';

type FormValues = {
  colorId: string;
  name: string;
};

export const SectionCategories = () => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [updateCategory] = useUpdateCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const [removeCategory] = useRemoveCategoryMutation();
  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addCategory({ ...data, userId: currentUser!.userId });
  };

  const onColorSelect = (selectedColor: Color, categoryId: ClientModel['Category']['categoryId']) => {
    updateCategory({ categoryId, colorId: selectedColor.colorId });
  };

  return (
    <Section>
      <SectionHeader>Categories</SectionHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <TextField
          theme="light"
          isInForm
          placeholder="name"
          errorMessage={formState.errors.name?.type}
          {...register('name', { required: true })}
        /> */}
        <Categories>
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
        </Categories>
      </form>
    </Section>
  );
};

export const Categories = styled.div`
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
  /* display: flex;
  position: absolute;
  right: 0; */
`;

export const RemoveIcon = styled(Icon)`
  margin-left: var(--size-lg);

  &:hover {
    color: var(--sunset-orange);
  }
`;
