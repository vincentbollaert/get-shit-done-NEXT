import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAddCategoryMutation, useGetCurrentUserQuery } from '~/api/requests';
import { ClientModel } from '~/api/types';
import { Colorpicker, Placeholder, TextField } from '~/shared/components';
import { Input } from '~/shared/components/form/shared.styled';
import { Color } from '~/shared/constants';

type FormFields = Pick<ClientModel['Category'], 'name'>;

export const AddNewCategory = () => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [addNewCategory] = useAddCategoryMutation();
  const { register, handleSubmit, formState, reset, setFocus } = useForm<FormFields>();
  const { data: currentUser } = useGetCurrentUserQuery();

  const errorMessage = (formState.errors.name || {}).type;
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    addNewCategory({ ...data, colorId: selectedColor!.colorId, userId: currentUser!.userId });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextFieldStyled placeholder="add category" errorMessage={errorMessage} {...register('name', { required: true })}>
        <ColorPickerStyled
          selectedColorValue={selectedColor?.colorValue}
          setSelectedColor={(color) => {
            setSelectedColor(color);
            setFocus('name');
          }}
        />
      </TextFieldStyled>
    </Form>
  );
};

export const Form = styled.form`
  margin-bottom: var(--size-lg);
`;

const TextFieldStyled = styled(TextField)`
  ${Input} {
    padding-left: 24px;
  }
  ${Placeholder} {
    left: 24px;
  }
`;

const ColorPickerStyled = styled(Colorpicker)`
  position: absolute;
  bottom: 7px;
`;
