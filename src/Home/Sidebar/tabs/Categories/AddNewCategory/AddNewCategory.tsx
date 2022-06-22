import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAddCategoryMutation, useGetCurrentUserQuery } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { Colorpicker, TextField } from '~/shared/components';
import { Color } from '~/shared/constants';

type FormFields = Pick<ClientModel['Category'], 'name'>;

export const AddNewCategory = () => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [addNewCategory] = useAddCategoryMutation();
  const { register, handleSubmit, formState } = useForm<FormFields>();
  const { data: currentUser } = useGetCurrentUserQuery();

  const errorMessage = (formState.errors.name || {}).type;
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    addNewCategory({ ...data, colorId: selectedColor!.colorId, userId: currentUser!.userId });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        theme="light"
        placeholder="add category"
        errorMessage={errorMessage}
        {...register('name', { required: true })}
      >
        <Colorpicker
          selectedColorValue={selectedColor?.colorValue}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </TextField>
    </Form>
  );
};

export const Form = styled.form`
  margin-bottom: var(--size-lg);
`;
