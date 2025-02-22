import type { NextApiResponse } from 'next';
import { verifyIfLoggedIn } from '~/api/auth';
import Task from '~/api/models/tasksModel';
import type { NextApiRequestWithUser } from '~/api/types';
import dbConnect from '~/api/utils/dbConnect';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const task = await Task.findById(req.query.taskId);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find task ' + err });
    }
  } else if (req.method === 'PATCH') {
    try {
      const task = await Task.findByIdAndUpdate(req.query.taskId, req.body);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ errorMessage: 'could not update task ' + err });
    }
  } else if (req.method === 'DELETE') {
    try {
      const task = await Task.findByIdAndDelete(req.query.taskId);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ errorMessage: 'could not remove task ' + err });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
