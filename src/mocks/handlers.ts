import { rest } from 'msw';
import { ClientModel, Models } from '~/api/types';

const mockUser: ClientModel['User'] = {
  email: "test@example.com",
  userId: "test-user-1"
};

const mockTasks = {
  "2025-02-07": {
    tasks: [
      {
        taskId: "task-1",
        timestamp: "2025-02-07",
        name: "Team Meeting",
        category: "work",
        time: [9, 10],
        userId: "test-user-1"
      },
      {
        taskId: "task-2",
        timestamp: "2025-02-07",
        name: "Lunch",
        category: "personal",
        time: [12, 13],
        userId: "test-user-1"
      }
    ]
  }
};

const mockCategories: ClientModel['Category'][] = [
  {
    categoryId: "work",
    name: "Work",
    colorId: "blue",
    userId: "test-user-1"
  },
  {
    categoryId: "personal",
    name: "Personal",
    colorId: "green",
    userId: "test-user-1"
  }
];

const mockSettings: ClientModel['Settings'] & { _id: string; settingsId: string } = {
  _id: 'settings-1',
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
  userId: "test-user-1"
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
    return res(ctx.status(200), ctx.json(mockTasks));
  }),

  rest.post<Models['Task']>('/api/v1/tasks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...req.body,
        taskId: `task-${Date.now()}`,
        userId: mockUser.userId
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
  })
];
