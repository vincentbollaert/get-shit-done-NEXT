import { SpinnerLoader, Tooltip } from '~/shared/components';
import { AsyncStatus } from '~/shared/types';
import { AsyncButtonContent, SvgButtonWrap } from '../shared.styled';

type Props = {
  tooltipPosition?: 'left' | 'right';
  children: React.ReactNode;
  asyncStatuses?: (AsyncStatus | undefined)[];
  className?: string;
};

export const AsyncSvgButton = ({ tooltipPosition, children, asyncStatuses, className }: Props) => {
  const isError = !!asyncStatuses?.find((x) => x?.isError);
  const errorMessage = asyncStatuses?.find((x) => x?.errorMessage)?.errorMessage;
  const isLoading = !!asyncStatuses?.find((x) => x?.isLoading);

  return (
    <SvgButtonWrap $isError={isError} type="button" className={className}>
      <SpinnerLoader size={1.6} isLoading={isLoading} />
      <Tooltip isVisible tooltipPosition={tooltipPosition} tooltipText={errorMessage}>
        <AsyncButtonContent $isShow={!isLoading}>{children}</AsyncButtonContent>
      </Tooltip>
    </SvgButtonWrap>
  );
};
