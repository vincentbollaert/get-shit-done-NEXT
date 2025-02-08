import type { NextApiResponse } from 'next';
import { verifyIfLoggedIn } from '~/api/auth';
import Settings from '~/api/models/settingsModel';
import type { NextApiRequestWithUser } from '~/api/types';
import dbConnect from '~/api/utils/dbConnect';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const settings = await Settings.findOne({ userId: req.loggedInUser?.userId });
      res.status(200).json(settings);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find settings ' + err });
    }
  } else if (req.method === 'PATCH') {
    try {
      const settings = await Settings.findOneAndUpdate((req.loggedInUser?.userId, req.body));
      res.status(200).json(settings);
    } catch (err) {
      res.status(500).json({ errorMessage: 'could not update settings ' + err });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
