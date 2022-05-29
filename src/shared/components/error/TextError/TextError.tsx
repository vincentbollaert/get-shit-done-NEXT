import styled from 'styled-components';
import { Icon } from '~/shared/components';

export const TextError = ({ errorMessage }: { errorMessage?: string }) => {
  if (!errorMessage) return null;
  return (
    <Wrap>
      <Icon isError variant="error" className="spacing-right"></Icon>
      {errorMessage}
    </Wrap>
  );
};

export const Wrap = styled.div`
  display: flex;
  color: var(--sunset-orange);
`;
