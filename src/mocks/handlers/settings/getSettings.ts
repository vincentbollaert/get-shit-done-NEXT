import { http } from 'msw';
import { ClientModel } from '~/api/types';
import { computeTestingUrl } from '../constants';

const mockSettings: ClientModel['Settings'] & { settingsId: string } = {
  settingsId: 'settings-1',
  theme: 'light' as const,
  size: 'normal' as const,
  daysToShow: '1month' as const,
  hoursToShow: [0, 23],
  isHomepage: false,
  showGridLines: true,
  showHourMarkers: true,
  shouldScrollColumns: false,
  hideCalendarInactive: false,
  hideCalendarStartup: true,
  shouldAutoLogout: true,
  userId: 'test-user-1',
};

const getSettings = () =>
  http.get(computeTestingUrl('/api/v1/settings'), async ({ request }) => {
    console.log('MSW intercepted settings request:', request.url);
    return Response.json(mockSettings, { status: 200 });
  });

export const getSettingsHandlers = {
  defaultHandler: getSettings(),
};
