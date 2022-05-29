import styled from 'styled-components';

type TabHOCProps = React.FC<{ customProps: any }>;
type Props = { isActive: boolean; title: string; customProps?: any };

export const TabHOC = (Component: TabHOCProps) => {
  // TODO: reinable this lint rule and fix it
  // eslint-disable-next-line react/display-name
  return (props: Props) => {
    const { isActive, title, customProps = {} } = props;

    return (
      <Wrap isActive={isActive}>
        <Title>{title}</Title>
        <Component customProps={customProps} />
      </Wrap>
    );
  };
};

export const Wrap = styled.div<{ isActive: boolean }>`
  display: ${(p) => (p.isActive ? 'block' : 'none')};
`;

export const Title = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 3.4rem;
`;
