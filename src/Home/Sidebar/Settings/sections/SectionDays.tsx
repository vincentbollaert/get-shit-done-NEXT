import styled, { css } from 'styled-components';
import { useUpdateSettingsMutation } from '~/api/requests';
import { Settings } from '~/api/types';
import { Tag, TagsWrap } from '~/shared/components';
import { Section, SectionHeader } from '../../shared.styled';

export const SectionDays = ({ daysToShow }: { daysToShow: Settings['daysToShow'] }) => {
  const [onUpdateSettings] = useUpdateSettingsMutation();
  const daysToShowOptions: Settings['daysToShow'][] = ['1week', '3weeks', '1month'];

  return (
    <Section>
      <SectionHeader>Days</SectionHeader>
      <TagsWrap>
        {daysToShowOptions.map((daysToShowOption) => (
          <TagStyled
            isActive={daysToShowOption === daysToShow}
            key={daysToShowOption}
            label={daysToShowOption}
            onClick={() => onUpdateSettings({ daysToShow: daysToShowOption })}
          />
        ))}
      </TagsWrap>
    </Section>
  );
};

const TagStyled = styled(Tag)<{ isActive: boolean }>`
  cursor: pointer;

  ${(p) =>
    p.isActive &&
    css`
      background-color: #eeeeee;
      color: #444;
      font-weight: bold;

      &:hover {
        background-color: #eeeeee;
      }
    `}
`;
