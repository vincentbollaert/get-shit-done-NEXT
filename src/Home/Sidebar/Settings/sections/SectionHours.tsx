import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateSettingsMutation } from '~/api/requests';
import { Settings } from '~/api/types';
import { TextField } from '~/shared/components';
import { Section, SectionHeader } from '../../shared.styled';

type FormValues = {
  defaultHoursFrom: number;
  defaultHoursTo: number;
};

export const SectionHours = ({ hoursToShow }: { hoursToShow: Settings['hoursToShow'] }) => {
  const [onUpdateSettings] = useUpdateSettingsMutation();
  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onUpdateSettings({ hoursToShow: [Number(data.defaultHoursFrom), Number(data.defaultHoursTo)] });
  };

  return (
    <Section>
      <SectionHeader>Hours</SectionHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          theme="light"
          isInForm
          type="number"
          defaultValue={hoursToShow[0]}
          placeholder="hours from"
          errorMessage={formState.errors.defaultHoursFrom?.type}
          {...register('defaultHoursFrom', { required: true })}
        />
        <TextField
          theme="light"
          isInForm
          type="number"
          defaultValue={hoursToShow[1]}
          placeholder="hours to"
          errorMessage={formState.errors.defaultHoursTo?.type}
          {...register('defaultHoursTo', { required: true })}
        />

        {/* <DumbButton type="submit">update axis</DumbButton> */}
      </form>
    </Section>
  );
};
