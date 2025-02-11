import { http } from 'msw';
import { Models, TasksByDay } from '~/api/types';
import { computeTestingUrl } from '../constants';

const mockTasks: TasksByDay = {
  'Sat Feb 08 2025 00:00:00 GMT+0100 (Central European Standard Time)': {
    tasks: [
      {
        taskId: 'task-1',
        name: 'Task 1',
        time: [5, 8],
        // TODO: this timestamp should not be needed. in fact, overhaul these timestamps
        timestamp: 'Sat Feb 08 2025 00:00:00 GMT+0100 (Central European Standard Time)',
        category: 'Work',
        userId: 'test-user-1',
      },
    ],
  },
};

const getTasks = () =>
  http.get(computeTestingUrl('/api/v1/tasks'), async ({ request }) => {
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
      {}
    );

    return Response.json(filteredTasks, { status: 200 });
  });

export const getTasksHandlers = {
  defaultHandler: getTasks(),
};
