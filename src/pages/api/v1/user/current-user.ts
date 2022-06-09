import type { NextApiResponse } from 'next';
import dbConnect from '~/api/utils/dbConnect';
import { verifyIfLoggedIn } from '~/api/auth';
import { NextApiRequestWithUser } from '~/api/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();
  if (req.method === 'GET') {
    try {
      res.status(200).json(req.loggedInUser);
    } catch (err) {
      res.status(500).send({ errorMessage: 'no current user' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
