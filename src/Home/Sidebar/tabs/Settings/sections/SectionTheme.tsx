import styled, { css } from 'styled-components';
import { Tag, TagsWrap } from '~/shared/components';
import type { ClientModel } from '~/api/types';
import { useUpdateSettingsMutation } from '~/api/requests';
import { Section, SectionHeader } from '../../../shared.styled';

export const SectionTheme = ({ colorTheme }: { colorTheme: ClientModel['Settings']['theme'] }) => {
  const [onUpdateSettings] = useUpdateSettingsMutation();
  const colorThemeOptions: ClientModel['Settings']['theme'][] = ['light', 'dark', 'high contrast'];

  return (
    <Section>
      <SectionHeader>Theme</SectionHeader>
      <TagsWrap>
        {colorThemeOptions.map((colorThemeOption) => (
          <TagStyled
            isActive={colorThemeOption === colorTheme}
            key={colorThemeOption}
            label={colorThemeOption}
            onClick={() => {
              onUpdateSettings({ theme: colorThemeOption });
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
