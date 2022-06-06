import type { NextApiResponse } from 'next';
import dbConnect from '~/lib/dbConnect';
import Todo from '~/models/todoModel';
import { verifyIfLoggedIn } from '~/api/auth';
import type { NextApiRequestWithUser } from '~/api/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const todos = await Todo.find();
      res.status(200).json({ data: todos });
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find todos' });
    }
  } else if (req.method === 'POST') {
    try {
      const todo = await new Todo(req.body);
      res.status(200).json({ data: todo });
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not add todo' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
