import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSigninMutation } from '~/api/requests';
import { AsyncButton, ModalFooter, TextField } from '~/shared/components';
import { FormValues } from './types';

export const SignInForm = memo(function SignInForm() {
  const [signin, asyncStatusSignin] = useSigninMutation();
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const response = await signin(formData).unwrap();
    console.log(response);
  };
  const isDisabled = !!Object.entries(errors).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        shouldAutoFocus
        isInForm
        defaultValue=""
        theme="light"
        placeholder="email"
        errorMessage={errors.email?.type}
        {...register('email', { required: true })}
      />
      <TextField
        isInForm
        defaultValue=""
        theme="light"
        placeholder="password"
        errorMessage={errors.password?.type}
        {...register('password', { required: true })}
      />
      <ModalFooter>
        <AsyncButton isDisabled={isDisabled} type="submit" asyncStatuses={[asyncStatusSignin]}>
          Sign in
        </AsyncButton>
      </ModalFooter>
    </form>
  );
});
