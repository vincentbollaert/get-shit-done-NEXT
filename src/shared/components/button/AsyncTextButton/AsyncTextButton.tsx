import { SpinnerLoader, Tooltip } from '~/shared/components';
import { Icon } from '../../Icon/Icon';
import { AsyncButtonContent, TextButtonWrap } from '../shared.styled';
import { AsyncButtonProps } from '../types';

export const AsyncTextButton = ({
  showErrorIcon = true,
  showSpinner = true,
  isDisabled,
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
      <TextButtonWrap disabled={isDisabled} $isError={isError} className={className} onClick={onClick}>
        {showSpinner && <SpinnerLoader size={1.6} isLoading={isLoading} />}
        {showErrorIcon && isError && !isLoading && <Icon variant="error" />}
        <AsyncButtonContent $isShow>{children}</AsyncButtonContent>
      </TextButtonWrap>
    </Tooltip>
  );
};
