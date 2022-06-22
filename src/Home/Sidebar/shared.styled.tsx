import styled, { css } from 'styled-components';

export const SectionHeader = styled.h3`
  text-transform: uppercase;
  color: #8f93a0;
  font-size: var(--font-size-md);
  margin-bottom: var(--size-sm);
`;

export const Section = styled.div`
  margin-bottom: 3.2rem;
`;

export const SectionItemStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--size-xsm) var(--size-lg) var(--size-xsm) 0;
  cursor: pointer;

  * {
    line-height: 1.3;
  }
`;

export const Actions = styled.div`
  position: absolute;
  right: 0;
  display: flex;
`;

export const RemoveIconStyles = css`
  display: none;
  margin-left: var(--size-lg);

  &:hover {
    color: var(--sunset-orange);
  }
`;
