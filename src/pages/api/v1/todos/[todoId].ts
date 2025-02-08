import type { NextApiResponse } from 'next';
import { verifyIfLoggedIn } from '~/api/auth';
import Todo from '~/api/models/todoModel';
import type { NextApiRequestWithUser } from '~/api/types';
import dbConnect from '~/api/utils/dbConnect';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const todos = await Todo.findById(req.query.todoId);
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find todos' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const todo = await Todo.findByIdAndUpdate(req.query.todoId, req.body);
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not update todo' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const todo = await Todo.findByIdAndDelete(req.query.todoId);
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not remove todo' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
