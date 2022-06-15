import { SubmitHandler, useForm } from 'react-hook-form';
import { Section, SectionHeader } from '../../../shared.styled';

type FormValues = {
  defaultHoursFrom: number;
  defaultHoursTo: number;
};

export const SectionIntegrations = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const dataMapped = {
      defaultHoursFrom: Number(data.defaultHoursFrom),
      defaultHoursTo: Number(data.defaultHoursTo),
    };
  };

  return (
    <Section>
      <SectionHeader>Integrations</SectionHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Show Google calendar</div>
        <div>Show Apple calendar</div>
        <div>Show Notion calendar</div>
        <div>Show Notion todos</div>
      </form>
    </Section>
  );
};
