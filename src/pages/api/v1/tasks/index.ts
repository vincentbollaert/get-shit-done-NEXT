import { format } from 'date-fns/format';
import type { NextApiResponse } from 'next';
import { verifyIfLoggedIn } from '~/api/auth';
import Task from '~/api/models/tasksModel';
import type { Models, NextApiRequestWithUser } from '~/api/types';
import dbConnect from '~/api/utils/dbConnect';

const tasksResponseMapping = (tasks: Models['Task'][]) =>
  tasks.reduce<Record<string, { tasks: Models['Task'][] }>>((acc, cur) => {
    return {
      ...acc,
      [cur.timestamp]: {
        tasks: tasks.filter((t) => t.timestamp === cur.timestamp).sort((a, b) => a.time[0] - b.time[0]),
      },
    };
  }, {});

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { month } = req.query;
      const year = format(new Date(), 'y');
      const monthRegex = new RegExp(`${month}.+${year}`, 'g');
      const tasks = await Task.find({ userId: req.loggedInUser?.userId, timestamp: monthRegex });
      const mappedTasks = tasksResponseMapping(tasks);

      res.status(200).json(mappedTasks);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find tasks ' + err });
    }
  } else if (req.method === 'POST') {
    try {
      const task = await new Task(req.body);
      task.save();
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ errorMessage: 'could not add task ' + err });
    }
  } else if (req.method === 'DELETE') {
    try {
      const task = await Task.deleteMany({});
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ errorMessage: 'could not remove all tasks ' + err });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
