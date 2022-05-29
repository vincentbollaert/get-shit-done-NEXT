import styled from 'styled-components';

export const Tag = ({ label, className, onClick }: { label: string; className?: string; onClick?: () => void }) => (
  <TagWrap className={className} onClick={onClick}>
    {label}
  </TagWrap>
);

export const TagsWrap = styled.div`
  display: flex;
`;

const TagWrap = styled.div`
  display: inline-flex;
  flex-grow: 1;
  margin-right: 1px;
  padding: var(--size-xsm) var(--size-sm);
  justify-content: center;
  background: #4f5465;
  border-radius: 0.2rem;
  font-size: var(--font-size-md);
  text-transform: uppercase;

  &:first-of-type {
    border-bottom-left-radius: var(--size-md);
    border-top-left-radius: var(--size-md);
    padding-left: var(--size-md);
  }

  &:last-of-type {
    border-bottom-right-radius: var(--size-md);
    border-top-right-radius: var(--size-md);
    padding-right: var(--size-md);
  }

  &:hover {
    background-color: #5d606a;
  }
`;
