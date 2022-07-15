import { useState } from 'react';
import styled from 'styled-components';
import { AsyncTextButton, Modal } from '~/shared/components';
import { SignInForm } from './SignInForm/SignInForm';
import { SignUpForm } from './SignUpForm/SignUpForm';

export const UserModal = () => {
  const [isSignInView, setIsSignInView] = useState(true);

  return (
    <Modal isVisible={isSignInView} title={isSignInView ? 'Sign in' : 'Sign out'} width={17}>
      {isSignInView ? (
        <>
          <ViewToggle>
            Don't have an account?
            <AsyncTextButtonStyled onClick={() => setIsSignInView(false)}>Sign in</AsyncTextButtonStyled>
          </ViewToggle>
          <SignInForm />
        </>
      ) : (
        <>
          <ViewToggle>
            Already have an account?
            <AsyncTextButtonStyled onClick={() => setIsSignInView(true)}>Sign up</AsyncTextButtonStyled>
          </ViewToggle>
          <SignUpForm />
        </>
      )}
    </Modal>
  );
};

const ViewToggle = styled.div`
  color: red;
`;

const AsyncTextButtonStyled = styled(AsyncTextButton)`
  margin-left: 12px;
`;
