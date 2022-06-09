import type { NextApiResponse } from 'next';
import dbConnect from '~/api/utils/dbConnect';
import Task from '~/api/models/tasksModel';
import { verifyIfLoggedIn } from '~/api/auth';
import type { NextApiRequestWithUser } from '~/api/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const task = await Task.findById(req.query.taskId);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find task' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const task = await Task.findByIdAndUpdate(req.query.taskId, req.body);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not update task' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const task = await Task.findByIdAndDelete(req.query.taskId);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not remove task' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
