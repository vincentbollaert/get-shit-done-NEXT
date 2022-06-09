import type { NextApiResponse } from 'next';
import dbConnect from '~/api/utils/dbConnect';
import Group from '~/api/models/groupsModel';
import { verifyIfLoggedIn } from '~/api/auth';
import type { NextApiRequestWithUser } from '~/api/types';

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const groups = await Group.find();
      res.status(200).json(groups);
    } catch (err) {
      res.status(500).send({ errorMessage: 'could not find groups' });
    }
  } else if (req.method === 'POST') {
    try {
      const group = await new Group(req.body);
      group.save();
      res.status(200).json(group);
    } catch (error) {
      res.status(500).json({ errorMessage: 'could not add group' });
    }
  } else {
    res.status(404).json({ errorMessage: 'route not found' });
  }
}

export default verifyIfLoggedIn(handler);
