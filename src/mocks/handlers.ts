import { PathParams, http } from 'msw';
import { ClientModel, Models, Requests, TasksByDay } from '~/api/types';

const mockUser: ClientModel['User'] = {
  email: 'test@example.com',
  userId: 'test-user-1',
};

const mockTasks: TasksByDay = {
  'Sat Feb 08 2025 00:00:00 GMT+0100 (Central European Standard Time)': {
    tasks: [
      {
        taskId: 'task-1',
        name: 'Task 1',
        time: [5, 8],
        // TODO: this timestamp should not be needed. in fact, overhaul these timestamps
        timestamp: 'Sat Feb 08 2025 00:00:00 GMT+0100 (Central European Standard Time)',
        category: 'Personal',
        userId: 'test-user-1',
      },
    ],
  },
};

const mockCategories: ClientModel['Category'][] = [
  {
    categoryId: 'work',
    name: 'Work',
    colorId: 'plumWeb',
    userId: 'test-user-1',
  },
  {
    categoryId: 'personal',
    name: 'Personal',
    colorId: 'middleBlueGreen',
    userId: 'test-user-1',
  },
];

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

export const handlers = [
  // Auth endpoints
  http.post<PathParams, Requests['SignIn']>('/api/v1/user/signin', async () => {
    return Response.json(mockUser, { status: 200 });
  }),

  http.get('/api/v1/user/current-user', async () => {
    return Response.json(mockUser, { status: 200 });
  }),

  // Tasks endpoints
  http.get('/api/v1/tasks', async ({ request }) => {
    const url = new URL(request.url);
    const monthParam = url.searchParams.get('month');

    // Filter tasks for the requested month
    const filteredTasks = Object.entries(mockTasks).reduce<Record<string, { tasks: Models['Task'][] }>>(
      (acc, [date, data]) => {
        if (date.includes(monthParam || '')) {
          acc[date] = data;
        }
        return acc;
      },
      {},
    );

    return Response.json(filteredTasks, { status: 200 });
  }),

  http.post<PathParams, Requests['AddTask']>('/api/v1/tasks', async ({ request }) => {
    const body = await request.json();
    return Response.json(
      {
        ...body,
        taskId: `task-${Date.now()}`,
        userId: mockUser.userId,
      },
      { status: 200 },
    );
  }),

  // Categories endpoints
  http.get('/api/v1/categories', async () => {
    return Response.json(mockCategories, { status: 200 });
  }),

  // Settings endpoints
  http.get('/api/v1/settings', async ({ request }) => {
    console.log('MSW intercepted settings request:', request.url);
    return Response.json(mockSettings, { status: 200 });
  }),

  http.patch('/api/v1/settings', async ({ request }) => {
    console.log('MSW intercepted settings patch request:', request.url);
    const body = await request.json();
    Object.assign(mockSettings, body);
    return Response.json(mockSettings, { status: 200 });
  }),
];
