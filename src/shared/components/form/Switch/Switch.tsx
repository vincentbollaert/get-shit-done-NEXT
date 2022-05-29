import styled, { css } from 'styled-components';

type Props = {
  isChecked: boolean;
  isDisabled?: boolean;
  id: string;
  label?: string;
  onClick: (isChecked: boolean) => void;
};

export const Switch = ({ isChecked, isDisabled, id, label, onClick }: Props) => {
  const onClickHandler = (event: React.FormEvent) => {
    event.stopPropagation();
    if (isDisabled) {
      return;
    }
    onClick(isChecked);
  };

  return (
    <Wrap isDisabled={isDisabled} role="presentation" onClick={onClickHandler}>
      <Track isChecked={isChecked}>
        <TrackSwitch checked={isChecked} type="checkbox" id={id} readOnly />
        <Thumb isChecked={isChecked} />
      </Track>
      {label && <Label>{label}</Label>}
    </Wrap>
  );
};

const TRACK_HEIGHT = 'var(--size-lg)';
const Wrap = styled.div<{ isDisabled?: boolean }>`
  flex-basis: 0;
  display: flex;
  align-items: center;

  ${(p) =>
    p.isDisabled &&
    css`
      opacity: 0.5;
      * {
        cursor: not-allowed;
      }
    `}
`;

const Track = styled.div<{ isChecked: boolean }>`
  position: relative;
  display: flex;
  width: 3.4rem;
  height: ${TRACK_HEIGHT};
  align-items: center;
  background-color: ${(p) => (p.isChecked ? 'var(--cultured)' : 'var(--gray-x11)')};
  border-radius: ${TRACK_HEIGHT};
  cursor: pointer;
`;

const TrackSwitch = styled.input`
  display: none;
`;

const Thumb = styled.div<{ isChecked: boolean }>`
  position: absolute;
  border: 0.2rem solid var(--gray-x11);
  margin: 0;
  width: ${TRACK_HEIGHT};
  height: ${TRACK_HEIGHT};
  background-color: var(--onyx);
  border-radius: 50%;
  cursor: inherit;
  transition: background-color 0.1s ease-out;

  ${(p) =>
    p.isChecked &&
    css`
      right: 0;
      border-color: var(--cultured);
    `}
`;

const Label = styled.div`
  margin-left: var(--size-sm);
`;
