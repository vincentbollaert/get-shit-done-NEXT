import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Icon } from '~/shared/components';

type Props = {
  isVisible: boolean;
  title: string;
  width: number;
  children: React.ReactNode;
  onOverlayToggle(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
};

// TODO: Use createPortal correctly
export const Modal = ({ isVisible, title, width, children, onOverlayToggle }: Props) =>
  !isVisible
    ? null
    : ReactDOM.createPortal(
        <Wrap>
          <Overlay onClick={onOverlayToggle} />
          <ModalWrap width={width} tabIndex={0}>
            <InnerWrap>
              <Header>
                {title}
                <IconStyled variant="close" onClick={onOverlayToggle} />
              </Header>
              <Content>{children}</Content>
            </InnerWrap>
          </ModalWrap>
        </Wrap>,
        document.querySelector('#app')!
      );

const Wrap = styled.div`
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
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.3); */
`;
const ModalWrap = styled.div<{ width: number }>`
  display: flex;
  position: fixed;
  width: ${(p) => `${p.width}rem` || 'auto'};
  flex-grow: 1;
  flex-direction: column;
  text-transform: none;
  outline: none;
  background-color: var(--charcoal);
  box-shadow: 3px 3px 8px -5px var(--charcoal);
`;

const InnerWrap = styled.div`
  position: relative;
`;

const Header = styled.header`
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

const Content = styled.div`
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
