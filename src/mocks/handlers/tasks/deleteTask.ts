import { http } from 'msw';
import { TasksByDay } from '~/api/types';
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

const deleteTask = () =>
  http.delete(computeTestingUrl('/api/v1/tasks/:taskId'), async ({ params }) => {
    const { taskId } = params;

    // Remove the task from our mock data
    Object.keys(mockTasks).forEach((timestamp) => {
      mockTasks[timestamp].tasks = mockTasks[timestamp].tasks.filter((task) => task.taskId !== taskId);
    });

    return new Response(null, { status: 204 });
  });

export const deleteTaskHandlers = {
  defaultHandler: deleteTask(),
};
