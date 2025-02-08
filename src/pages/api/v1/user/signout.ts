import type { NextApiResponse } from 'next';
import { verifyIfLoggedIn } from '~/api/auth';
import User from '~/api/models/settingsModel';
import type { NextApiRequestWithUser } from '~/api/types';
import dbConnect from '~/api/utils/dbConnect';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const foundUser = await User.findOne({ userId: req.loggedInUser?.userId });
      res.status(200).json(foundUser);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find user ' + err });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
