import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  useAddGroupMutation,
  useGetCurrentUserQuery,
  useGetGroupsQuery,
  useRemoveGroupMutation,
  useUpdateGroupMutation,
} from '~/api/requests';
import { Group as GroupType } from '~/api/types';
import { Colorpicker, Icon } from '~/shared/components';
import { colors } from '~/shared/themes';
import { Color } from '~/shared/types';
import { Section, SectionHeader } from '../../shared.styled';

type FormValues = {
  colorId: string;
  name: string;
};

export const SectionCategories = () => {
  const { data: groups = [] } = useGetGroupsQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [updateGroup] = useUpdateGroupMutation();
  const [addGroup] = useAddGroupMutation();
  const [removeGroup] = useRemoveGroupMutation();
  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addGroup({ ...data, userId: currentUser!.userId });
  };

  const onColorSelect = (selectedColor: Color, groupId: GroupType['groupId']) => {
    updateGroup({ groupId, colorId: selectedColor.colorId });
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
          {groups.map(({ groupId, name, colorId }) => (
            <Category key={groupId} color={colors[colorId]}>
              <Colorpicker
                selectedColorValue={colors[colorId]}
                label={name}
                setSelectedColor={(selectedColor) => onColorSelect(selectedColor, groupId)}
              />
              <Actions>
                <RemoveIcon theme="light" variant="delete" onClick={() => removeGroup(groupId)} />
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
