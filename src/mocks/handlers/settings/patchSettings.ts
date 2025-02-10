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

const patchSettings = () =>
  http.patch(computeTestingUrl('/api/v1/settings'), async ({ request }) => {
    console.log('MSW intercepted settings patch request:', request.url);
    const body = await request.json();
    Object.assign(mockSettings, body);
    return Response.json(mockSettings, { status: 200 });
  });

export const patchSettingsHandlers = {
  defaultHandler: patchSettings(),
};
