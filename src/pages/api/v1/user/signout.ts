import dbConnect from '~/lib/dbConnect';
import User from '~/models/settingsModel';
import { verifyIfLoggedIn } from '~/api/auth';
import type { NextApiRequestWithUser } from '~/api/types';
import type { NextApiResponse } from 'next';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const foundUser = await User.findOne({ userId: req.loggedInUser?.userId });
      res.status(200).json({ data: foundUser });
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find user' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
