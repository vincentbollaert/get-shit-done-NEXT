import { rest } from 'msw';
import { ClientModel, Models } from '~/api/types';

const mockUser: ClientModel['User'] = {
  email: 'test@example.com',
  userId: 'test-user-1',
};

const mockTasks = {
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
  rest.post<Models['User']>('/api/v1/user/signin', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUser));
  }),

  rest.get('/api/v1/user/current-user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUser));
  }),

  // Tasks endpoints
  rest.get('/api/v1/tasks', (req, res, ctx) => {
    const monthParam = req.url.searchParams.get('month');
    
    // Filter tasks for the requested month
    const filteredTasks = Object.entries(mockTasks).reduce<Record<string, { tasks: Models['Task'][] }>>((acc, [date, data]) => {
      if (date.includes(monthParam || '')) {
        acc[date] = data;
      }
      return acc;
    }, {});

    return res(ctx.status(200), ctx.json(filteredTasks));
  }),

  rest.post<Models['Task']>('/api/v1/tasks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...req.body,
        taskId: `task-${Date.now()}`,
        userId: mockUser.userId,
      })
    );
  }),

  // Categories endpoints
  rest.get('/api/v1/categories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCategories));
  }),

  // Settings endpoints
  rest.get('/api/v1/settings', (req, res, ctx) => {
    console.log('MSW intercepted settings request:', req.url);
    return res(ctx.status(200), ctx.json(mockSettings));
  }),

  rest.patch('/api/v1/settings', (req, res, ctx) => {
    console.log('MSW intercepted settings patch request:', req.url);
    Object.assign(mockSettings, req.body);
    return res(ctx.status(200), ctx.json(mockSettings));
  }),
];
