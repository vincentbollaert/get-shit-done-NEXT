import styled from 'styled-components';
import { useUpdateSettingsMutation } from '~/api/requests';
import { Settings } from '~/api/types';
import { Switch } from '~/shared/components';
import { Section, SectionHeader } from '../../shared.styled';

export const SectionMisc = ({ settingsData }: { settingsData: Settings }) => {
  const [onUpdateSettings] = useUpdateSettingsMutation();

  const {
    isHomepage,
    shouldScrollColumns,
    showGridLines,
    showHourMarkers,
    hideCalendarInactive,
    hideCalendarStartup,
    shouldAutoLogout,
  } = settingsData;

  return (
    <Section>
      <SectionHeader>Miscellanious</SectionHeader>
      <form>
        <Row>
          <Switch
            id="Set as homepage"
            isChecked={isHomepage}
            label="Set as homepage"
            onClick={() => onUpdateSettings({ isHomepage: !isHomepage })}
          />
        </Row>
        <Row>
          <Switch
            id="Should scroll columns"
            isChecked={shouldScrollColumns}
            label="Should scroll columns"
            onClick={() => onUpdateSettings({ shouldScrollColumns: !shouldScrollColumns })}
          />
        </Row>
        <Row>
          <Switch
            id="Show grid lines"
            isChecked={showGridLines}
            label="Show grid lines"
            onClick={() => onUpdateSettings({ showGridLines: !showGridLines })}
          />
        </Row>
        <Row>
          <Switch
            id="Show hour markers"
            isChecked={showHourMarkers}
            label="Show hour markers"
            onClick={() => onUpdateSettings({ showHourMarkers: !showHourMarkers })}
          />
        </Row>
        <Row>
          <Switch
            id="Hide calendar when inactive"
            isChecked={hideCalendarInactive}
            label="Hide calendar when inactive"
            onClick={() => onUpdateSettings({ hideCalendarInactive: !hideCalendarInactive })}
          />
        </Row>
        <Row>
          <Switch
            id="Hide calendar on startup"
            isChecked={hideCalendarStartup}
            label="Hide calendar on startup"
            onClick={() => onUpdateSettings({ hideCalendarStartup: !hideCalendarStartup })}
          />
        </Row>
        <Row>
          <Switch
            id="Should auto-logout"
            isChecked={shouldAutoLogout}
            label="Should auto-logout"
            onClick={() => onUpdateSettings({ shouldAutoLogout: !shouldAutoLogout })}
          />
        </Row>
      </form>
    </Section>
  );
};

const Row = styled.div`
  margin-bottom: var(--size-md);
`;
