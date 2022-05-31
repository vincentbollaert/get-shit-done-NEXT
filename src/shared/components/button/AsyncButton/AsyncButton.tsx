import { Icon, SpinnerLoader, Tooltip } from '~/shared/components';
import { AsyncButtonContent, ButtonStyledWrap } from '../shared.styled';
import { AsyncButtonProps } from '../types';

export const AsyncButton = ({
  showErrorIcon = true,
  showSpinner = true,
  isDisabled,
  accentColor,
  type = 'button',
  children,
  asyncStatuses,
  className,
  onClick,
}: AsyncButtonProps) => {
  const isError = !!asyncStatuses?.find((x) => x?.isError);
  const errorMessage = asyncStatuses?.find((x) => x?.errorMessage)?.errorMessage;
  const isLoading = !!asyncStatuses?.find((x) => x?.isLoading);

  // TODO: define error structure
  return (
    <Tooltip isVisible tooltipText={errorMessage}>
      <ButtonStyledWrap
        disabled={isDisabled}
        isError={isError}
        accentColor={accentColor}
        type={type}
        className={className}
        onClick={onClick}
      >
        {showSpinner && <SpinnerLoader size={1.6} isLoading={isLoading} />}
        {showErrorIcon && isError && !isLoading && <Icon isError variant="error" />}
        <AsyncButtonContent isShow={(!isError || !showErrorIcon) && !isLoading}>{children}</AsyncButtonContent>
      </ButtonStyledWrap>
    </Tooltip>
  );
};
