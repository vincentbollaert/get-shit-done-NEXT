import styled from 'styled-components';

type Props = {
  theme?: string;
  svg: string;
  size?: number;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
};

export const Svg = ({ svg, size = 1.6, className, onClick }: Props) => (
  <Wrap size={size} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: svg }} />
);

type WrapProps = React.HTMLAttributes<HTMLSpanElement> & {
  size: number;
};
const Wrap = styled.span<WrapProps>`
  display: flex;
  flex-shrink: 0;
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;
