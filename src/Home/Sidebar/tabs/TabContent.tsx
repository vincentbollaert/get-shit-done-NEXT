import styled from 'styled-components';
import { STYLE_SIDEBAR_WIDTH_UNIT } from '~/styles';

export type TabContentProps = {
  children?: React.ReactNode;
  title: string;
};

export const TabContent: React.FC<TabContentProps> = ({ children, title }) => (
  <Content>
    <Title>{title}</Title>
    {children}
  </Content>
);

const Content = styled.div`
  position: absolute;
  top: 0;
  right: 100%;
  bottom: 0;
  flex-direction: column;
  padding: var(--size-xlg);
  width: ${STYLE_SIDEBAR_WIDTH_UNIT}rem;
  color: var(--isabelline);
  background-color: var(--charcoal);
  box-shadow: inset -1px 0 0 0px var(--independence);
`;

export const Title = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 3.4rem;
`;
