import { ButtonStyledWrap } from '../shared.styled';
import { DumbButtonProps } from '../types';

export const DumbButton = ({ isDisabled, accentColor, type, children, onClick }: DumbButtonProps) => (
  <ButtonStyledWrap disabled={isDisabled} accentColor={accentColor} type={type} onClick={onClick}>
    {children}
  </ButtonStyledWrap>
);
