import { AsyncStatus } from '~/shared/types';

export type DumbButtonProps = {
  isDisabled?: boolean;
  accentColor?: string;
  type: 'submit' | 'button' | 'reset';
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

export type AsyncButtonProps = DumbButtonProps & {
  showSpinner?: boolean;
  showErrorIcon?: boolean;
  tooltipPosition?: 'left' | 'right';
  asyncStatuses?: (AsyncStatus | undefined)[];
};
