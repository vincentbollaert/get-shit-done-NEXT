import type { NextApiResponse } from 'next';
import dbConnect from '~/api/utils/dbConnect';
import Todo from '~/api/models/todoModel';
import { verifyIfLoggedIn } from '~/api/auth';
import type { NextApiRequestWithUser } from '~/api/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const todos = await Todo.find({ userId: req.loggedInUser?.userId });
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find todos' });
    }
  } else if (req.method === 'POST') {
    try {
      const todo = await new Todo(req.body);
      todo.save();
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not add todo' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
