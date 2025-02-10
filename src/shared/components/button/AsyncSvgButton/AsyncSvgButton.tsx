import { SpinnerLoader, Tooltip } from '~/shared/components';
import { AsyncStatus } from '~/shared/types';
import { AsyncButtonContent, SvgButtonWrap } from '../shared.styled';

type Props = {
  tooltipPosition?: 'left' | 'right';
  children: React.ReactNode;
  asyncStatuses?: (AsyncStatus | undefined)[];
  className?: string;
  ariaLabel?: string;
};

export const AsyncSvgButton = ({ tooltipPosition, children, asyncStatuses, className, ariaLabel }: Props) => {
  const isError = !!asyncStatuses?.find((x) => x?.isError);
  const errorMessage = asyncStatuses?.find((x) => x?.errorMessage)?.errorMessage;
  const isLoading = !!asyncStatuses?.find((x) => x?.isLoading);

  return (
    <SvgButtonWrap $isError={isError} type="button" className={className} aria-label={ariaLabel}>
      <SpinnerLoader size={1.6} isLoading={isLoading} />
      <Tooltip isVisible tooltipPosition={tooltipPosition} tooltipText={errorMessage}>
        <AsyncButtonContent $isShow={!isLoading}>{children}</AsyncButtonContent>
      </Tooltip>
    </SvgButtonWrap>
  );
};
