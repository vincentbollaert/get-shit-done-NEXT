import type { NextApiResponse } from 'next';
import dbConnect from '~/api/utils/dbConnect';
import Task from '~/api/models/tasksModel';
import type { Models } from '~/api/types';
import { verifyIfLoggedIn } from '~/api/auth';
import type { NextApiRequestWithUser } from '~/api/types';

const tasksResponseMapping = (tasks: Models['Task'][]) => {
  const obj: any = {};

  tasks.forEach(({ timestamp }) => {
    obj[timestamp] = {
      tasks: tasks.filter((t) => t.timestamp === timestamp).sort((a, b) => a.time[0] - b.time[0]),
    };
  });
  return obj;
};

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { month } = req.query;
      const monthAsString = month as string;
      const monthRegex = new RegExp(`${monthAsString}.+2022`, 'g');
      const tasks = await Task.find({ userId: req.loggedInUser?.userId, timestamp: monthRegex });
      const mappedTasks = tasksResponseMapping(tasks);

      res.status(200).json(mappedTasks);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find tasks' });
    }
  } else if (req.method === 'POST') {
    try {
      const task = await new Task(req.body);
      task.save();
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not add task' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const task = await Task.deleteMany({});
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not remove all tasks' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
