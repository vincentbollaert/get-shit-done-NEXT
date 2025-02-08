import { SubmitHandler, useForm } from 'react-hook-form';
import { Section, SectionHeader } from '../../../shared.styled';

type FormValues = {
  defaultHoursFrom: number;
  defaultHoursTo: number;
};

export const SectionIntegrations = () => {
  const { handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = () => {};

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
