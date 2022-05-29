import { SectionTheme } from './sections/SectionTheme';
import { SectionSize } from './sections/SectionSize';
import { SectionHours } from './sections/SectionHours';
import { SectionDays } from './sections/SectionDays';
import { SectionCategories } from './sections/SectionCategories';
import { SectionMisc } from './sections/SectionMisc';
import { SectionIntegrations } from './sections/SectionIntegrations';
import { useGetSettingsQuery } from '~/api/requests';

const Settings = () => {
  const { isLoading, data } = useGetSettingsQuery();

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  const { theme, size, daysToShow, hoursToShow } = data;
  return (
    <div>
      <SectionTheme colorTheme={theme} />
      <SectionSize sizeTheme={size} />
      <SectionDays daysToShow={daysToShow} />
      <SectionHours hoursToShow={hoursToShow} />
      <SectionCategories />
      <SectionMisc settingsData={data} />
      <SectionIntegrations />
    </div>
  );
};
// eslint-disable-next-line import/no-default-export
export default Settings;
