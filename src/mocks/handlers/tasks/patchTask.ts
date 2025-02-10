import { PathParams, http } from 'msw';
import { Requests, TasksByDay } from '~/api/types';
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
        category: 'Personal',
        userId: 'test-user-1',
      },
    ],
  },
};

const patchTask = () =>
  http.patch<PathParams, Requests['SaveTask']>(
    computeTestingUrl('/api/v1/tasks/:taskId'),
    async ({ request, params }) => {
      const body = await request.json();
      const { taskId } = params;
      const timestamp = body.timestamp;

      // Update the task in our mock data
      if (mockTasks[timestamp]) {
        const taskIndex = mockTasks[timestamp].tasks.findIndex((task) => task.taskId === taskId);
        if (taskIndex !== -1) {
          mockTasks[timestamp].tasks[taskIndex] = {
            ...mockTasks[timestamp].tasks[taskIndex],
            ...body,
          };
        }
      }

      return Response.json(body, { status: 200 });
    }
  );

export const patchTaskHandlers = {
  defaultHandler: patchTask(),
};
