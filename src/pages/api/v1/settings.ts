import type { NextApiResponse } from 'next';
import dbConnect from '~/api/utils/dbConnect';
import Settings from '~/api/models/settingsModel';
import { verifyIfLoggedIn } from '~/api/auth';
import type { NextApiRequestWithUser } from '~/api/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const settings = await Settings.findOne({ userId: req.loggedInUser?.userId });
      res.status(200).json(settings);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find settings' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const settings = await Settings.findOneAndUpdate((req.loggedInUser?.userId, req.body));
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not update settings' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
