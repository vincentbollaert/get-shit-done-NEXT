import styled, { css } from 'styled-components';
import { useUpdateSettingsMutation } from '~/api/requests';
import type { Settings } from '~/api/types';
import { Tag, TagsWrap } from '~/shared/components';
import { Section, SectionHeader } from '../../shared.styled';

export const SectionSize = ({ sizeTheme }: { sizeTheme: Settings['size'] }) => {
  const [onUpdateSettings] = useUpdateSettingsMutation();
  const sizeThemeOptions: Settings['size'][] = ['compact', 'normal', 'breath'];

  return (
    <Section>
      <SectionHeader>Size</SectionHeader>
      <TagsWrap>
        {sizeThemeOptions.map((sizeThemeOption) => (
          <TagStyled
            isActive={sizeThemeOption === sizeTheme}
            key={sizeThemeOption}
            label={sizeThemeOption}
            onClick={() => {
              onUpdateSettings({ size: sizeThemeOption });
            }}
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
