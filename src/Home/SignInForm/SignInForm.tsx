import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSigninMutation } from '~/api/requests';
import { AsyncButton, ModalFooter, TextField } from '~/shared/components';

export type FormFields = {
  email: string;
  password: string;
};

export const SignInForm = memo(function SignInForm() {
  const [signin, asyncStatus] = useSigninMutation();
  const { register, handleSubmit, formState } = useForm<FormFields>();
  const { errors } = formState;
  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    const response = await signin(formData).unwrap();
  };
  const isDisabled = !!Object.entries(errors).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        shouldAutoFocus
        isInForm
        placeholder="email"
        ariaLabel="email"
        errorMessage={errors.email?.type}
        {...register('email', { required: true })}
      />
      <TextField
        isInForm
        placeholder="password"
        ariaLabel="password"
        type="password"
        errorMessage={errors.password?.type}
        {...register('password', { required: true })}
      />
      <ModalFooter>
        <AsyncButton isDisabled={isDisabled} type="submit" asyncStatuses={[asyncStatus]}>
          Sign in
        </AsyncButton>
      </ModalFooter>
    </form>
  );
});
