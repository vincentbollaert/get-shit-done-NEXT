import React, { memo } from 'react';
import styled from 'styled-components';
import loaderSvg from '~/public/svg/loader.svg';
import { Svg } from '../Svg/Svg';

export const CN_LOADER = 'loader';

type Props = {
  isAbsolute?: boolean;
  size?: number;
  isLoading?: boolean;
  className?: string;
};

export const SpinnerLoader = memo(function SpinnerLoader({ isAbsolute = true, size = 2, isLoading, className }: Props) {
  if (isLoading)
    return (
      <Wrap isAbsolute={isAbsolute} className={className}>
        <LoaderSvg className={CN_LOADER} size={size} svg={loaderSvg} />
      </Wrap>
    );
  return null;
});

type WrapProps = React.HTMLAttributes<HTMLDivElement> & {
  isAbsolute: boolean
}
export const Wrap = styled.div<WrapProps>`
  display: flex;
  z-index: 1;
  position: ${(p) => (p.isAbsolute ? 'absolute' : 'static')};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

export const LoaderSvg = styled(Svg)`
  display: flex;
  path {
    &:nth-child(1) {
      opacity: 1;
      fill: rgba(0, 0, 0, 0.2);
    }
    &:nth-child(2) {
      fill: rgba(0, 0, 0, 0.3);
    }
  }
`;
