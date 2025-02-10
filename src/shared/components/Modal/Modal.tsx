import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Icon } from '~/shared/components/Icon/Icon';

type Props = {
  isVisible: boolean;
  title: string;
  width: number;
  children: React.ReactNode;
  onOverlayToggle(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

// TODO: Use createPortal correctly
export const Modal = ({ isVisible, title, width, children, onOverlayToggle }: Props) => {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  return !isClientSide || !isVisible
    ? null
    : ReactDOM.createPortal(
        <Wrap>
          <Overlay onClick={onOverlayToggle} />
          <ModalWrap $width={width} tabIndex={0}>
            <InnerWrap>
              <Header data-testid="modal-header">
                {title}
                <IconStyled variant="close" onClick={onOverlayToggle} ariaLabel="close modal" />
              </Header>
              <Content data-testid="modal-content">{children}</Content>
            </InnerWrap>
          </ModalWrap>
        </Wrap>,
        document.querySelector('body')!
      );
};

type WrapProps = React.HTMLAttributes<HTMLDivElement>;
const Wrap = styled.div<WrapProps>`
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color var(--transition);
`;
type OverlayProps = React.HTMLAttributes<HTMLDivElement>;
const Overlay = styled.div<OverlayProps>`
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.3); */
`;
type ModalWrapProps = React.HTMLAttributes<HTMLDivElement> & {
  $width: number;
};

const ModalWrap = styled.div<ModalWrapProps>`
  display: flex;
  position: fixed;
  width: ${(p) => (p.$width ? `${p.$width}rem` : 'auto')};
  flex-grow: 1;
  flex-direction: column;
  text-transform: none;
  outline: none;
  background-color: var(--charcoal);
  box-shadow: 3px 3px 8px -5px var(--charcoal);
`;

type InnerWrapProps = React.HTMLAttributes<HTMLDivElement>;
const InnerWrap = styled.div<InnerWrapProps>`
  position: relative;
`;

type HeaderProps = React.HTMLAttributes<HTMLElement>;
const Header = styled.header<HeaderProps>`
  display: flex;
  align-items: center;
  padding: var(--size-xlg);
  padding-bottom: 0;
  font-size: var(--font-size-lg);
  color: var(--isabelline);
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;
`;

type ContentProps = React.HTMLAttributes<HTMLDivElement>;
const Content = styled.div<ContentProps>`
  padding: var(--size-xlg);
  color: var(--sonic-silver);
`;

const IconStyled = styled(Icon)`
  position: absolute;
  right: var(--size-lg);
  margin-left: auto;
  color: var(--rhythm);
  cursor: pointer;
  visibility: hidden;

  &:hover {
    color: var(--isabelline);
  }

  ${ModalWrap}:hover & {
    visibility: visible;
  }
`;
