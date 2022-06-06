import type { NextApiResponse } from 'next';
import dbConnect from '~/lib/dbConnect';
import Todo from '~/models/todoModel';
import { verifyIfLoggedIn } from '~/api/auth';
import type { NextApiRequestWithUser } from '~/api/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const todos = await Todo.findById(req.query.todoId);
      res.status(200).json({ data: todos });
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find todos' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const todo = await Todo.findByIdAndUpdate(req.query.todoId, req.body);
      res.status(200).json({ data: todo });
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not update todo' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const todo = await Todo.findByIdAndDelete(req.query.todoId);
      res.status(200).json({ data: todo });
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not remove todo' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
